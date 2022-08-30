import { createApi } from '@src/api';
import { lorem } from 'faker';
import status from 'statuses';

const api = createApi();

describe('Store:create', () => {
  beforeEach(async () => {
    const { data } = await api.store.list();
    await Promise.all(data.map(({ main_key }) => api.store.delete({ main_key })));
  });

  it('should create item', async () => {
    const data = { main_key: lorem.word(), value: lorem.word() };
    const res = await api.store.create(data);
    expect(res).toMatchObject({
      status: 200,
      statusText: status(200),
      data,
    });
  });

  it('should return error when quota is reached', async () => {
    // quota seems to be set to 11 instead of 10 which mentioned in documentation
    const data = Array(11)
      .fill('')
      .map((i) => ({ main_key: `${i}_${lorem.word()}`, value: lorem.word() }));
    for (const it of data) {
      await api.store.create(it);
    }
    // its a pity that i can't use this to speed up pre-conditions
    // failing with 400: Bad request value already exists
    // await Promise.all(data.map((it) => api.store.create(it)));

    const res = await api.store.create({ main_key: lorem.word(), value: lorem.word() });
    expect(res).toMatchObject({
      status: 400,
      statusText: status(400),
    });
  });
});
