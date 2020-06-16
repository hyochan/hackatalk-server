# HackaTalk Server

[![CircleCI](https://circleci.com/gh/dooboolab/hackatalk-server.svg?style=shield)](https://circleci.com/gh/dooboolab/hackatalk-server)
[![codecov](https://codecov.io/gh/dooboolab/hackatalk-server/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/hackatalk-server)
[![Build Status](https://dev.azure.com/dooboolabdevops/HackaTalk/_apis/build/status/hackatalk%20-%20CI?branchName=master)](https://dev.azure.com/dooboolabdevops/HackaTalk/_build)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

> Specification

- [node](https://nodejs.org)
- [typescript](https://typescriptlang.org)
- [sequelize](http://docs.sequelizejs.com)
- [apollo-server](https://www.apollographql.com/docs/apollo-server)
- [jest](https://jestjs.io)

> Setup Dev env

- Create user in local mysql server account.
- Give appropriate name to `dev.env`.
  ```
  DB_CONNECTOR=postgres
  DB_HOST=localhost
  DB_USER=postgres
  DB_DATABASE=hackatalk
  DB_PORT=5432
  DB_PASSWORD=dooboolab0!
  ```

### Test Apis

- [hackatalk.azurewebsites.net](https://hackatalk.azurewebsites.net)

### Test Graphql Apis

- [hackatalk.azurewebsites.net/graphql](https://hackatalk.azurewebsites.net/graphql)

### Migration

```
yarn migrate
```

### Running in local environment

1. Create postgres database and give privileges (You can use `mysql` if you wish)
   ```
   CREATE DATABASE hackatalk;

   CREATE ROLE `postgres` WITH LOGIN NOSUPERUSER INHERIT CREATEDB NOCREATEROLE NOREPLICATION PASSWORD 'dooboolab0!';

   GRANT CONNECT ON DATABASE `hackatalk` TO `postgres`;

   GRANT ALL PRIVILEGES ON DATABASE `hackatalk` TO `postgres`;
   ```

2. Start the server

   ```
   yarn start
   ```

   > Above will just run the server with migration.