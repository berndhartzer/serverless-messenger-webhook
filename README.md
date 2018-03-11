# Serverless Messenger Webhook

This project is a [Serverless](https://serverless.com/) version of the [Facebook Messenger Webhook starter project](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup). It is not a carbon copy of the code. Naturally, some aspects are changed due to the differences between the original Node.js application (designed to run on a server) and this version (designed to run on AWS Lambda), and in other cases there may be small changes, comments ommitted, etc.

The main purpose of this project is to allow a quick start to experimenting with Facebook Messenger webhooks, or to act as boilerplate for creating new applications.

## Setting up Facebook application

To create your Facebook application, which will call this webhook it is best to follow [Facebook's guide](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup).

The key things you need to deploy and run this application is a verify token and a page access token. These tokens are inserted in the relevant environment config files (detailed in the next section).

## Setting up the environment

To set up the environment ready for deploying you need to create the `dev` and `prod` environment files. There are yaml files located in the `env/` directory. You can utilise the example files to do this:
```sh
$ cp env/dev-example.yml env/dev.yml
$ cp env/prod-example.yml env/prod.yml
```
Then edit the `dev.yml` and `prod.yml` files and replace the placeholder values with the correct values (note: if you just wish to get started by deploying to `dev` than you do not need to supply values to `prod.yml`)

I put a profile variable in here so it's easy to specify an appropriate set of AWS credentials for deployment. But, you could remove `profile` from the `provider` section of the `serverless.yml` file to use the default AWS credentials of the machine you're deploying from.

## Deploying

To deploy the application to the `dev` stage:
```sh
$ sls deploy
```

To deploy to `prod`:
```sh
$ sls deploy --stage prod
```

This will deploy the Serverless application to the relevant stage, in the default region (specified in `.aws/config`). If you would like to specify a region to deploy to you can use the region parameter:
```sh
$ sls deploy --stage prod --region us-east-1
```
