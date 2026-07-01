# 🇨🇭 js-swiss-cantons

![tests](https://github.com/stefanzweifel/js-swiss-cantons/workflows/tests/badge.svg)

Look up any Swiss canton by its abbreviation, name, or by the zipcode of any Swiss
city. Zero runtime dependencies, ESM-only, fully typed. (This is a port of
[php-swiss-cantons](https://github.com/stefanzweifel/php-swiss-cantons).)

> **Upgrading from v1?** The class-based API was replaced with plain functions in v2.
> See [MIGRATION.md](./MIGRATION.md).

## Installation

```shell
npm install @stefanzweifel/js-swiss-cantons
```

Requires Node.js 18 or newer (any environment that supports ES modules).

## Usage

The package exposes plain functions that return plain, serializable objects — no
classes to instantiate. Lookups return `undefined` when nothing matches.

### Cantons

```javascript
import {
    getCanton,
    getCantonByAbbreviation,
    getCantonByName,
    getAllCantons,
} from '@stefanzweifel/js-swiss-cantons';

// By abbreviation (case-insensitive), then by name as a fallback:
const canton = getCanton('SH');
// {
//   abbreviation: 'SH',
//   names: {
//     de: 'Schaffhausen', fr: 'Schaffhouse', it: 'Sciaffusa',
//     rm: 'Schaffusa', en: 'Schaffhouse', es: 'Schaffhausen', pt: 'Schaffhausen',
//   },
// }

canton.abbreviation; // 'SH'
canton.names.de;     // 'Schaffhausen'
canton.names.fr;     // 'Schaffhouse'

getCantonByAbbreviation('zh')?.names.en; // 'Zurich'
getCantonByName('Schaffhouse')?.abbreviation; // 'SH'
getCanton('does-not-exist'); // undefined

getAllCantons(); // Canton[] — all 26 cantons
```

Supported languages: `de`, `fr`, `it`, `en`, `rm`, `es`, `pt`.

### Zipcode → locality (precise)

Imported from the `/zipcodes` subpath so the ~290 kB dataset is only bundled when you
actually use it.

```javascript
import { findLocalityByZipcode } from '@stefanzweifel/js-swiss-cantons/zipcodes';

findLocalityByZipcode('1201'); // by string
findLocalityByZipcode(8001);   // by number
// {
//   zipcode: 8001,
//   cityName: 'Zürich',
//   communityName: 'Zürich',
//   canton: 'ZH',
// }

findLocalityByZipcode(99999); // undefined
```

### Zipcode → canton (compact)

A much smaller dataset (~2.9 kB). The tradeoff: it returns a canton for any zipcode in
the 1000–9999 range, including gaps that map to no real locality (e.g. `5800` returns
`SO` even though no city has that zipcode). Use `findLocalityByZipcode` when you need
precision.

```javascript
import { findCantonByZipcode } from '@stefanzweifel/js-swiss-cantons/zipcodes/simple';

findCantonByZipcode('1201'); // 'GE'
findCantonByZipcode(8001);   // 'ZH'
findCantonByZipcode(999);    // undefined (out of range)
```

## TypeScript

The package ships its own type declarations. The `Canton` and `Language` types are
exported from the root, and `Locality` from `/zipcodes`:

```typescript
import { type Canton, type Language, getCanton } from '@stefanzweifel/js-swiss-cantons';
import { type Locality, findLocalityByZipcode } from '@stefanzweifel/js-swiss-cantons/zipcodes';
```

## Development

This is a zero-dependency, TypeScript-first package. Tooling:

- [tsdown](https://tsdown.dev) — bundles the library and generates type declarations
- [Biome](https://biomejs.dev) — linting and formatting
- The built-in Node.js test runner ([`node:test`](https://nodejs.org/api/test.html))

```shell
npm install
npm run typecheck   # tsc --noEmit
npm test            # node --test
npm run lint        # biome check .
npm run format      # biome check --write .
npm run build       # tsdown -> dist/
```

Tests run directly against the TypeScript sources — Node.js strips the types (requires
Node 22.18+/24 for local test runs).

## Releasing

```shell
npm version patch | minor | major   # bump version
npm publish                          # `prepublishOnly` builds dist/ automatically
```

## Versioning

We use [SemVer](http://semver.org/). For the versions available, see the
[tags on this repository](https://github.com/stefanzweifel/js-swiss-cantons/releases).

## Authors

- **Stefan Zweifel** — _Initial work_ — [stefanzweifel](https://github.com/stefanzweifel)

See also the list of
[contributors](https://github.com/stefanzweifel/js-swiss-cantons/contributors).

## Acknowledgments

- [php-swiss-cantons](https://github.com/stefanzweifel/php-swiss-cantons)
