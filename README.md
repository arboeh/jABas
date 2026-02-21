<img src="images/logo.svg" alt="jaABlu" height="40"/>

## My Scripts & Tools for Home Assistant

**My personal collection of scripts, tools & blueprints for Home Assistant**

[![Tests](https://github.com/arboeh/jABas/actions/workflows/ci.yml/badge.svg)](https://github.com/arboeh/jABas/actions)
[![codecov](https://codecov.io/gh/arboeh/jABas/branch/main/graph/badge.svg)](https://codecov.io/gh/arboeh/jABas)
![Testable Code](https://img.shields.io/badge/testable%20code-89%25-brightgreen.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-41BDF5.svg)](https://www.home-assistant.io/)
[![Shelly](https://img.shields.io/badge/Shelly-BLU%20Gateway-00A0E3.svg)](https://shelly.cloud/)

---

## Available Scripts

### Shelly mJS

| Script                                                                 | Description                                                                             | Status        | Tests |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------- | ----- |
| [Jaalee JHT BLE → MQTT](scripts/mqtt/jaalee-jht-mqtt-bridge.shelly.js) | Jaalee JHT temperature/humidity/battery via Shelly BLU Gateway → HA MQTT Auto-Discovery | ✅ Production | 66/66 |

## Planned _(someday, maybe...)_

| Category       | Idea                      |
| -------------- | ------------------------- |
| **Shelly mJS** | More BLE sensors          |
| **Python**     | HA Python scripts         |
| **Bash**       | Shell scripts for add-ons |
| **Blueprints** | HA Automation Blueprints  |

## 🚀 Deploy a Shelly Script

1. Open the script from [`scripts/mqtt/`](scripts/mqtt/)
2. Copy the content
3. In the Shelly web interface go to **Scripts → Create Script**
4. Paste, save & start

Or via HTTP API:

```bash
curl -X POST http://<SHELLY-IP>/rpc/Script.Create \
  -d '{"name":"jaalee-jht"}'
```

## 🧪 Development

```bash
# Run tests
npm test           # 66 tests

# Coverage
npm run coverage   # ~44% overall / ~89% of testable code

# Linting
npm run lint       # ESLint 0 errors
```

> Hardware-dependent code (MQTT, BLE, Shelly APIs) cannot be unit tested
> and must be validated directly on the device.

## 📄 License

MIT © [arboeh](https://github.com/arboeh) – see [LICENSE](LICENSE)
