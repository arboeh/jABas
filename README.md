# jABas – Shelly Scripts

![Tests](https://github.com/arboeh/jABas/workflows/CI/badge.svg)
![Coverage](https://img.shields.io/codecov/c/gh/arboeh/jABas/main.svg)

Tested Shelly mJS Scripts with 40+ unit tests & 31% coverage.

## Scripts

| Script | Description | Tests |
|---|---|---|
| [Jaalee JHT BLE→MQTT](scripts/mqtt/README.md) | BLE temp/humidity → HA Discovery | 40/40 ✅ |

## Quick Start

```bash
git clone https://github.com/arboeh/jABas
cd jABas
npm i
npm test          # 40/40
npm run coverage  # 31%
```

## Deploy

```bash
cp scripts/mqtt/jaalee-jht-mqtt-bridge.shelly.js /tmp/shelly/
# Shelly → Scripts → Import
```

## Development

```
VS Code + rvest.vs-code-prettier-eslint
npm run test:watch
npm run lint
```

## License

MIT © 2026 arboeh