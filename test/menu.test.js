import request from 'supertest';
import app from '../index';  
import  jwt from 'jsonwebtoken';

describe('Menu Endpoints', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 'jghdsadafgfgjhkg' }, process.env.JWT_TOKEN);

  });

  it('should create a new menu item', async () => {
    const res = await request(app)
      .post('/api/v1/menu')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'chickwizz',
        description: 'bread and chicken with mayo',
        price: 2100.99,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all menu items for a vendor', async () => {
    const res = await request(app)
      .get(`/api/v1/vendors/:${id}/menu`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a menu item by ID', async () => {
    const res = await request(app)
      .get(`/api/menu-items/:${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });
});
