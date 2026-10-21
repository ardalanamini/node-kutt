# Kutt

Node.js & browser (TypeScript) client for [Kutt](https://kutt.to) url shortener.

[![Latest Version](https://img.shields.io/npm/v/kutt.svg)](https://www.npmjs.com/package/kutt)
[![CI](https://github.com/ardalanamini/node-kutt/actions/workflows/ci.yml/badge.svg)](https://github.com/ardalanamini/node-kutt/actions/workflows/ci.yml)
[![Monthly NPM Downloads](https://img.shields.io/npm/dm/kutt.svg)](https://www.npmjs.com/package/kutt)
[![Total NPM Downloads](https://img.shields.io/npm/dt/kutt.svg)](https://www.npmjs.com/package/kutt)
[![NPM Bundle Size (minified)](https://img.shields.io/bundlephobia/min/kutt.svg)](https://bundlephobia.com/package/kutt)
[![NPM Bundle Size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/kutt.svg)](https://bundlephobia.com/package/kutt)
[![Known Vulnerabilities](https://snyk.io/test/github/ardalanamini/node-kutt/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ardalanamini/node-kutt?targetFile=package.json)
[![Pull Requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/ardalanamini/node-kutt/pulls)
[![License](https://img.shields.io/github/license/ardalanamini/node-kutt.svg)](https://github.com/ardalanamini/node-kutt/blob/main/LICENSE)
[![Github Stars](https://img.shields.io/github/stars/ardalanamini/node-kutt.svg?style=social&label=Stars)](https://github.com/ardalanamini/node-kutt)
[![Github Forks](https://img.shields.io/github/forks/ardalanamini/node-kutt.svg?style=social&label=Fork)](https://github.com/ardalanamini/node-kutt)

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
  .set("api", "https://kutt.to/api/v2") // API base url (Default value)
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
  .set("api", "https://kutt.to/api/v2") // API base url
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

We use [SemVer](http://semver.org) for versioning. For the versions available, see
the [releases on this repository](https://github.com/ardalanamini/node-kutt/releases).

## Authors

- **Ardalan Amini** - *Core Maintainer* - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/ardalanamini/node-kutt/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ardalanamini/node-kutt/blob/main/LICENSE) file for details
