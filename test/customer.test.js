import request from 'supertest';
import app from '../index'; 

describe('Customer Endpoints', () => {
  it('should register a new customer', async () => {
    const res = await request(app)
      .post('/api/v1/register')
      .send({
        name: 'Tunde Kadiri',
        email: 'tundeK@gmail.com.com',
        password: 'passworxxvg567'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('token');
  });

  it('should login a customer', async () => {
    const res = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'tundeK@gmail.com.com',
        password: 'passworxxvg567'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
