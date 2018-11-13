# Kutt <!-- omit in toc -->

Node.js client for Kutt.it url shortener

[![Npm Version](https://img.shields.io/npm/v/kutt.svg)](https://www.npmjs.com/package/kutt)
[![TypeScript Version](https://img.shields.io/npm/types/kutt.svg)](https://www.typescriptlang.org)
[![Package Quality](https://npm.packagequality.com/shield/kutt.svg)](https://packagequality.com/#?package=kutt)
[![Npm Total Downloads](https://img.shields.io/npm/dt/kutt.svg)](https://www.npmjs.com/package/kutt)
[![Npm Monthly Downloads](https://img.shields.io/npm/dm/kutt.svg)](https://www.npmjs.com/package/kutt)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/kutt.svg)](https://www.npmjs.com/package/kutt)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/kutt.svg)](https://www.npmjs.com/package/kutt)
[![Open Issues](https://img.shields.io/github/issues-raw/ardalanamini/node-kutt.svg)](https://github.com/ardalanamini/node-kutt/issues?q=is%3Aopen+is%3Aissue)
[![Closed Issues](https://img.shields.io/github/issues-closed-raw/ardalanamini/node-kutt.svg)](https://github.com/ardalanamini/node-kutt/issues?q=is%3Aissue+is%3Aclosed)
[![Known Vulnerabilities](https://snyk.io/test/github/ardalanamini/node-kutt/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ardalanamini/node-kutt?targetFile=package.json)
[![Dependencies Status](https://david-dm.org/ardalanamini/node-kutt.svg)](https://david-dm.org/ardalanamini/node-kutt)
[![Pull Requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/ardalanamini/node-kutt/pulls)
[![License](https://img.shields.io/github/license/ardalanamini/node-kutt.svg)](https://github.com/ardalanamini/node-kutt/blob/master/LICENSE)
[![Github Stars](https://img.shields.io/github/stars/ardalanamini/node-kutt.svg?style=social&label=Stars)](https://github.com/ardalanamini/node-kutt)
[![Github Forks](https://img.shields.io/github/forks/ardalanamini/node-kutt.svg?style=social&label=Fork)](https://github.com/ardalanamini/node-kutt)

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
  - [Static](#static)
    - [setAPI](#setapi)
    - [setKey](#setkey)
    - [setDomain](#setdomain)
  - [Instance](#instance)
    - [setAPI](#setapi-1)
    - [setKey](#setkey-1)
    - [setDomain](#setdomain-1)
    - [list](#list)
    - [submit](#submit)
    - [delete](#delete)
    - [stats](#stats)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Support](#support)

## Installation

`npm i kutt`

## Usage

```typescript
// es5
const Kutt = require("kutt");

// es6
import Kutt from "kutt";

// es6 & typescript
import * as Kutt from "kutt";
```

### Static

#### setAPI

Set global API address

```typescript
Kutt.setAPI(api_address: string): string;
```

#### setKey

Set global API key

```typescript
Kutt.setKey(key: string): string;
```

#### setDomain

Set global custom domain

```typescript
Kutt.setDomain(domain: string): string;
```

### Instance

```typescript
const kutt = new Kutt();
```

#### setAPI

Set instance's API address

```typescript
kutt.setAPI(api_address: string): this;
```

#### setKey

Set instance's API key

```typescript
kutt.setKey(key: string): this;
```

#### setDomain

Set instance's custom domain

```typescript
kutt.setDomain(domain: string): this;
```

#### list

Retrieve the short urls

```typescript
kutt.list(): Promise<Kutt.ListResult>;
kutt.list(callback: Kutt.Callback<Kutt.ListResult>): void;
```

#### submit

Create a new short url

```typescript
kutt.submit(data: Kutt.NewUrl): Promise<Kutt.Url>;
kutt.submit(data: Kutt.NewUrl, callback: Kutt.Callback<Kutt.Url>): void;
```

#### delete

Remove the short url

```typescript
kutt.delete(id: string): Promise<Kutt.Url>;
kutt.delete(id: string, callback: Kutt.Callback<Kutt.Url>): void;
```

#### stats

Remove the short url

```typescript
kutt.stats(id: string): Promise<Kutt.StatResult>;
kutt.stats(id: string, callback: Kutt.Callback<Kutt.StatResult>): void;
```

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the [tags on this repository](https://github.com/ardalanamini/kutt/tags).

## Authors

- **Ardalan Amini** - *Owner/Developer* - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/ardalanamini/kutt/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Support

If my work helps you, please consider

[![Become A Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/ardalanamini)

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ardalanamini)
