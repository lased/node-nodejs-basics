## Table of Contents

- [Users](#Users)
- [Genres](#Genres)
- [Bands](#Bands)
- [Artists](#Artists)

<a name="Users"></a>

### Users

Type of `User`:

```graphql
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

```graphql
query {
  jwt(email: "test@test.ru", password: "11111111")
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

```graphql
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

```graphql
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

<a name="Genres"></a>

### Genres

Type of `Genre`:

```graphql
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

```graphql
query {
  genre(id: "62c19cf148b226b718b95280") {
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

```graphql
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

query Genres($pagination: PaginationInput, $filter: FilterGenresInput) {
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

```graphql
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

```graphql
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

```graphql
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

<a name="Bands"></a>

### Bands

Type of `Band`:

```graphql
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

```graphql
query {
  band(id: "62c1abdfde5f2ee1604227fd") {
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

```graphql
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

query Bands($pagination: PaginationInput, $filter: FilterBandsInput) {
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

```graphql
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

```graphql
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

```graphql
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

<a name="Artists"></a>

### Artists

Type of `Artist`:

```graphql
type Artist {
  firstName: String
  secondName: String
  middleName: String
  birthDate: String
  birthPlace: String
  country: String
  instruments: [String!]
  id: ID!
  bands: [Band!]
}
```

#### Available queries:

1. Get artist by id:

```graphql
query {
  artist(id: "62c2aa0a1c2b4d4f39aac7c2") {
    id
    firstName
    secondName
    country
    instruments
    bands {
      name
      genres {
        name
      }
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "artist": {
      "id": "62c2aa0a1c2b4d4f39aac7c2",
      "firstName": "Artist 1",
      "secondName": "Artist 1",
      "country": "country 1",
      "instruments": ["guitar"],
      "bands": [
        {
          "name": "band 1",
          "genres": [
            {
              "name": "genre 1"
            },
            {
              "name": "genre 2"
            }
          ]
        }
      ]
    }
  }
}
```

2. Get artists:

```graphql
input PaginationInput {
  offset: Int
  limit: Int
}
input FilterArtistsInput {
  firstName: String
  secondName: String
  middleName: String
  birthDate: String
  birthPlace: String
  country: String
  instruments: [String!]
  bands: [ID!]
}

type ArtistsPagination {
  offset: Int
  limit: Int
  total: Int
  items: [Artist!]
}

query Artists($pagination: PaginationInput, $filter: FilterArtistsInput) {
  artists(pagination: $pagination, filter: $filter) {
    items {
      id
      bands {
        id
        name
        genres {
          name
        }
      }
      firstName
      secondName
      instruments
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
    "artists": {
      "items": [
        {
          "id": "62c2a9cd1c2b4d4f39aac7c0",
          "bands": [],
          "firstName": "Artist 2",
          "secondName": "Artist 2",
          "instruments": ["guitar"]
        },
        {
          "id": "62c2aa0a1c2b4d4f39aac7c2",
          "bands": [
            {
              "id": "62c2a3f8d819749065a71e75",
              "name": "band 1",
              "genres": [
                {
                  "name": "genre 1"
                },
                {
                  "name": "genre 2"
                }
              ]
            }
          ],
          "firstName": "Artist 1",
          "secondName": "Artist 1",
          "instruments": ["guitar"]
        }
      ],
      "limit": 2,
      "offset": 0,
      "total": 2
    }
  }
}
```

3. Create artist:

```graphql
input CreateArtistInput {
  firstName: String!
  secondName: String!
  middleName: String
  birthDate: String
  birthPlace: String
  country: String!
  instruments: [String!]
  bands: [ID!]
}

mutation CreateArtist($artist: CreateArtistInput!) {
  createArtist(artist: $artist) {
    id
    birthDate
    firstName
    secondName
    country
    instruments
    bands {
      id
      name
      genres {
        id
        name
      }
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "createArtist": {
      "id": "62c2aa0a1c2b4d4f39aac7c2",
      "birthDate": null,
      "firstName": "Artist 1",
      "secondName": "Artist 1",
      "country": "country 1",
      "instruments": ["guitar"],
      "bands": [
        {
          "id": "62c2a3f8d819749065a71e75",
          "name": "band 1",
          "genres": [
            {
              "id": "62c2a0042e7bb3fe5f043c28",
              "name": "genre 1"
            },
            {
              "id": "62c2a0092e7bb3fe5f043c2a",
              "name": "genre 2"
            }
          ]
        }
      ]
    }
  }
}
```

4. Update artist by id:

```graphql
input UpdateArtistInput {
  firstName: String
  secondName: String
  middleName: String
  birthDate: String
  birthPlace: String
  country: String
  instruments: [String!]
  bands: [ID!]
}

mutation UpdateArtist($artist: UpdateArtistInput!) {
  updateArtist(id: "62c2a9cd1c2b4d4f39aac7c0", artist: $artist) {
    id
    birthDate
    firstName
    secondName
    country
    instruments
    bands {
      id
      name
      genres {
        id
        name
      }
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "updateArtist": {
      "id": "62c2a9cd1c2b4d4f39aac7c0",
      "birthDate": null,
      "firstName": "Artist 2",
      "secondName": "Artist 2",
      "country": "country 1",
      "instruments": ["guitar"],
      "bands": []
    }
  }
}
```

5. Delete artist by id:

```graphql
type DeletedArtist {
  deletedCount: Int
  acknowledged: Boolean
}

mutation {
  deleteArtist(id: "62c2ab0c1c2b4d4f39aac7c7") {
    deletedCount
    acknowledged
  }
}
```

**Result:**

```json
{
  "data": {
    "deleteArtist": {
      "deletedCount": 1,
      "acknowledged": true
    }
  }
}
```
