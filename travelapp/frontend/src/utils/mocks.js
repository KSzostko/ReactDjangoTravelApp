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
  rest.get(`${BASE_API_URL}travels`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(fakeTravelsList))
  ),
  rest.get(`${BASE_API_URL}travel-photos`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(fakeTravelPhotos))
  ),
];
