### Users

Type of `User`:

```js
type User {
  firstName: String
  lastName: String
  password: String!
  email: String!
  id: String!
}
```

#### Available queries:

1. Get `jwt` token:

```js
query {
  jwt(
    email: "test@test.com",
    password: "1234567"
  )
}
```

**Result:**

```json
{
  "data": {
    "jwt": "token"
  }
}
```

2. Get user by id:

```js
query {
  user(id: "62c195b0214b0af8f7b9f090") {
    id
    email
    firstName
    lastName
    password
  }
}
```

**Result:**

```json
{
  "data": {
    "user": {
      "id": "62c195b0214b0af8f7b9f090",
      "email": "test@test.ru",
      "firstName": "test",
      "lastName": "test",
      "password": "password"
    }
  }
}
```

3. Register user:

```js
input CreateUserInput {
  firstName: String!
  lastName: String!
  password: String!
  email: String!
}

mutation Register($user: CreateUserInput!) {
  register(user: $user) {
    id
    firstName
    lastName
    email
    password
  }
}

```

**Result:**

```json
{
  "data": {
    "register": {
      "id": "62c195b0214b0af8f7b9f090",
      "firstName": "test",
      "lastName": "test",
      "email": "test@test.ru",
      "password": "password"
    }
  }
}
```

### Genres

Type of `Genre`:

```js
type Genre {
  name: String
  description: String
  country: String
  year: Int
  id: String!
}
```

#### Available queries:

1. Get genre by id:

```js
query {
  genre(id: "62c19cf148b226b718b95280"){
    id
    name
    description
  }
}
```

**Result:**

```json
{
  "data": {
    "genre": {
      "id": "62c19cf148b226b718b95280",
      "name": "test",
      "description": null
    }
  }
}
```

2. Get genres:

```js
input PaginationInput {
  offset: Int
  limit: Int
}
input FilterGenresInput {
  name: String
  description: String
  country: String
  year: Int
}

type GenresPagination {
  offset: Int
  limit: Int
  total: Int
  items: [Genre!]
}

query Genres(
    $pagination: PaginationInput,
    $filter: FilterGenresInput
  ) {
  genres(pagination: $pagination, filter: $filter) {
    items {
      id
      name
      description
    }
    limit
    offset
    total
  }
}
```

**Result:**

```json
{
  "data": {
    "genres": {
      "items": [
        {
          "id": "62bed935f2fa3d1152b5c273",
          "name": "name",
          "description": "description"
        }
      ],
      "limit": 5,
      "offset": 0,
      "total": 1
    }
  }
}
```

3. Create genre:

```js
input CreateGenreInput {
  name: String!
  description: String
  country: String
  year: Int
}

mutation CreateGenre($genre: CreateGenreInput!) {
  createGenre(genre: $genre) {
    id
    name
    description
  }
}
```

**Result:**

```json
{
  "data": {
    "createGenre": {
      "id": "62c19cf148b226b718b95280",
      "name": "test",
      "description": null
    }
  }
}
```

4. Update genre by id:

```js
input UpdateGenreInput {
  name: String
  description: String
  country: String
  year: Int
}

mutation UpdateGenre($genre: UpdateGenreInput!) {
  updateGenre(id: "62c19cf148b226b718b95280", genre: $genre) {
    id
    name
    description
  }
}
```

**Result:**

```json
{
  "data": {
    "updateGenre": {
      "id": "62c19cf148b226b718b95280",
      "name": "updated test",
      "description": "description"
    }
  }
}
```

5. Delete genre by id:

```js
type DeletedGenre {
  deletedCount: Int
  acknowledged: Boolean
}

mutation {
  deleteGenre(id: "62c19cf148b226b718b95280") {
    deletedCount
    acknowledged
  }
}
```

**Result:**

```json
{
  "data": {
    "deleteGenre": {
      "deletedCount": 1,
      "acknowledged": true
    }
  }
}
```

### Bands

Type of `Band`:

```js
type Band {
  origin: String
  website: String
  name: String
  id: ID!
  members: [Member!]
  genres: [Genre!]
}
```

