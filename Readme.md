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

## Architecture

### How does it work?

The application can have many middleware and routes. The application passes through the handler in turn:
- **routes** - returns the **result**;
- **middleware** - runs the **next()** function to transfer control further.

![Диаграмма без названия](https://user-images.githubusercontent.com/20574545/174485003-ae8de369-9233-47e4-a602-044cebf65056.jpg)

**Examples:**
```js
// Example person routes
const PersonRoutes = {
  GET: {
    "api/person": (req, res) => {...},
    "api/person/:id": (req, res) => {...},
  },
  POST: {
    "api/person": (req, res) => {...},
  },
};

// Example a middleware
const Logger = (req, res, next) => {
  ...
  next();
};
```

### How does cluster work?

A **worker** working with a database, when the database is changed, the **worker** sends the modified list to the **main** process, and the **main** process sends the changes to **other workers**.

![Диаграмма без названия](https://user-images.githubusercontent.com/20574545/174484459-d7e631bf-492e-4180-8799-6070bb3a57d6.jpg)
