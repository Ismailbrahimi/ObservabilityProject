const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello from DevSecOps app!');
});

describe('GET /', () => {
  it('responds with hello', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello from DevSecOps app!');
    expect(res.statusCode).toBe(200);
  });
});
