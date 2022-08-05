# Kutt

Node.js & browser (TypeScript) client for [Kutt][KUTT_URL] url shortener.

[![NPM Version][NPM_BADGE]][NPM_URL]
[![Test][TEST_BADGE]][TEST_URL]
[![NPM Monthly Downloads][NPM_MONTHLY_DOWNLOADS_BADGE]][NPM_MONTHLY_DOWNLOADS_URL]
[![NPM Total Downloads][NPM_TOTAL_DOWNLOADS_BADGE]][NPM_TOTAL_DOWNLOADS_URL]
[![NPM Bundle Size (minified)][BUNDLE_BADGE]][BUNDLE_URL]
[![NPM Bundle Size (minified + gzip)][BUNDLE_GZIP_BADGE]][BUNDLE_GZIP_URL]
[![Known Vulnerabilities][VULNERABILITIES_BADGE]][VULNERABILITIES_URL]
[![Pull Requests][PRS_BADGE]][PRS_URL]
[![License][LICENSE_BADGE]][LICENSE_URL]
[![Github Stars][STARS_BADGE]][STARS_URL]
[![Github Forks][FORKS_BADGE]][FORKS_URL]

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [CommonJS](#commonjs)
  - [ECMAScript](#ecmascript)
  - [Default Config](#default-config)
  - [Instance](#instance)
  - [Instance Config](#instance-config)
  - [Domains](#domains)
  - [Health](#health)
  - [Links](#links)
  - [Users](#users)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)

## Installation

```shell
npm i kutt
```

## Usage

### CommonJS

```typescript
const Kutt = require("kutt").default;
```

or

```typescript
const { Kutt } = require("kutt");
```

### ECMAScript

```typescript
import Kutt from "kutt";
```

or

```typescript
import { Kutt } from "kutt";
```

### Default Config

#### Get

```typescript
const api: string = Kutt.get("api");

const key: string = Kutt.get("key");

const timeout: number = Kutt.get("timeout");
```

#### Set

```typescript
Kutt
  .set("api", "https://kutt.it/api/v2") // API base url (Default value)
  .set("key", "") // API key (Default value)
  .set("timeout", 1e4); // Request timeout (Default value)
```

### Instance

```typescript
const kutt = new Kutt();
```

### Instance Config

Override the default config only for the instance.

#### Get

```typescript
const api: string = kutt.get("api");

const key: string = kutt.get("key");

const timeout: number = kutt.get("timeout");
```

#### Set

```typescript
kutt
  .set("api", "https://kutt.it/api/v2") // API base url
  .set("key", "") // API key
  .set("timeout", 1e4); // Request timeout
```

### Domains

```typescript
const domains = kutt.domains();
```

#### Create

Create a domain.

```typescript
const domain = await domains.create({
  address: "string",
  homepage: "string",
});
```

#### Delete

Delete a domain.

```typescript
const message = await domains.remove(domain.id);
```

### Health

```typescript
const health = kutt.health();
```

#### Check

Check API health.

```typescript
const isHealthy = await health.check();
```

### Links

```typescript
const links = kutt.links();
```

#### List

Get list of links.

```typescript
const result = await links.list();
```

You can also pass in pagination params.

```typescript
const result = await links.list({
  skip: 0, // Default value
  limit: 10, // Default value
  all: 10, // Default value
});
```

#### Create

Create a short link.

```typescript
const link = await links.create({
  target: "string",
  description: "string",
  expire_in: "2 minutes/hours/days",
  password: "string",
  customurl: "string",
  reuse: false,
  domain: "string",
});
```

#### Stats

Get link stats.

```typescript
const stats = await links.stats(link.id);
```

#### Update

Update a link.

```typescript
const updatedLink = await links.update(link.id, {
  target: "string",
  address: "string",
  description: "string",
  expire_in: "2 minutes/hours/days",
});
```

#### Delete

Delete a link.

```typescript
const message = await links.remove(link.id);
```

### Users

```typescript
const users = kutt.users();
```

#### Info

Get user info.

```typescript
const info = await users.info();
```

## Versioning

We use [SemVer][SEMVER_URL] for versioning. For the versions available, see
the [releases on this repository][RELEASES_URL].

## Authors

- **Ardalan Amini** - *Core Maintainer* - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors][CONTRIBUTORS_URL] who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE][LICENSE_URL] file for details


[NPM_BADGE]: https://img.shields.io/npm/v/kutt.svg

[NPM_URL]: https://www.npmjs.com/package/kutt

[TEST_BADGE]: https://github.com/ardalanamini/node-kutt/actions/workflows/test.yml/badge.svg

[TEST_URL]: https://github.com/ardalanamini/node-kutt/actions/workflows/test.yml

[NPM_MONTHLY_DOWNLOADS_BADGE]: https://img.shields.io/npm/dm/kutt.svg

[NPM_MONTHLY_DOWNLOADS_URL]: https://www.npmjs.com/package/kutt

[NPM_TOTAL_DOWNLOADS_BADGE]: https://img.shields.io/npm/dt/kutt.svg

[NPM_TOTAL_DOWNLOADS_URL]: https://www.npmjs.com/package/kutt

[BUNDLE_BADGE]: https://img.shields.io/bundlephobia/min/kutt.svg

[BUNDLE_URL]: https://bundlephobia.com/package/kutt

[BUNDLE_GZIP_BADGE]: https://img.shields.io/bundlephobia/minzip/kutt.svg

[BUNDLE_GZIP_URL]: https://bundlephobia.com/package/kutt

[VULNERABILITIES_BADGE]: https://snyk.io/test/github/ardalanamini/node-kutt/badge.svg?targetFile=package.json

[VULNERABILITIES_URL]: https://snyk.io/test/github/ardalanamini/node-kutt?targetFile=package.json

[PRS_BADGE]: https://img.shields.io/badge/PRs-Welcome-brightgreen.svg

[PRS_URL]: https://github.com/ardalanamini/node-kutt/pulls

[LICENSE_BADGE]: https://img.shields.io/github/license/ardalanamini/node-kutt.svg

[LICENSE_URL]: https://github.com/ardalanamini/node-kutt/blob/master/LICENSE

[STARS_BADGE]: https://img.shields.io/github/stars/ardalanamini/node-kutt.svg?style=social&label=Stars

[STARS_URL]: https://github.com/ardalanamini/node-kutt

[FORKS_BADGE]: https://img.shields.io/github/forks/ardalanamini/node-kutt.svg?style=social&label=Fork

[FORKS_URL]: https://github.com/ardalanamini/node-kutt

[KUTT_URL]: https://kutt.it

[SEMVER_URL]: http://semver.org

[RELEASES_URL]: https://github.com/ardalanamini/node-kutt/releases

[CONTRIBUTORS_URL]: https://github.com/ardalanamini/node-kutt/contributors
