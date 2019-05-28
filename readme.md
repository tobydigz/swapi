# Star Wars API

## Package Manager

[Yarn](https://yarnpkg.com/lang/en/) is the package manager in use here. It can be installed on your local machine by visiting

* [Windows](https://yarnpkg.com/en/docs/install#windows-stable)
* [Mac OS](https://yarnpkg.com/en/docs/install#mac-stable)

After installing Yarn, you can run `yarn install` in the root folder to install dependencies.
Other Yarn basic commands can be found here [https://yarnpkg.com/en/docs/usage](https://yarnpkg.com/en/docs/usage)

## API Documentation

API documentation can be found in the [routes.md](routes.md) file


## Run Locally

* You'll need to have a NodeJS installed. [NODEJS](https://nodejs.org/en/)
* You'll need to have a PostgresDB installed.
* Update environment variables in a **.env** file. See [**sample.env**](sample.env) for accepted variables
* Run the following command

```bash
yarn run start
```

## Run Via Docker

* You'll need to have a Docker installed. [DOCKER](https://docs.docker.com/install/#supported-platforms)

```bash
yarn run docker-dev
```

### Run Tests

Run tests with

```bash
yarn run test
```
