"use strict";

const assert = require("chai").assert;

const {
  roundTo2Decimals,
  convertTemperature,
  validateSensorData,
  calculateLinkQuality,
  formatMacForTopic,
  JaaleeDecoder,
  getTemperatureUnit,
  isBatteryLow,
  getDataAge,
} = require("../scripts/mqtt/jaalee-jht-mqtt-bridge.shelly.js");

describe("roundTo2Decimals()", function () {
  it("should round 1.234 to 1.23", function () {
    assert.equal(roundTo2Decimals(1.234), 1.23);
  });
  it("should round 1.235 to 1.24", function () {
    assert.equal(roundTo2Decimals(1.235), 1.24);
  });
  it("should handle negative numbers", function () {
    assert.equal(roundTo2Decimals(-1.567), -1.57);
  });
});

describe("convertTemperature()", function () {
  it("should convert 0°C to 32°F", function () {
    assert.equal(convertTemperature(0, "fahrenheit"), 32);
  });
  it("should keep celsius as-is", function () {
    assert.equal(convertTemperature(23.5, "celsius"), 23.5);
  });
  it("should convert 100°C to 212°F", function () {
    assert.equal(convertTemperature(100, "fahrenheit"), 212);
  });
  it("should convert -40°C to -40°F", function () {
    assert.equal(convertTemperature(-40, "fahrenheit"), -40);
  });
});

describe("validateSensorData()", function () {
  it("should accept valid temperature and humidity", function () {
    assert.isTrue(validateSensorData(23.5, 45.2));
  });
  it("should reject temperature too low", function () {
    assert.isFalse(validateSensorData(-50, 50));
  });
  it("should reject temperature too high", function () {
    assert.isFalse(validateSensorData(100, 50));
  });
  it("should reject negative humidity", function () {
    assert.isFalse(validateSensorData(20, -5));
  });
  it("should reject humidity over 100", function () {
    assert.isFalse(validateSensorData(20, 110));
  });
  it("should accept boundary values", function () {
    assert.isTrue(validateSensorData(-40, 0));
    assert.isTrue(validateSensorData(80, 100));
  });
});

describe("calculateLinkQuality()", function () {
  it("should return 100% for -30 dBm", function () {
    assert.equal(calculateLinkQuality(-30), 100);
  });
  it("should return 0% for -90 dBm", function () {
    assert.equal(calculateLinkQuality(-90), 0);
  });
  it("should return 50% for -60 dBm", function () {
    assert.equal(calculateLinkQuality(-60), 50);
  });
  it("should cap at 100% above -30 dBm", function () {
    assert.equal(calculateLinkQuality(-20), 100);
    assert.equal(calculateLinkQuality(0), 100);
  });
  it("should cap at 0% below -90 dBm", function () {
    assert.equal(calculateLinkQuality(-100), 0);
    assert.equal(calculateLinkQuality(-120), 0);
  });
  it("should return 75% for -45 dBm", function () {
    assert.equal(calculateLinkQuality(-45), 75);
  });
  it("should return 25% for -75 dBm", function () {
    assert.equal(calculateLinkQuality(-75), 25);
  });
});

describe("formatMacForTopic()", function () {
  it("should convert MAC to lowercase without colons", function () {
    assert.equal(formatMacForTopic("AA:BB:CC:DD:EE:FF"), "aabbccddeeff");
  });
  it("should handle lowercase input", function () {
    assert.equal(formatMacForTopic("aa:bb:cc:dd:ee:ff"), "aabbccddeeff");
  });
  it("should handle mixed case", function () {
    assert.equal(formatMacForTopic("Aa:Bb:Cc:Dd:Ee:Ff"), "aabbccddeeff");
  });
  it("should handle empty string", function () {
    assert.equal(formatMacForTopic(""), "");
  });
  it("should handle null/undefined", function () {
    assert.equal(formatMacForTopic(null), "");
    assert.equal(formatMacForTopic(undefined), "");
  });
});

