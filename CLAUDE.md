# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```shell
npm run test           # run all tests with ava
npm run test-coverage  # run tests with nyc coverage report
npm run lint           # eslint src/**/*.js
npm run format         # prettier --write on src and test
```

To run a single test file:
```shell
npx ava test/CantonTest.js
```

## Architecture

This is a zero-dependency JavaScript package for looking up Swiss cantons. The entry point is `src/CantonManager.js`.

**Core flow:**
- `CantonManager` → `CantonSearch` → `src/data/cantons.js` → returns a `Canton` instance
- `Canton` wraps a raw canton data object and exposes `getAbbreviation()`, `getName()`, and `setLanguage()`. Supported languages: `de`, `fr`, `it`, `en`, `rm`, `es`, `pt`. Default is `en`.
- `CantonSearch` filters the cantons array by abbreviation (case-insensitive) or by name (exact match across all language variants). Throws `Error` if no match.

**Zipcode lookup (two separate classes, not via CantonManager):**
- `ZipcodeSearch` — uses `src/data/zipcodes.json` (~290 KB), returns a full locality object `{ city_name, zipcode, community_name, canton }`. Precise.
- `ZipcodeSearchSimple` — uses `src/data/cantonsShort.json` (~2.9 KB), returns only a canton abbreviation string. Trades precision for bundle size (returns cantons for non-existent zipcodes within a range).

**Data files:**
- `src/data/cantons.js` — the authoritative canton list (JS module, not JSON)
- `src/data/cantons.json` / `cantonsShort.json` / `zipcodes.json` / `zipcodesSimple.json` — static data assets
- `src/bin/createCantonsShort.js` — one-off script to regenerate `cantonsShort.json`

Tests are in `test/` and mirror the `src/` structure. The test runner is ava with Babel (`@babel/register`) for ES module syntax.
