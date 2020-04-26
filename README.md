# HackaTalk Server

[![CircleCI](https://circleci.com/gh/dooboolab/hackatalk-server.svg?style=shield)](https://circleci.com/gh/dooboolab/hackatalk-server)
[![codecov](https://codecov.io/gh/dooboolab/hackatalk-server/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/hackatalk-server)
[![Build Status](https://dev.azure.com/hackatalkdevops/HackaTalk/_apis/build/status/hackatalk%20-%20CI?branchName=master)](https://dev.azure.com/hackatalkdevops/HackaTalk/_build/latest?definitionId=1&branchName=master)
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
  DB_CONNECTOR=mysql
  DB_HOST=127.0.0.1
  DB_USER=hackatalk
  DB_PASSWORD=hackatalk!
  DB_PORT=3306
  DB_DATABASE=hackatalk_dev
  ```

### Test Apis

- [hackatalk.azurewebsites.net](https://hackatalk.azurewebsites.net)

### Test Graphql Apis

- [hackatalk.azurewebsites.net/graphql](https://hackatalk.azurewebsites.net/graphql)

### Migration

```
yarn migrate
```