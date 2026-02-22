# mqtt-jaalee-jht-bridge.shelly.js

**Jaalee JHT BLE → MQTT Home Assistant Bridge**

Listens for BLE advertisements from Jaalee JHT temperature/humidity sensors and publishes sensor data to Home Assistant via MQTT Auto-Discovery. Supports iBeacon (24-byte) and short (15–16 byte) advertisement formats.

## Requirements

- Shelly device with BLE support (acting as BLU Gateway)
- Jaalee JHT BLE sensor(s)
- MQTT broker connected to Home Assistant

## Features

- Parses iBeacon and short-format BLE advertisements from Jaalee JHT sensors
- Publishes **temperature**, **humidity**, and **battery level**
- Optional sensors: RSSI, Link Quality, Last Seen, Data Age, Battery Low warning
- **HA MQTT Auto-Discovery** — entities created automatically, zero config in Home Assistant
- Sensor timeout monitoring (default: 5 min → `offline`)
- Configurable temperature unit (°C / °F / K)
- Optional friendly names for known devices

## Entities Created

| Entity                        | Type                      | Default     |
| ----------------------------- | ------------------------- | ----------- |
| `sensor.*_temperature`        | Temperature (°C / °F / K) | ✅ enabled  |
| `sensor.*_humidity`           | Humidity (%)              | ✅ enabled  |
| `sensor.*_battery`            | Battery level (%)         | ✅ enabled  |
| `sensor.*_rssi`               | Signal strength (dBm)     | ⬜ optional |
| `sensor.*_last_seen`          | Last seen timestamp       | ⬜ optional |
| `sensor.*_link_quality`       | Link quality (%)          | ⬜ optional |
| `sensor.*_data_age`           | Data age (s)              | ⬜ optional |
| `binary_sensor.*_battery_low` | Low battery warning       | ⬜ optional |

## Configuration

Edit the `CONFIG` object at the top of the script:

```javascript
CONFIG.temperature.unit = "celsius"; // 'celsius', 'fahrenheit' or 'kelvin'

CONFIG.mqtt.publish_rssi = true; // Signal strength
CONFIG.mqtt.publish_last_seen = true; // Last seen timestamp
CONFIG.mqtt.publish_link_quality = false; // Link quality 0–100%
CONFIG.mqtt.publish_battery_low = false; // Low battery binary sensor
CONFIG.mqtt.publish_data_age = false; // Data age in seconds

CONFIG.mqtt.sensor_timeout = 300; // Seconds without update → offline
CONFIG.mqtt.battery_low_threshold = 20; // Battery % threshold for low battery
```

### Known Devices (optional)

Assign friendly names to specific sensors by MAC address:

```javascript
CONFIG.knownDevices = {
  "AA:BB:CC:DD:EE:FF": "Jaalee JHT Kitchen",
  "AA:BB:CC:DD:EE:01": "Jaalee JHT Living Room",
};
```

## Deploy

```bash
python tools/put_script.py 192.168.33.1 1 mqtt-jaalee-jht-bridge.shelly.js
```

Home Assistant entities are created automatically via MQTT Auto-Discovery after the first sensor advertisement is received.

## Log Levels

```javascript
CONFIG.logLevel = LOG_LEVELS.INFO; // ERROR | WARN | INFO | DEBUG
```

- `INFO` — Important events (sensor found, MQTT status)
- `DEBUG` — All BLE scans and detailed parsing info
