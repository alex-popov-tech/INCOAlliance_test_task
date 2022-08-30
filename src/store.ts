import { AxiosResponse } from 'axios';
import { del, get, post, put } from './util';

type Item = { main_key: string; value: string };

export const createStore = ({ baseUrl }: { baseUrl: string }) => ({
  list: (): Promise<AxiosResponse<Item[]>> => get(baseUrl),
  // create with PUT seems non-conventional
  create: (data: Item): Promise<AxiosResponse<Item>> => put(baseUrl, { data }),
  // 1. force update with POST seems non-conventional
  // 2. update with referencing entity id (main_key) in body seems a bit non-convintional comparing to route like PUT - /url/:id { body }
  update: (data: Item): Promise<AxiosResponse<Item>> => post(baseUrl, { data }),
  // delete with referencing entity id (main_key) in body seems a bit non-convintional comparing to route like DELETE - /url/:id
  delete: (data: { main_key: string }): Promise<AxiosResponse<Item>> => del(baseUrl, { data }),
});
