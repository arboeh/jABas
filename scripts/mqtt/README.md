## `scripts/mqtt/README.md`

# Jaalee JHT BLE → MQTT Home Assistant Bridge

## Features

- Parses iBeacon-format BLE advertisements from Jaalee JHT sensors  
- Temperature, humidity, battery level
- RSSI, Link Quality, Data Age (optional)
- **HA MQTT Auto-Discovery** – zero-config in Home Assistant
- Battery low warning sensor
- Timeout monitoring (5min → offline)

## Screenshots

```
HA Entity: sensor.jabas-jaalee-jht_aabbccddeeff_temperature
HA Entity: sensor.jabas-jaalee-jht_aabbccddeeff_humidity
HA Entity: sensor.jabas-jaalee-jht_aabbccddeeff_battery
```

## Configuration (optional)

```javascript
// CONFIG in script
CONFIG.mqtt.publish_rssi = true;        // Signal strength
CONFIG.mqtt.publish_data_age = true;    // Data age in seconds
CONFIG.mqtt.battery_low_threshold = 20; // % threshold
CONFIG.temperature.unit = "kelvin";     // °C, °F, K
```

## Known Devices

```javascript
CONFIG.knownDevices = {
  "AA:BB:CC:DD:EE:FF": "Jaalee JHT Kitchen"
};
````

## Deploy

```bash
python tools/put_script.py 192.168.33.1 1 jaalee-jht-mqtt-bridge.shelly.js
```

**Done! HA Entitys created automatically!**
