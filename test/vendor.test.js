import request from 'supertest';
import app from '../index'; 


describe('Vendor Endpoints', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 'jghdsadafgfgjhkg' }, process.env.JWT_TOKEN);

  });

  it('should get all vendors', async () => {
    const res = await request(app)
      .get('/api/v1/vendor')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a vendor by ID', async () => {
    const res = await request(app)
      .get('/api/vendors/test-vendor-id')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });
});
