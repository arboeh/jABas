# jABas – Shelly Scripts

[![Tests](https://github.com/arboeh/jABas/actions/workflows/ci.yml/badge.svg)](https://github.com/arboeh/jABas/actions)
[![Coverage](https://coverage.codecov.io/gh/arboeh/jABas/branch/main/graph/badge.svg)](https://codecov.io/gh/arboeh/jABas)

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