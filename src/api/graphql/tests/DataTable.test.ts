import server from '../../../server';
import supertest from 'supertest';

const request = supertest(server);

describe('DataTable', () => {
  test('fetch draft DataTables', async (done) => {
    request.post('/graphql').send({
      query: '{drafts {id, name, status, fileKey}}'
    }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(
      (err, res) => {
        if (err) return done(err)
        done()
      }
    )
  })
});
