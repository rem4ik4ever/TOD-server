import { initialize } from '../../../server';
import supertest from 'supertest';

describe('DataTable', () => {
  let request: any = null;
  beforeEach(async () => {
    const { app: server } = await initialize()
    request = supertest(server);
  })
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
