import { createTestContext } from './helper';

const ctx = createTestContext();

describe('DataTable', () => {
  test('fetch draft DataTables', async () => {
    const draftResults = await ctx.client?.request(`
      {
        drafts {
          id
          name
          status
          fileKey
        }
      }
    `);
    expect(draftResults).toMatchInlineSnapshot(`
Object {
  "drafts": Array [
    Object {
      "fileKey": "liam1",
      "id": "1",
      "name": "Liam",
      "status": "draft",
    },
    Object {
      "fileKey": "rem1",
      "id": "2",
      "name": "Rem",
      "status": "draft",
    },
    Object {
      "fileKey": "naska2",
      "id": "3",
      "name": "Nazgul",
      "status": "draft",
    },
    Object {
      "fileKey": "123",
      "id": "4",
      "name": "41",
      "status": "draft",
    },
  ],
}
`)
  })
});