#### Available queries:

1. Get band by id:

```js
query {
  band(id: "62c1abdfde5f2ee1604227fd"){
    id
    name
    origin
    genres {
      id
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "band": {
      "id": "62c1abdfde5f2ee1604227fd",
      "name": "new name",
      "origin": null,
      "genres": [
        {
          "id": "62bed935f2fa3d1152b5c273",
          "name": "genre 1"
        }
      ]
    }
  }
}
```

2. Get bands:

```js
input PaginationInput {
  offset: Int
  limit: Int
}
input MemberInput {
  artist: String!
  instrument: String
  years: [String!]
}
input FilterBandsInput {
  origin: String
  website: String
  name: String
  members: [MemberInput!]
  genres: [ID!]
}

type BandsPagination {
  offset: Int
  limit: Int
  total: Int
  items: [Band!]
}

query Bands(
    $pagination: PaginationInput,
    $filter: FilterBandsInput
  ) {
  bands(pagination: $pagination, filter: $filter) {
    items {
      id
      name
      genres {
        id
        name
      }
      members {
        artist
        instrument
      }
    }
    limit
    offset
    total
  }
}
```

**Result:**

```json
{
  "data": {
    "bands": {
      "items": [
        {
          "id": "62c1aac8de5f2ee1604227f7",
          "name": "test",
          "genres": [
            {
              "id": "62bed935f2fa3d1152b5c273",
              "name": "genre 1"
            }
          ],
          "members": [
            {
              "artist": "artist 1",
              "instrument": "guitar"
            }
          ]
        },
        {
          "id": "62c1abc9de5f2ee1604227fb",
          "name": "test",
          "genres": [
            {
              "id": "62bed935f2fa3d1152b5c273",
              "name": "genre 1"
            }
          ],
          "members": [
            {
              "artist": "artist 1",
              "instrument": "guitar"
            }
          ]
        }
      ],
      "limit": 2,
      "offset": 0,
      "total": 3
    }
  }
}
```

3. Create band:

```js
input CreateBandInput {
  origin: String
  website: String
  name: String!
  members: [MemberInput!]
  genres: [ID!]
}

mutation CreateBand($band: CreateBandInput!) {
  createBand(band: $band) {
    id
    name
    members {
      artist
      instrument
    }
    genres {
      id
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "createBand": {
      "id": "62c1abdfde5f2ee1604227fd",
      "name": "test",
      "members": [
        {
          "artist": "artist 1",
          "instrument": "guitar"
        },
        {
          "artist": "artist 2",
          "instrument": "guitar"
        }
      ],
      "genres": [
        {
          "id": "62bed935f2fa3d1152b5c273",
          "name": "genre 1"
        },
        {
          "id": "62bed935f2fa3d1152b5c283",
          "name": "genre 2"
        }
      ]
    }
  }
}
```

4. Update band by id:

```js
input UpdateBandInput {
  origin: String
  website: String
  name: String
  members: [MemberInput!]
  genres: [ID!]
}

mutation UpdateBand($band: UpdateBandInput!) {
  updateBand(id: "62c1abdfde5f2ee1604227fd", band: $band) {
    id
    name
    members {
      artist
      instrument
    }
    genres {
      id
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "updateBand": {
      "id": "62c1abdfde5f2ee1604227fd",
      "name": "new name",
      "members": [
        {
          "artist": "artist 1",
          "instrument": "guitar"
        },
        {
          "artist": "artist 2",
          "instrument": "guitar"
        }
      ],
      "genres": [
        {
          "id": "62bed935f2fa3d1152b5c273",
          "name": "asd"
        }
      ]
    }
  }
}
```

5. Delete band by id:

```js
type DeletedBand {
  deletedCount: Int
  acknowledged: Boolean
}


mutation {
  deleteBand(id: "62c01ee75fbda9213016d780") {
    deletedCount
    acknowledged
  }
}
```

**Result:**

```json
{
  "data": {
    "deleteBand": {
      "deletedCount": 1,
      "acknowledged": true
    }
  }
}
```
