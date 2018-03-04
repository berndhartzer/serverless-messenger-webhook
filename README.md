# Serverless Messenger Webhook

This project is a [Serverless](https://serverless.com/) version of the [Facebook Messenger Webhook starter project](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup). It is not a carbon copy of the code. Naturally, some aspects are changed due to the differences between the original Node.js application (designed to run on a server) and this version (designed to run on AWS Lambda), and in other cases there may be small changes, comments ommitted, etc.

The main purpose of this project is to allow a quick start to experimenting with Facebook Messenger webhooks, or to act as boilerplate for creating new applications.

## Setting up Facebook application

## Setting up the environment

To set up the environment ready for deploying you need to create the `dev` and `prod` environment files. There are yaml files located in the `env/` directory. You can utilise the example files to do this:
```sh
$ cp env/dev-example.yml env/dev.yml
$ cp env/prod-example.yml env/prod.yml
```
Then edit the `dev.yml` and `prod.yml` files and replace the placeholder values with the correct values (note: if you just wish to get started by deploying to `dev` than you do not need to supply values to `prod.yml`)

## Deploying

To deploy the application to the `dev` stage:
```sh
$ sls deploy
```
