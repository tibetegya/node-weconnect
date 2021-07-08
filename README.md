# node-weconnect
this is the Weconnect api implemented using node express backend

[![Build Status](https://travis-ci.org/tibetegya/node-weconnect.svg?branch=master)](https://travis-ci.org/tibetegya/node-weconnect)
[![Coverage Status](https://coveralls.io/repos/github/tibetegya/node-weconnect/badge.svg?branch=master)](https://coveralls.io/github/tibetegya/node-weconnect?branch=master)

## Description

WeConnect is a web application that has a Restful backend api that feeds a Reactjs front-end app

## API-Application

The API Back-end is implemented using Nodejs and it is a RestFul API it is also
tested using intergration (Test Driven Development)

## Dependancies
- Nodejs
- Expressjs
- NodeMailer
- Chai
- Mocha
- Istanbul

## Set Up

In order to run the API Application

1. Clone this Repository to your development machine
    - Start by copying the url to this Repository
    > https://github.com/tibetegya/node-weconnect.git
    - Run this command in git bash to create the repo locally
    `git clone https://github.com/tibetegya/node-weconnect.git`

2. Install the dependencies by running the following command in a terminal shell `npm install`
3. Make sure to have environment variables in a `.env` file example of evironment variables is `sample.env`
4. Run the application in development `npm run start:dev` or in production `npm run start` 
5. To run the tests run `npm run test`
6. To run tests with coverage run `run test:cov`

## API End points

| EndPoint |Method|
|-------------|-------------|
|`/api/<version>/auth/register`| POST  |
|`/api/<version>/auth/login`|  POST |
|`/api/<version>/auth/logout`| POST |
|`/api/<version>/auth/reset-password`| POST |
|`/api/<version>/businesses`| POST |
|`/api/<version>/businesses/<businessId>`| PUT |
|`/api/<version>/businesses/<businessId>`| DELETE |
|`/api/<version>/businesses`| GET   |
|`/api/<version>/businesses/<businessId>`| GET   |
|`/api/<version>/businesses/<businessId>/reviews`| POST  |
|`/api/<version>/businesses/<businessId>/reviews`|  GET  |

1. Test the endpoints using [Postman](https://www.getpostman.com/) or [Curl](https://curl.haxx.se/)

## License

The project is licensed using MIT License therefore you are free to clone the repository and
modify the code base in any way you would like.

Copyright 2018 Tibetegya [MIT](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwiTvrzsh9_YAhWC1hQKHekjDHYQFggzMAE&url=https%3A%2F%2Fopensource.org%2Flicenses%2FMIT&usg=AOvVaw1MsEPekvPKCIceu2jiRDy4)