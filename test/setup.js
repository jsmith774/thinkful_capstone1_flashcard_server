process.env.TZ = 'UCT';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'sinkingfeeling';

require('dotenv').config();

process.env.TEST_DB_URL =
  process.env.TEST_DB_URL || 'postgresql://cybercard@localhost/cybercard-test';

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;
