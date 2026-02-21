# 🛠️ jABas - My Scripts & Tools for Home Assistant

**Scripts, Tools & Blueprints**

[![Tests](https://github.com/arboeh/jABas/workflows/Tests/badge.svg)](https://github.com/arboeh/jABas/actions)
[![codecov](https://codecov.io/gh/arboeh/jABas/branch/main/graph/badge.svg)](https://codecov.io/gh/arboeh/jABas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-41BDF5.svg)](https://www.home-assistant.io/)
[![Shelly](https://img.shields.io/badge/Shelly-BLU%20Gateway-00A0E3.svg)](https://shelly.cloud/)

## 📁 Kategorien

| Kategorie | Beschreibung | Beispiele |
|-----------|-------------|-----------|
| **Shelly mJS** | Shelly Scripts mit HA MQTT Discovery | [Jaalee JHT](scripts/shelly/jaalee-jht-mqtt/) |
| **Python** | HA Python Scripts | `script.py` |
| **Bash** | Shell-Scripts für Addons | `backup.sh` |
| **Blueprints** | HA Automation Blueprints | `automation.yaml` |
| **Node-RED** | Flow-Exports | `flow.json` |

## 🚀 Quickstart

```bash
# Shelly Script deployen
curl -s https://raw.githubusercontent.com/arboeh/ha-scripts/main/scripts/shelly/jaalee-jht-mqtt-bridge.shelly.js | ssh shelly sh

# HA Blueprint importieren
# configuration.yaml → !include_dir_merge_named blueprints
```

## 📊 Status

- **40/40 Tests** ✅
- **ESLint** 0 Errors ✅
- **Coverage** 31% 📈
