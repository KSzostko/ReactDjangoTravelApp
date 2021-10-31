export const fakeUserData = {
  user: {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
  },
  token: 'd23b93b3ea8786e58da59bebd15dd420923614a9b53758716e093896b1729503',
};

export const fakeTravelsList = [
  {
    id: 11,
    name: 'Niedawna podróż',
    short_description: 'opis1',
    description: 'opis duży',
    start_date: '2021-10-17',
    end_date: '2021-11-02',
    hotel: null,
    creator: 2,
  },
  {
    id: 12,
    name: 'Testowa podróż',
    short_description: 'opis3',
    description: 'opis2',
    start_date: '2021-10-17',
    end_date: '2021-10-19',
    hotel: null,
    creator: 2,
  },
];

export const fakeTravelPhotos = [
  {
    id: 9,
    taken_by_username: 'john',
    title: 'Fueventura',
    image: 'http://localhost:8000/media/travels/Fuerteventura-1.jpg',
    date: '2021-10-20',
    travel: 7,
    taken_by: 2,
  },
  {
    id: 10,
    taken_by_username: 'john',
    title: 'hawaje',
    image: 'http://localhost:8000/media/travels/hawaje.jpg',
    date: '2021-10-11',
    travel: 7,
    taken_by: 2,
  },
];
