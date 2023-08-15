# F19 SDK JS
[![Language](https://img.shields.io/badge/language-javascript-yellow.svg)](https://git.gracious.nl/f19/f19-sdk-js) [![Language](https://img.shields.io/badge/language-typescript-blue.svg)](https://git.gracious.nl/f19/f19-sdk-js)

Javascript SDK for the F19 digital reporting platform. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```text
- Node.JS
- Typescript
```

### Installing (TODO)

A step by step series of examples that tell you how to get a development env running

```bash
npm install 
```

or

```bash
yarn
```

or

```bash
pnpm i
```

## Usage (TODO)

```javascript
import { F19 } from 'f19-sdk-js';

const client = new F19({
    apiKey: "[F19_API_KEY]",
    baseUrl: "[F19_BASE_URL]"
})
```
or

```javascript
const F19 = require('f19-sdk-js');

const client = new F19({
    apiKey: "[F19_API_KEY]",
    baseUrl: "[F19_BASE_URL]"
})
```

## Running the tests (TODO)

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why 

```text
Give an example
```

### And coding style tests

Explain what these tests test and why

```text
Give an example
```

## Scripts

| Command                                           | Description                            |
|---------------------------------------------------|----------------------------------------|
| `npm run build` or `yarn build`                   | Compile typescript into javascript     |
| `npm run prettier:write` or `yarn prettier:write` | Format all files that match RegEx      |
| `npm run prettier:check` or `yarn prettier:check` | Check if files are formatted correctly |


## Built With

* [Typescript](https://www.typescriptlang.org/docs/) - The programming language used

## Contributing

Please read our [coding guidelines](https://graciousstudios.atlassian.net/wiki/spaces/GS/pages/374734849/Development) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://git.gracious.nl/[group]/[repository]/tags).

## Authors

* **Yuraymar Stewart** - *Initial work* - [ywtstewart](https://github.com/ywtstewart)

See also the list of [contributors](<https://git.gracious.nl/f19/f19-sdk-js/graphs/[default> branch]) who participated in this project.
