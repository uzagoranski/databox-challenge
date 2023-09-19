<img src="https://cdn1.databox.com/images/logo/databox-dark.svg" width="50%" alt="databox-logo">

# Databox Backend Engineer Challenge [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/license/mit/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/uzagoranski/databox-challenge/pulls)

Databox Backend Engineer Challenge MS is an API, serving as a bridge between Databox API and 3rd party service providers (such as Facebook, Google Analytics, GitHub etc.).

## Prerequisites

To be able to run the service, you must ensure you have the following tools installed:

- **Node.js**: version 20.6.1 or higher. You can download and install it from [here](https://nodejs.org/en/download/).

> We encourage you to use [nvm](https://github.com/nvm-sh/nvm) to install, update and maintain multiple Node.js versions at the same time on your machine.

In case you use macOS with [Homebrew package manager](https://brew.sh/), you can install it via the following commands:

```zsh
# Node.js
$ brew install node
```

## Tech stack

- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript programming language used for developing the service.
- [NestJS](https://docs.nestjs.com/) - Framework for building efficient, scalable Node.js server-side applications, used to define the architecture and structure of the service.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes, used to perform request validation.
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - Serve auto-generated [Swagger UI](https://swagger.io/tools/swagger-ui/) for [express](http://expressjs.com/)-based applications.
- [Jest](https://jestjs.io/) - Testing framework.

## Installation

For installing all required dependencies, make sure you have `npm` installed on your machine.

Then, you just need to execute the following command:

```zsh
$ npm install
```

Once the installation is finished, you should see something like this:

```zsh
added 941 packages from 670 contributors and audited 957 packages in <seconds>

122 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Running the service

### ENV variables

Before running the service, you must define the ENV variables, required to make the integrations work.

Here you can find the complete list of ENV variables that the Databox Challenge MS uses:

| Variable                  | Description                                                                                                                            |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| DEVICE_CONFIGURATION_MODE | Determines on which environment the service is running. Can be one of: `development`, `production`                                     |
| MS_PORT                   | Allows modifying the port where the MS will run on (default is `3000`)                                                                 |
| SELF_URL                  | Used for scheduler/cronjob purposes to be able to externally access the API (in case we'd use an external service for task scheduling) |
| TYPEORM_PORT              | Port, where the MySQL instance is running                                                                                              |
| TYPEORM_HOST              | Host, where the MySQL instance is running                                                                                              |
| TYPEORM_DATABASE          | Database name to which TypeORM has to connect in order to perform queries                                                              |
| TYPEORM_USERNAME          | Username with which TypeORM will be able to perform queries in database from the previous row                                          |
| PRINT_CURL_REQUESTS       | Enables printing curl requests                                                                                                         |
| DATABOX_BASE_URL          | Url to which a connection will be made when calling Databox Push API                                                                   |
| DATABOX_USER_AGENT        | User-agent header that will be sent along the requests when calling Databox Push API                                                   |
| DATABOX_PUSH_INTERVAL     | Timeout between respective calls to Databox Push API to avoid throttling or overloading the API                                        |
| DATABOX_ITEMS_PER_BATCH   | Number of external service providers that will be called per batch and push the metrics to Databox                                     |
| GITHUB_BASE_URL           | Url to which a connection will be made when calling GitHub API                                                                         |
| GITHUB_API_VERSION        | Target API version to fetch from when calling GitHub API                                                                               |
| GITHUB_CLIENT_ID          | Client id of the GitHub application, created for this service                                                                          |

| Secret                      | Description                                                                              |
|-----------------------------|------------------------------------------------------------------------------------------|
| SECRET_TYPEORM_PASSWORD     | Password with which TypeORM will be able to perform queries                              |
| SECRET_DATABOX_PUSH_TOKEN   | Push token expected to be able to connect to the Databox Push API                        |
| SECRET_GITHUB_CLIENT_SECRET | Client secret, sent along with requests in order to be able to connect to the GitHub API |


Add your application configuration to your `.env` file in the root of your project by duplicating `.env-example` file:

```
DEVICE_CONFIGURATION_MODE=development
SECRET_X_API_KEY=SERVICEAPIKEY
...
```

### Docker

Make sure you have [Docker](https://docs.docker.com/get-docker/) installed.

To create an instance of your database, run one of the following commands:

```zsh
# For Apple Silicon chips
$ docker-compose -f docker-compose.arm.yml up

# For every other chip
$ docker-compose up
```

After executing these commands you should have the db container up and running.

### Migrations

After successfully starting the database in docker, run migrations and seeder to populate some test data:
```zsh
$ npm run typeorm:migration:run

$ npm run seed
```

After executing these commands you should have the entities created and ready to be used with some autogenerated data.


### Development mode

You can run the service in development mode with:

```zsh
# development mode
$ npm run start
```

That's it! This way, the service should be running on port 3000, with the configuration from your local `.env` file, accessible through [http://localhost:3000](http://localhost:3000).

### Watch mode

Run the service in development mode, watching file changes and reloading the running service with:

```zsh
# watch mode
$ npm run start:dev
```

## Tests

The tests are located in the test directory and named as the classes they test. Testing files have a `.spec` or `.test` suffix.

To only execute unit tests, use the following script:

```zsh
# unit tests
$ npm run test:unit
```

## API reference

The service is using the [Swagger](https://github.com/nestjs/swagger) module for NestJS to define and expose the databox-challenge MS API specification.

When the service is running, the API definition is exposed via Swagger UI in the `/api` endpoint.

In case you want to get the corresponding JSON file of the specification, you can get it from the `/api-json` endpoint.

When running the service on your machine, you can get to them via:

- [http://localhost:3000/api](http://localhost:3000/api) - Swagger UI
- [http://localhost:3000/api-json](http://localhost:3000/api-json) - JSON file

## Style guide

The structure used for the project follows the domain-based design, so each module/feature is isolated in its own folder, like `databox`, `auth`, `health`, making it easy to find and locate where the different functionalities exposed from the service might be.

The naming convention used for the files follows the pattern `<name>.<type>.ts`, where:

- _name_: The name of the component, class, or model you are defining.
- _type_: The type of content you have inside that file, e.g., `module`, `controller`, `service`, `guard`, `interceptor`, `entity`, etc.

```
# Examples:

databox.module.ts
databox.controller.ts
github.service.ts
databox-session.entity.ts
databox.dto.ts
```

> If the name is complex, we use hyphens to separate the different words, e.g. api-key-identification.entity.ts (Kebab Case)

## Useful links and docs

### Databox

- Databox - [Webpage](https://databox.com/) - Official company website.
- Databox - [Documentation](https://developers.databox.com/) - General development documentation (Push API etc.).

### GitHub

- GitHub - [Webpage](https://github.com/) - Official company website.
- GitHub - [Documentation](https://docs.coincap.io/) - General development documentation (GitHub Apps, OAuth apps, Marketplace etc.).


### CoinCap

- CoinCap - [Webpage](https://coincap.io/) - Official company website.
- CoinCap - [Documentation](https://docs.github.com/en/apps/overview) - General development documentation (RESTful API & WebSocket docs).
