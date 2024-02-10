# Panda-HostedAgent

This is a hosted agent to pipe data to PandaScreeps Grafana without exposing your credentials.

## Security

What I receive from you is the following in total to use the hosted agent:

* Config name
* Hosted Agent Key
* Stats prefix

What I do with your data is get the data from the Screeps API and pipe it to the PandaScreeps API. Only memory OR segment api calls are made. No other data is accessed.

## Usage

### [Website](https://pandascreeps.com)

Login or create an account and create a config with the hosted agent option. You will receive a hosted agent key to use in the .env file.

### .env

Set the following data depending on your needs:

* MMO
  * SET `HOSTED_API_KEY` to your hosted agent key
  * SET `CRON_EXPRESSION` to for example `* * * * *` to run every minute for Memory paths or `*/10 * * * * *` to run every 10 seconds for Memory segments
  * SET `DATA_PREFIX` to the prefix you want to use for your data
  * SET EITHER `SCREEPS_MEMORY_PATH` or `SCREEPS_MEMORY_SEGMENT` to the path or segment you want to pipe to PandaScreeps
  * SET `SCREEPS_TOKEN` to your Screeps token
  * SET `SCREEPS_SHARD` to your Screeps shard
  * SET `SCREEPS_PATH` to the api path you want to use, for example `/` for mmo or `/season` for seasonal
* Private Server
  * SET `HOSTED_API_KEY` to your hosted agent key
  * SET `CRON_EXPRESSION` to for example `* * * * *` to run every minute for Memory paths or `*/10 * * * * *` to run every 10 seconds for Memory segments
  * SET `DATA_PREFIX` to the prefix you want to use for your data
  * SET EITHER `SCREEPS_MEMORY_PATH` or `SCREEPS_MEMORY_SEGMENT` to the path or segment you want to pipe to PandaScreeps
  * SET `SCREEPS_PRIVATE_USERNAME` to your username
  * SET `SCREEPS_PRIVATE_PASSWORD` to your user password
  * SET `SCREEPS_PRIVATE_HOST` to your server host
  * SET `SCREEPS_PRIVATE_PORT` to your server port
  * SET `SCREEPS_PRIVATE_PROTOCOL` to `https` or `http`
