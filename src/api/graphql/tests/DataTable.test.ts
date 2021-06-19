import server from '../../../server';
import supertest from 'supertest';

const request = supertest(server);

describe('DataTable', () => {
  test('fetch draft DataTables', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: '{drafts {id, name, status, fileKey } }'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toBeInstanceOf(Object);
  })
});
