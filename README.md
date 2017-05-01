# 🇨🇭 js-swiss-cantons

<p align="center">
    <a href="https://travis-ci.org/stefanzweifel/js-swiss-cantons" title="Build Status">
        <img src="https://travis-ci.org/stefanzweifel/js-swiss-cantons.svg?branch=master" alt="Build Status">
    </a>
</p>

Find Swiss canton by it's abbreviation or name. (This is a port of [php-swiss-cantons](https://github.com/stefanzweifel/php-swiss-cantons))

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to work on this package you should have `npm`, `yarn` and `ava` installed globally.

```shell
git clone https://github.com/stefanzweifel/js-swiss-cantons.git
```

### Installing

You should install the package with `yarn` or `npm` in your project.

```shell
npm install @stefanzweifel/js-swiss-cantons
```

```javascript
import CantonManager from '@stefanzweifel/js-swiss-cantons';

let manager = new CantonManager;
let canton = manager.getByAppreviation('SH');
let canton = manager.getByName('Schaffhausen');

console.log(
    canton.setLanguage('de').getName(), // Schaffhausen
);
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Tests are written with [ava](https://github.com/avajs/ava).

```shell
npm run test
```

### And coding style tests

[Eslint](http://eslint.org/) is used to lint the Javascript code. The checks are executed while running webpack. So you can run one of the following commands.

```shell
npm run dev
npm run build
```

## Deployment


```shell
npm update patch | minor | major
npm publish
```

## Built With

* [ava](https://github.com/avajs/ava) - Test Framework
* [nyc](https://github.com/istanbuljs/nyc) - Code Coverage

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/2media/js-regio-parameters).

## Authors

* **Stefan Zweifel** - *Initial work* - [stefanzweifel](https://github.com/stefanzweifel)

See also the list of [contributors](https://github.com/stefanzweifel/js-swiss-cantons/contributors) who participated in this project.

## Acknowledgments

- [php-swiss-cantons](https://github.com/stefanzweifel/php-swiss-cantons))