describe("getTemperatureUnit()", function () {
  it("should return °C for celsius", function () {
    assert.equal(getTemperatureUnit(), "°C");
  });
});

describe("isBatteryLow()", function () {
  it("should detect low battery at 20%", function () {
    assert.isTrue(isBatteryLow(20));
  });
  it("should not detect low battery at 25%", function () {
    assert.isFalse(isBatteryLow(25));
  });
});

describe("JaaleeDecoder", function () {
  describe("calculateTemperature()", function () {
    it("should calculate temperature from raw value 32768", function () {
      assert.approximately(
        JaaleeDecoder.calculateTemperature(32768),
        42.5,
        0.01,
      );
    });
    it("should return -45 for raw value 0", function () {
      assert.equal(JaaleeDecoder.calculateTemperature(0), -45);
    });
    it("should return 130 for raw value 65535", function () {
      assert.equal(JaaleeDecoder.calculateTemperature(65535), 130);
    });
  });

  describe("calculateHumidity()", function () {
    it("should calculate ~50% for raw value 32768", function () {
      assert.approximately(JaaleeDecoder.calculateHumidity(32768), 50.0, 0.01);
    });
    it("should return 0% for raw value 0", function () {
      assert.equal(JaaleeDecoder.calculateHumidity(0), 0);
    });
    it("should return 100% for raw value 65535", function () {
      assert.equal(JaaleeDecoder.calculateHumidity(65535), 100);
    });
  });

  describe("parseLongFormat()", function () {
    /**
     *
     * @param bytes
     */
    function makeMockData(bytes) {
      return {
        at: function (i) {
          return bytes[i];
        },
        length: bytes.length,
      };
    }

    const validData = makeMockData([
      0x02, 0x15, 0xf5, 0x25, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x80, 0x00, 0x00, 0x64,
    ]);

    it("should parse valid iBeacon data", function () {
      const result = JaaleeDecoder.parseLongFormat(validData);
      assert.isNotNull(result);
      assert.approximately(result.temperature, 42.5, 0.1);
      assert.approximately(result.humidity, 50.0, 0.1);
      assert.equal(result.battery, 100);
      assert.equal(result.format, "iBeacon-24");
    });

    it("should reject invalid data length", function () {
      assert.isNull(JaaleeDecoder.parseLongFormat({ at: () => 0, length: 10 }));
    });

    it("should reject data without iBeacon header", function () {
      const data = new Array(24).fill(0);
      data[0] = 0xff;
      data[1] = 0xff;
      assert.isNull(JaaleeDecoder.parseLongFormat(makeMockData(data)));
    });

    it("should reject data without Jaalee marker", function () {
      const data = new Array(24).fill(0);
      data[0] = 0x02;
      data[1] = 0x15;
      assert.isNull(JaaleeDecoder.parseLongFormat(makeMockData(data)));
    });

    it("should reject data with out-of-range temperature", function () {
      const data = new Array(24).fill(0);
      data[0] = 0x02;
      data[1] = 0x15;
      data[2] = 0xf5;
      data[3] = 0x25;
      data[18] = 0xff;
      data[19] = 0xff; // Temp > 80°C
      assert.isNull(JaaleeDecoder.parseLongFormat(makeMockData(data)));
    });

    it("should find Jaalee marker at different positions", function () {
      const data = new Array(24).fill(0);
      data[0] = 0x02;
      data[1] = 0x15;
      data[14] = 0xf5;
      data[15] = 0x25; // Marker weiter hinten
      data[18] = 0x80;
      data[19] = 0x00; // Temp
      data[20] = 0x80;
      data[21] = 0x00; // Humidity
      data[23] = 0x64; // Battery
      const result = JaaleeDecoder.parseLongFormat(makeMockData(data));
      assert.isNotNull(result);
    });
  });
});
