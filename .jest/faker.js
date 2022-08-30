const faker = require('faker');
const crypto = require('crypto');
const min = 0;
const max = 1000 * 1000 * 1000;
const randomNumber = crypto.randomInt(min, max);
faker.seed(randomNumber);
