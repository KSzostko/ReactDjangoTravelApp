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
    image: `${process.env.BASE_MEDIA_URL}/travels/Fuerteventura-1.jpg`,
    date: '2021-10-20',
    travel: 7,
    taken_by: 2,
  },
  {
    id: 10,
    taken_by_username: 'john',
    title: 'hawaje',
    image: `${process.env.BASE_MEDIA_URL}/travels/hawaje.jpg`,
    date: '2021-10-11',
    travel: 7,
    taken_by: 2,
  },
];

export const fakeTravelStops = [
  {
    id: 44,
    start_date: '2021-08-21T09:00:00+02:00',
    end_date: '2021-08-21T10:00:00+02:00',
    travel: {
      id: 7,
      name: 'nowa',
      short_description: 'nowy opis',
      description: 'dsada',
      start_date: '2021-08-21',
      end_date: '2021-08-23',
      hotel: 3,
      creator: 2,
    },
    attraction: {
      id: 26,
      xid: 'W105289192',
      name: 'Riserva Naturale della Marcigliana',
      type:
        'interesting_places,natural,nature_reserves,other_nature_conservation_areas',
      lat: 42.006126,
      lng: 12.567317,
      description: 'no description',
    },
  },
  {
    id: 45,
    start_date: '2021-08-21T10:30:00+02:00',
    end_date: '2021-08-21T11:00:00+02:00',
    travel: {
      id: 7,
      name: 'nowa',
      short_description: 'nowy opis',
      description: 'dsada',
      start_date: '2021-08-21',
      end_date: '2021-08-23',
      hotel: 3,
      creator: 2,
    },
    attraction: {
      id: 27,
      xid: 'W484981821',
      name: 'Chiesa San Domenico Guzman',
      type: 'religion,churches,interesting_places,catholic_churches',
      lat: 41.981812,
      lng: 12.559072,
      description: 'no description',
    },
  },
];
