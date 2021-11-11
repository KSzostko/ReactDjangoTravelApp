import { rest } from 'msw';
import {
  fakeUserData,
  fakeTravelsList,
  fakeTravelPhotos,
  fakeTravelStops,
} from './fakeData';

export const handlers = [
  rest.post(
    `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
    (req, res, ctx) => {
      const { username, password } = req.body;

      if (username === fakeUserData.user.username && password === 'password') {
        return res(ctx.status(200), ctx.json(fakeUserData));
      }

      return res(
        ctx.status(400),
        ctx.json({ non_field_errors: ['Incorrect Credentials'] })
      );
    }
  ),
  rest.post(
    `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(fakeUserData))
  ),
  rest.get(`${process.env.REACT_APP_BASE_API_URL}/auth/user`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(fakeUserData.user))
  ),
  rest.get(`${process.env.REACT_APP_BASE_API_URL}/travels`, (req, res, ctx) => {
    const nameParam = req.url.searchParams.get('name');

    if (!nameParam) {
      return res(ctx.status(200), ctx.json(fakeTravelsList));
    }

    const filteredList = fakeTravelsList.filter(({ name }) =>
      name.includes(nameParam)
    );
    return res(ctx.status(200), ctx.json(filteredList));
  }),
  rest.get(
    `${process.env.REACT_APP_BASE_API_URL}/travel-photos`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(fakeTravelPhotos))
  ),
  rest.get(
    `${process.env.REACT_APP_BASE_API_URL}/travel-stops`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(fakeTravelStops))
  ),
];
