import { createApi } from '@src/api';
import { lorem } from 'faker';
import status from 'statuses';

const api = createApi();

describe('Store:list', () => {
  beforeEach(async () => {
    const { data } = await api.store.list();
    await Promise.all(data.map(({ main_key }) => api.store.delete({ main_key })));
  });

  it('should return empty array if empty', async () => {
    const res = await api.store.list();
    expect(res).toMatchObject({
      status: 200,
      statusText: status(200),
      data: [],
    });
  });

  it('should return contents', async () => {
    const data = Array(5)
      .fill('')
      .map((i) => ({ main_key: `${i}_${lorem.word()}`, value: lorem.word() }));
    for (const it of data) {
      await api.store.create(it);
    }
    // its a pity that i can't use this to speed up pre-conditions
    // failing with 400: Bad request value already exists
    // await Promise.all(data.map((it) => api.store.create(it)));

    const res = await api.store.list();
    expect(res).toMatchObject({
      status: 200,
      statusText: status(200),
      // its a pity that items returned not in the same order they were created
      data: expect.arrayContaining(data),
    });
  });
});
