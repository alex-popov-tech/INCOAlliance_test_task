import { createStore } from './store';

export const createApi = (options: { baseUrl: string } = { baseUrl: process.env.BASE_URL }) => ({
  store: createStore(options),
});

export * from './util';
