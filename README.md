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

## Installation

Requires Node.js >=22. This package uses ECMAScript modules (ESM).

```shell
pnpm add kutt
```

or

```shell
npm i kutt
```

## Usage

Create a client and shorten a URL:

```ts
import { Kutt } from "kutt";

const kutt = new Kutt().setAPIKey("YOUR_API_KEY");

const link = await kutt.links().createV2({
  target: "https://example.com/article",
  customURL: "article",
  expireIn: "2 days",
});

console.log(link.link);

const page = await kutt.links().listV2({ limit: 10 });
console.log(page.data);
```

You can also call endpoints directly:

```ts
import { listKuttLinksV2 } from "kutt";

const page = await listKuttLinksV2({
  limit: 10,
  apiKey: "YOUR_API_KEY",
});
```

Set defaults before creating clients, including when using a self-hosted Kutt server:

```ts
import { KUTT_CONFIG, Kutt } from "kutt";

KUTT_CONFIG
  .setBaseURL("https://kutt.example.com/api/")
  .setAPIKey("YOUR_API_KEY");

const kutt = new Kutt();
const isHealthy = await kutt.health().checkV2();
```

Clients copy the defaults when constructed. Each API group copies its client's configuration when created.

## Documentation

See the [full API documentation](https://ardalanamini.github.io/node-kutt/) for all
endpoints, configuration options, response types, and error handling.

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see
the [releases on this repository](https://github.com/ardalanamini/node-kutt/releases).

## Authors

- **Ardalan Amini** - *Core Maintainer* - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/ardalanamini/node-kutt/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ardalanamini/node-kutt/blob/main/LICENSE) file for details
