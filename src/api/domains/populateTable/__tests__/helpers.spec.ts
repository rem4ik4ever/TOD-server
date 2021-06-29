import { columnResourceMock } from '../../__mocks__/columnResource.mock';
import { saveColumns } from '../helpers';

describe('saveColumns', () => {
  it('saves list of strings into columns', async () => {
    const columnResource = columnResourceMock()
    const columns = await saveColumns(columnResource, ['id', 'name', 'age'], 1)
    expect(columns.length).toEqual(3)
    console.log({ columns })
    expect(columns[0].field).toEqual('id')
    expect(columns[1].field).toEqual('name')
    expect(columns[2].field).toEqual('age')
  });
})
