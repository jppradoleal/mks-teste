<img src="https://www.mkssistemas.com.br/wp-content/uploads/2019/06/logo-mks-sistemas.png" alt="MKS Logo"></img>

# MKS Fullstack Node JS Developer assessment test

![](https://img.shields.io/github/checks-status/jpradoleal/mks-teste/main) ![](https://img.shields.io/github/workflow/status/jpradoleal/mks-teste/deploy-production) ![](https://img.shields.io/snyk/vulnerabilities/github/jppradoleal/mks-teste) ![](https://img.shields.io/github/languages/code-size/jppradoleal/mks-teste) ![](https://img.shields.io/github/license/jppradoleal/mks-teste) ![](https://img.shields.io/website?down_color=red&down_message=down&up_color=green&up_message=up&url=https%3A%2F%2Fmks-teste.fly.dev%2Fswagger)

## Description

1. Do a JWT auth system.
2. Create a movies catalog CRUD, it should be available only to authenticated users.

## Techs

- [x] Typescript.
- [x] Nest.js.
- [x] TypeORM.
- [x] Swagger.
- [x] Docker.
- [ ] Redis (Configured, but wasn't used).
- [x] PostgreSQL.

## Running the app

1. Create a `.env` file, `cp .env.example .env`. The example .env is pre-configured to docker.
2. Run `docker-compose up` and you're ready to go.

## Deploying

This project has a pipeline configured to deploy the API to fly.io when a new release is published.
To undo a deploy, execute the previous workflow.

## Codestyle enforcement and linting

This project has Husky configured, it will run Prettier and ESlint before each commit. There's also a workflow that executes with every push to any branch, it will check for codestyle and any linting errors.

## Technical aspects

The architecture is composed by an application providing an RESTful API in JSON, all data received by the API is validated with `class-validator`.

## Back-end

> Feel free to mention your experience with each tech used.

* Docker: 2-3 years.
* Redis: 2-3 years.
* Swagger: 2-3 years.
* Github Actions: 2 years.
* PostgreSQL: 2-3 years.
* Typescript: 1 year.
* NestJS: First time using.
* TypeORM: First time using.

## Contact me

- Author - [João Prado](https://www.linkedin.com/in/jppradoleal/)
- Website - [https://jprado.dev/](https://jprado.dev/)

## License

[MIT licensed](LICENSE).
