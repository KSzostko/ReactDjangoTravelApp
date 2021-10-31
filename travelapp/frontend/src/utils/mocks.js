import { rest } from 'msw';
import { BASE_API_URL } from 'setup/constans';
import { fakeUserData, fakeTravelsList, fakeTravelPhotos } from './fakeData';

export const handlers = [
  rest.post(`${BASE_API_URL}auth/login`, (req, res, ctx) => {
    const { username, password } = req.body;

    if (username === fakeUserData.user.username && password === 'password') {
      return res(ctx.status(200), ctx.json(fakeUserData));
    }

    return res(
      ctx.status(400),
      ctx.json({ non_field_errors: ['Incorrect Credentials'] })
    );
  }),
  rest.post(`${BASE_API_URL}auth/register`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(fakeUserData))
  ),
  rest.get(`${BASE_API_URL}auth/user`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(fakeUserData.user))
  ),
  rest.get(`${BASE_API_URL}travels`, (req, res, ctx) => {
    const nameParam = req.url.searchParams.get('name');

    if (!nameParam) {
      return res(ctx.status(200), ctx.json(fakeTravelsList));
    }

    const filteredList = fakeTravelsList.filter(({ name }) =>
      name.includes(nameParam)
    );
    return res(ctx.status(200), ctx.json(filteredList));
  }),
  rest.get(`${BASE_API_URL}travel-photos`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(fakeTravelPhotos))
  ),
];
