<img src="https://cdn1.databox.com/images/logo/databox-dark.svg" width="50%" alt="databox-logo">

# Databox Backend Engineer Challenge Playbook

Info, related to development process is available in the README.md file. This file is specifically meant to answer the questions, asked in the Backend Engineer Challenge document and clarify some of the things that could be unclear.

## Architecture

There was quite some research made when I was deciding what architecture approach to use. At the end, I decided to go with a
modified "Clean Architecture" approach, where our project is structured in the following way:
- `.husky` - pre-commit and pre-push hooks
- `src` - the most relevant directories and files, implementing the core logic and functionalities
  - `config` - all configuration files (typeorm, swagger, general config)
  - `docs` - swagger factory and postman collection
  - `libs` - internally used modules, mainly used for database-related code to completely separate the "repository" layer from the business logic
    - `db/entities`
    - `db/interfaces`
    - `db/migrations`
    - `db/services`
    - `db/typeorm`
    - that's where we'd potentially also include every other internally used service such as Redis for caching etc.
  - `modules` - business logic modules, used to expose the endpoints and process the requests, map data into different formats etc.
    - `manage` - main module, responsible for managing the core of our project - metrics
    - `schedule` - scheduler module, responsible for scheduling the task of streamlining the metrics to Databox Push API
  - `shared` - everything that doesn't belong anywhere else - shared components such as utility functions, shared interfaces/enums, helper functions and seeders
  - `vendors` - 3rd party hub of integration services to make them completely decoupled and detached from business logic and internally used components. That module is split into different vendors and each one of them serves as an integration service to its API.
    - `databox` - Databox API integration service, allowing us to update data via Databox Push API
    - `github` - GitHub API, responsible for managing the OAuth2 flow and fetching relevant metrics, such as number of commits/pull requests etc.
    - `coincap` - CoinCap API, handling the requests for Cryptocurrency related metrics, such as USD price of BTC/EHT etc.
- `test` contains test files that ensure a proper coverage is reached and everything works as expected
  - Sub-folders follow the same structure as the one, described in the `src` explanation


## Flow

A super short flow of the setup is available in this section of the document:
1. Clone repository from GitHub via `git@github.com:uzagoranski/databox-challenge.git` command
2. Contact [me](mailto:urozag@gmail.com) to get the .env file that has all secrets included. Paste that file into root directory of this project
3. Run `npm install` script
4. Run `docker-compose up` script
   1. If you're using a device with Apple Silicon chip, run `docker-compose -f docker-compose.arm.yml up` script
5. Run `nvm use` script to use the right Node.js version
6. Run `npm run typeorm:migration:run` script to add all required entities to your local database
7. Run `npm run seed` script to add some test data to your local database
8. Run `npm run start:dev` to start the local server
9. Play around with the API that's running on `http://localhost:3000/` by default. You can view the simple Swagger documentation by clicking on `http://localhost:3000/api`
   1. If possible, start with GitHub API as it requires OAuth2 flow. In case you won't authenticate your GitHub account, the cronjob, scheduled for 23:59 each day won't be able to successfully perform metrics update operation, hence dashboards in Databox platform won't reflect the real state.
   2. Service also allows you to fetch, filter and sort the list of historically pushed data.
10. When you're happy with the results, go to [pre-created dashboard](https://app.databox.com/datawall/e92939ee0b9635037b888d1aeb5d5e60145cbe865042b13) and check out the metrics we've pushed to the Databox API

## Potential improvements

One of the major limitations in this project is the fact that it's a Backend Engineer Challenge, which means we don't have any frontend implemented for that matter.
That introduces a drawback in the OAuth2 flow as it's quite welcome to visually present it. That means we have to use some workarounds in order to be able to successfully 
complete the flow. That can be achieved by following these steps:
1. Open your browser
2. Click on the following [link](http://localhost:3000/api/databox-challenge/manage/metrics/GitHub)
   1. If you haven't authenticated your GitHub account yet, you'll be redirected to the GitHub login screen. Authenticate your account by entering your username and password.
   2. Otherwise, we'll (instantly) call GitHub API in the background and fetch the relevant metrics

Second problem, introduced by the limited amount of time and required functionalities is the "hackish" way of storing authentication data.
Since we're implementing a development application with no user login functionalities that would allow us to connect user data with
GitHub account data we decided to always store only 1 instance of authentication data per service instance. That would be rather
easily solved by implementing and enhancing the existing functionalities with a regular user management system.

Another limitation is brought by the non-existing live deployment of the service. That means that unless someone would leave their
machine with the service instance up and running, we wouldn't be able to reproduce the actual live behaviour of the cron jobs and schedulers.
We also used a NestJS integrated cron job mechanism that can be replaced with some kind of cloud-based scheduling (event-driven) system, 
such as AWS Lambda or GCP Cloud Scheduler etc.

Last but not least, to achieve complete scalability, it would be welcome to make our service containerised and use a dedicated
service for managing it such as Kubernetes and Docker. That way, we'd be able to use the built-in scaling capabilities such as
HPAs, clustering, pods etc. After reviewing the queries, we could also put some indices onto relevant properties in our entities,
that are regularly queried. As already mentioned, caching with Redis or some other cache-memory database comes in quite handy
when data isn't frequently changed but is often requested.

## Additional information
- Link to the [pre-created dashboard](https://app.databox.com/datawall/e92939ee0b9635037b888d1aeb5d5e60145cbe865042b13) and check out the metrics we've pushed to the Databox API
- Email address, used in the Databox app: [urozag@gmail.com](mailto:urozag@gmail.com)
