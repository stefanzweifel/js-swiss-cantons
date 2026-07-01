# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/stefanzweifel/js-swiss-cantons/compare/v1.3.0...HEAD)

### Changed (breaking)
- Replaced the class-based API with plain functions. See [MIGRATION.md](./MIGRATION.md).
  - `CantonManager` → `getCanton` / `getCantonByAbbreviation` / `getCantonByName` / `getAllCantons`.
  - A canton is now a plain object (`{ abbreviation, names }`); `setLanguage()`/`getName()`
    are gone — read `canton.names.<lang>` directly.
  - `ZipcodeSearch` → `findLocalityByZipcode` (import from `@stefanzweifel/js-swiss-cantons/zipcodes`),
    with camelCased fields (`cityName`, `communityName`).
  - `ZipcodeSearchSimple` → `findCantonByZipcode` (import from `@stefanzweifel/js-swiss-cantons/zipcodes/simple`).
  - Lookups now return `undefined` when nothing matches instead of throwing / returning `null`.
- Package is now **ESM-only**, ships compiled output from `dist/`, and exposes cantons at the
  root with zipcode helpers behind the `/zipcodes` and `/zipcodes/simple` subpaths.

### Added
- Bundled TypeScript type declarations (`Canton`, `Language`, `Locality`).

### Removed
- `getDataSet()` on the zipcode search.
- Deep `@stefanzweifel/js-swiss-cantons/src/...` import paths.

### Internal
- Dropped Babel, Webpack, ava, nyc, ESLint, and Prettier. The package now builds with
  [tsdown](https://tsdown.dev), tests with the built-in `node:test` runner, and lints/formats
  with [Biome](https://biomejs.dev).

## [v1.3.0](https://github.com/stefanzweifel/js-swiss-cantons/compare/v1.2.0...v1.3.0) - 2018-12-28

### Added
- Add `ZipcodeSearchSimple.js` [#80](https://github.com/stefanzweifel/js-swiss-cantons/pull/80)

## [v1.2.0](https://github.com/stefanzweifel/js-swiss-cantons/compare/v1.1.0...v1.2.0) - 2018-12-08

### Added
- Add `ZipcodeSearch.js` [#78](https://github.com/stefanzweifel/js-swiss-cantons/pull/78)


## [v1.1.0](https://github.com/stefanzweifel/js-swiss-cantons/compare/v1.0.0...v1.1.0) - 2018-10-01

### Added
- Add support for Spanish and Portuguese [#66](https://github.com/stefanzweifel/js-swiss-cantons/pull/66)


## [v1.0.1](https://github.com/stefanzweifel/js-swiss-cantons/compare/v1.0.0...v1.0.1) - 2017-05-01

- Housekeeping


## v1.0.0 - 2017-05-01

- Find canton by abbreviation or name
- Return canton name in 5 languages



