import { createApi } from '@src/api';
import { lorem } from 'faker';
import status from 'statuses';

const api = createApi();
const existingItemKey = lorem.word();

describe('Store:update', () => {
  beforeEach(async () => {
    const { data } = await api.store.list();
    await Promise.all(data.map(({ main_key }) => api.store.delete({ main_key })));
    await api.store.create({ main_key: existingItemKey, value: lorem.word() });
  });

  it('should update item', async () => {
    const data = { main_key: existingItemKey, value: 'updated' };
    const res = await api.store.update({ main_key: existingItemKey, value: 'updated' });

    expect(res).toMatchObject({
      status: 200,
      statusText: status(200),
      data,
    });
  });

  it('should return error when trying to update non-existing item', async () => {
    const res = await api.store.update({ main_key: 'non-existing-key', value: lorem.word() });
    expect(res).toMatchObject({
      status: 400,
      statusText: status(400),
    });
  });
});
