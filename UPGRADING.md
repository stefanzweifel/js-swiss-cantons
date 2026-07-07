# Migration guide

## v1 → v2

Version 2 replaces the class-based API with plain functions and modernises the whole
package (TypeScript, ESM-only, native tooling). The data is unchanged — only the API is.
This is a breaking release; update your call sites as follows.

### At a glance

| v1 | v2 |
| --- | --- |
| `new CantonManager().getByAbbreviation('SH')` | `getCantonByAbbreviation('SH')` |
| `new CantonManager().getByName('Schaffhausen')` | `getCantonByName('Schaffhausen')` |
| `new CantonManager().getByAnything('SH')` | `getCanton('SH')` |
| `canton.setLanguage('de').getName()` | `canton.names.de` |
| `canton.getAbbreviation()` | `canton.abbreviation` |
| `new ZipcodeSearch().findbyZipcode(8001)` | `findLocalityByZipcode(8001)` (from `/zipcodes`) |
| `new ZipcodeSearchSimple().findbyZipcode(8001)` | `findCantonByZipcode(8001)` (from `/zipcodes/simple`) |
| lookup miss → **throws `Error`** | lookup miss → **returns `undefined`** |

### Cantons

Before:

```javascript
import CantonManager from '@stefanzweifel/js-swiss-cantons';

const manager = new CantonManager();
const canton = manager.getByAbbreviation('SH'); // throws if not found
console.log(canton.setLanguage('de').getName()); // 'Schaffhausen'
```

After:

```javascript
import { getCantonByAbbreviation } from '@stefanzweifel/js-swiss-cantons';

const canton = getCantonByAbbreviation('SH'); // undefined if not found
console.log(canton?.names.de); // 'Schaffhausen'
```

Key changes:

- **No classes.** `getCanton`, `getCantonByAbbreviation`, `getCantonByName`, and
  `getAllCantons` are standalone functions.
- **`getByAnything` → `getCanton`.**
- **No `setLanguage()` / `getName()`.** A canton is a plain object; read the language you
  want directly from `canton.names` (e.g. `canton.names.fr`).
- **`getAbbreviation()` → `canton.abbreviation`.**
- **Not found returns `undefined`** instead of throwing. Replace `try/catch` with optional
  chaining (`?.`) and nullish coalescing (`??`).

### Zipcode lookups

The zipcode helpers moved to subpath imports so the large dataset is only pulled in when
used, and the method names/return shapes were modernised.

Precise lookup — before:

```javascript
import ZipcodeSearch from '@stefanzweifel/js-swiss-cantons/src/ZipcodeSearch';

const location = new ZipcodeSearch().findbyZipcode(8001);
// { city_name: 'Zürich', zipcode: 8001, community_name: 'Zürich', canton: 'ZH' }
```

After:

```javascript
import { findLocalityByZipcode } from '@stefanzweifel/js-swiss-cantons/zipcodes';

const location = findLocalityByZipcode(8001);
// { zipcode: 8001, cityName: 'Zürich', communityName: 'Zürich', canton: 'ZH' }
```

- Locality fields are now **camelCase**: `city_name` → `cityName`,
  `community_name` → `communityName`.
- Unknown zipcodes return `undefined` (unchanged from v1 for this method).
- `getDataSet()` was removed. Import the JSON directly if you need the raw dataset.

Compact lookup — before:

```javascript
import ZipcodeSearchSimple from '@stefanzweifel/js-swiss-cantons/src/ZipcodeSearchSimple';

new ZipcodeSearchSimple().findbyZipcode(8001); // 'ZH'
new ZipcodeSearchSimple().findbyZipcode(99999); // null
```

After:

```javascript
import { findCantonByZipcode } from '@stefanzweifel/js-swiss-cantons/zipcodes/simple';

findCantonByZipcode(8001);  // 'ZH'
findCantonByZipcode(99999); // undefined (was null in v1)
```

### Imports and packaging

- Deep imports like `@stefanzweifel/js-swiss-cantons/src/ZipcodeSearch` no longer work.
  Use the documented subpaths: `/zipcodes` and `/zipcodes/simple`.
- The package is now **ESM-only** and ships compiled output from `dist/`. Modern Node.js
  can `require()` ESM, but CommonJS `require('@stefanzweifel/js-swiss-cantons')` of the old
  shape no longer applies.
- Type declarations are bundled — no `@types` package needed.
