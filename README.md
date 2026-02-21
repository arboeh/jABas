# 🛠️ Scripts for Home Assistant

**Scripts, Tools & Blueprints**

[![HA](https://img.shields.io/badge/Home%20Assistant-blue.svg)](https://www.home-assistant.io/)
[![Tests](https://github.com/arboeh/ha-scripts/actions/workflows/ci.yml/badge.svg)](https://github.com/arboeh/ha-scripts/actions)

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
