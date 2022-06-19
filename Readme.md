# CRUD API

> Note: before using this application you need to create a `.env` file

## Scripts

- `npm run start:multi` - run application in cluster mode;
- `npm run start:prod` - run application in production mode;
- `npm run start:dev` - run application in development mode;
- `npm run test` - run application tests.

## Endpoints

- **GET** `/api/person` is used to get all persons;
- **GET** `/api/person/${personId}` is used to get person by id;
- **POST** `/api/person` is used to create record about new person and store it in database;
- **PUT** `/api/person/{personId}` is used to update existing person;
- **DELETE** `/api/person/${personId}` is used to delete existing person from database.

## Model

Persons are stored as `objects` that have following properties:

- `id` — unique identifier (`string`, `uuid`) generated on server side;
- `username` — user's name (`string`, **required**);
- `age` — user's age (`number`, **required**);
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**).
