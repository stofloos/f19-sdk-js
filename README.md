# F19 SDK JS
[![Language](https://img.shields.io/badge/language-javascript-yellow.svg)](https://git.gracious.nl/f19/f19-sdk-js) [![Language](https://img.shields.io/badge/language-typescript-blue.svg)](https://git.gracious.nl/f19/f19-sdk-js)

Javascript SDK for the F19 digital reporting platform. 

## Getting Started

## How to install

### Installing

A step by step series of examples that tell you how to get a development env running

```bash
npm install @happy-horizon/f19-sdk-js
```

> ⚠️ This SDK uses the Fetch API under the hood. If your environment doesn't support it, you need to install a polyfill like [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) or [node-fetch](https://github.com/node-fetch/node-fetch)


## Usage 

Create a new folder in root called "lib" and add a file called "f19.js" with the following content:

```javascript
import F19 from '@happy-horizon/f19-sdk-js';

const client = new F19({
    apiKey: "[F19_API_KEY]",
    baseUrl: "[F19_BASE_URL]"
})
```
or

```javascript
const F19 = require('@happy-horizon/f19-sdk-js');

const client = new F19({
    apiKey: "[F19_API_KEY]",
    baseUrl: "[F19_BASE_URL]"
})
```

## Available methods

| Grouping         | Method Name       | Parameters                                  |
|------------------|-------------------|---------------------------------------------|
| articles         | getAllByProjectId | projectId: string                           |
|                  | getById           | articleId: string                           |
| assets           | getImageByName    | projectId: string, name: string             |
|                  | getDownloadByName | projectId: string, name: string             |
|                  | getBlobByToken    | token: string                               |
| channel          | getAll            |                                             |
| charts           | getAll            | projectId: string                           |
|                  | getById           | chartId: string                             |
| downloads        | getById           | id: string                                  |
|                  | getAllByProjectId | projectId: string                           |
| facetNavigations | getAll            | projectId: string                           |
|                  | getById           | facetId: string                             |
| images           | getAll            | projectId: string                           |
|                  | getById           | imageId: string                             |
| nonce            | getNonce          |                                             |
| projects         | getAll            |                                             |
|                  | getById           | id: string                                  |
| reports          | getById           | id: string                                  |
|                  | getAllByProjectId | id: string                                  |
| tables           | getAll            | projectId: string                           |
|                  | getById           | tableId: string                             |
| tokens           | tokenRequest      | url: string, authorizationToken: string     |
|                  | getPersonal       | authorizationToken: string                  |
|                  | getAnonymous      | authorizationToken: string                  |
| websites         | getAll            |                                             |
|                  | getByAlias        | alias: string                               |
|                  | getCurrent        |                                             |

### Example usage

```javascript
// Define the projectId (you would replace this with your actual project ID)
const projectId = "your_project_id_here";

// Call the getAllByProjectId method
client.article.getAllByProjectId(projectId)
    .then((result) => {
        // Handle the result here
        console.log("Result:", result);
    })
    .catch((error) => {
        // Handle any errors that occur
        console.error("Error:", error);
    });
```
