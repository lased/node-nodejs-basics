## Table of Contents

- [Users](#Users)
- [Genres](#Genres)
- [Bands](#Bands)
- [Artists](#Artists)
- [Tracks](#Tracks)
- [Albums](#Albums)

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
<details>
  <summary>Details</summary>

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

</details><br>

2. Get user by id:
<details>
  <summary>Details</summary>

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

</details><br>

3. Register user:
<details>
  <summary>Details</summary>

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

</details><br>

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
<details>
  <summary>Details</summary>

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

</details><br>

2. Get genres:
<details>
  <summary>Details</summary>

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

</details><br>

3. Create genre:
<details>
  <summary>Details</summary>

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

</details><br>

4. Update genre by id:
<details>
  <summary>Details</summary>

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

</details><br>

5. Delete genre by id:
<details>
  <summary>Details</summary>

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

</details><br>

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
<details>
  <summary>Details</summary>

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

</details><br>

2. Get bands:
<details>
  <summary>Details</summary>

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

</details><br>

3. Create band:
<details>
  <summary>Details</summary>

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

</details><br>

4. Update band by id:
<details>
  <summary>Details</summary>

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

</details><br>

5. Delete band by id:
<details>
  <summary>Details</summary>

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

</details><br>

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
<details>
  <summary>Details</summary>

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

</details><br>

2. Get artists:
<details>
  <summary>Details</summary>

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

</details><br>

3. Create artist:
<details>
  <summary>Details</summary>

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

</details><br>

4. Update artist by id:
<details>
  <summary>Details</summary>

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

</details><br>

5. Delete artist by id:
<details>
  <summary>Details</summary>

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

</details><br>

<a name="Tracks"></a>

### Tracks

Type of `Track`:

```graphql
type Track {
  title: String!
  duration: Int
  released: Int
  id: ID!
  album: Album
  bands: [Band!]
  artists: [Artist!]
  genres: [Genre!]
}
```

#### Available queries:

1. Get track by id:
<details>
  <summary>Details</summary>

```graphql
query {
  track(id: "62c2cf7c37e6b15b766e68ff") {
    id
    title
    album {
      name
      genres {
        name
      }
    }
    artists {
      firstName
      country
    }
    bands {
      name
      genres {
        name
      }
    }
    genres {
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "track": {
      "id": "62c2cf7c37e6b15b766e68ff",
      "title": "Track 1",
      "album": {
        "name": "Album 1",
        "genres": [
          {
            "name": "genre 1"
          }
        ]
      },
      "artists": [
        {
          "firstName": "Artist 1",
          "country": "country 1"
        },
        {
          "firstName": "Artist 2",
          "country": "country 1"
        }
      ],
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
      ],
      "genres": [
        {
          "name": "genre 1"
        }
      ]
    }
  }
}
```

</details><br>

2. Get tracks:
<details>
  <summary>Details</summary>

```graphql
input PaginationInput {
  offset: Int
  limit: Int
}
input FilterTracksInput {
  title: String
  duration: Int
  released: Int
  album: ID
  bands: [ID!]
  artists: [ID!]
  genres: [ID!]
}

type TracksPagination {
  offset: Int
  limit: Int
  total: Int
  items: [Track!]
}

query Tracks($pagination: PaginationInput, $filter: FilterTracksInput) {
  tracks(pagination: $pagination, filter: $filter) {
    items {
      id
      album {
        name
        genres {
          name
        }
      }
      bands {
        id
        name
        genres {
          name
        }
      }
      title
      artists {
        firstName
        country
      }
      genres {
        name
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
    "tracks": {
      "items": [
        {
          "id": "62c2cf7c37e6b15b766e68ff",
          "album": {
            "name": "Album 1",
            "genres": [
              {
                "name": "genre 1"
              }
            ]
          },
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
          "title": "Track 1",
          "artists": [
            {
              "firstName": "Artist 1",
              "country": "country 1"
            },
            {
              "firstName": "Artist 2",
              "country": "country 1"
            }
          ],
          "genres": [
            {
              "name": "genre 1"
            }
          ]
        },
        {
          "id": "62c2d3f737e6b15b766e6906",
          "album": {
            "name": "Album 1",
            "genres": [
              {
                "name": "genre 1"
              }
            ]
          },
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
          "title": "Track 2",
          "artists": [
            {
              "firstName": "Artist 1",
              "country": "country 1"
            }
          ],
          "genres": [
            {
              "name": "genre 1"
            }
          ]
        }
      ],
      "limit": 2,
      "offset": 0,
      "total": 2
    }
  }
}
```

</details><br>

3. Create track:
<details>
  <summary>Details</summary>

```graphql
input CreateTrackInput {
  title: String!
  duration: Int
  released: Int
  album: [ID!]
  bands: [ID!]
  artists: [ID!]
  genres: [ID!]
}

mutation CreateTrack($track: CreateTrackInput!) {
  createTrack(track: $track) {
    id
    title
    album {
      name
      genres {
        name
      }
    }
    artists {
      firstName
      country
    }
    bands {
      name
      genres {
        name
      }
    }
    genres {
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "createTrack": {
      "id": "62c2c98437e6b15b766e68f1",
      "title": "Track 1",
      "album": null,
      "artists": [
        {
          "firstName": "Artist 1",
          "country": "country 1"
        },
        {
          "firstName": "Artist 2",
          "country": "country 1"
        }
      ],
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
      ],
      "genres": [
        {
          "name": "genre 1"
        }
      ]
    }
  }
}
```

</details><br>

4. Update track by id:
<details>
  <summary>Details</summary>

```graphql
input UpdateTrackInput {
  title: String
  duration: Int
  released: Int
  album: ID
  bands: [ID!]
  artists: [ID!]
  genres: [ID!]
}

mutation UpdateTrack($track: UpdateTrackInput!) {
  updateTrack(id: "62c2d3f737e6b15b766e6906", track: $track) {
    id
    title
    album {
      name
      genres {
        name
      }
    }
    artists {
      firstName
      country
    }
    bands {
      name
      genres {
        name
      }
    }
    genres {
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "updateTrack": {
      "id": "62c2d3f737e6b15b766e6906",
      "title": "Track 2",
      "album": {
        "name": "Album 1",
        "genres": [
          {
            "name": "genre 1"
          }
        ]
      },
      "artists": [
        {
          "firstName": "Artist 1",
          "country": "country 1"
        }
      ],
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
      ],
      "genres": [
        {
          "name": "genre 1"
        }
      ]
    }
  }
}
```

</details><br>

5. Delete track by id:
<details>
  <summary>Details</summary>

```graphql
type DeletedTrack {
  deletedCount: Int
  acknowledged: Boolean
}

mutation {
  deleteTrack(id: "62c2c98437e6b15b766e68f1") {
    deletedCount
    acknowledged
  }
}
```

**Result:**

```json
{
  "data": {
    "deleteTrack": {
      "deletedCount": 1,
      "acknowledged": true
    }
  }
}
```

</details><br>

<a name="Albums"></a>

### Albums

Type of `Album`:

```graphql
type Album {
  released: Int
  image: String
  name: String
  id: ID!
  artists: [Artist!]
  bands: [Band!]
  tracks: [Track!]
  genres: [Genre!]
}
```

#### Available queries:

1. Get album by id:
<details>
  <summary>Details</summary>

```graphql
query {
  album(id: "62c2c7b9b9764a772348cea8"){
    id
    artists {
      firstName
      country
    }
    bands {
      name
      genres {
        name
      }
    }
    genres {
      name
    }
    tracks {
      title
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "album": {
      "id": "62c2c7b9b9764a772348cea8",
      "artists": [
        {
          "firstName": "Artist 1",
          "country": "country 1"
        }
      ],
      "bands": [
        {
          "name": "band 2",
          "genres": [
            {
              "name": "genre 1"
            }
          ]
        }
      ],
      "genres": [
        {
          "name": "genre 1"
        }
      ],
      "tracks": [
        {
          "title": "Track 1"
        },
        {
          "title": "Track 2"
        }
      ]
    }
  }
}
```

</details><br>

2. Get albums:
<details>
  <summary>Details</summary>

```graphql
input PaginationInput {
  offset: Int
  limit: Int
}
input FilterAlbumsInput {
  released: Int
  image: String
  name: String
  artists: [ID!]
  bands: [ID!]
  tracks: [ID!]
  genres: [ID!]
}

type AlbumsPagination {
  offset: Int
  limit: Int
  total: Int
  items: [Album!]
}

query Albums(
    $pagination: PaginationInput, 
    $filter: FilterAlbumsInput
  ) {
  albums(pagination: $pagination, filter: $filter) {
    items {
      id
      artists {
        firstName
        country
      }
      bands {
        name
        genres {
          name
        }
      }
      genres {
        name
      }
      tracks {
        title
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
    "albums": {
      "items": [
        {
          "id": "62c2c7b9b9764a772348cea8",
          "artists": [
            {
              "firstName": "Artist 1",
              "country": "country 1"
            }
          ],
          "bands": [
            {
              "name": "band 2",
              "genres": [
                {
                  "name": "genre 1"
                }
              ]
            }
          ],
          "genres": [
            {
              "name": "genre 1"
            }
          ],
          "tracks": [
            {
              "title": "Track 1"
            },
            {
              "title": "Track 2"
            }
          ]
        }
      ],
      "limit": 2,
      "offset": 0,
      "total": 1
    }
  }
}
```

</details><br>

3. Create album:
<details>
  <summary>Details</summary>

```graphql
input CreateAlbumInput {
  released: Int
  image: String
  name: String!
  artists: [ID!]
  bands: [ID!]
  tracks: [ID!]
  genres: [ID!]
}

mutation CreateAlbum($album: CreateAlbumInput!) {
  createAlbum(album: $album) {
    id
    name
    artists {
      firstName
      bands {
        name
      }
    }
    bands {
      name
    }
    tracks {
      id
      title
    }
    genres {
      name
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "createAlbum": {
      "id": "62c3216dad374391f63833a0",
      "name": "Album 2",
      "artists": [
        {
          "firstName": "Artist 1",
          "bands": [
            {
              "name": "band 1"
            }
          ]
        }
      ],
      "bands": [
        {
          "name": "band 2"
        }
      ],
      "tracks": [],
      "genres": [
        {
          "name": "genre 1"
        }
      ]
    }
  }
}
```

</details><br>

4. Update album by id:
<details>
  <summary>Details</summary>

```graphql
input UpdateAlbumInput {
  released: Int
  image: String
  name: String
  artists: [ID!]
  bands: [ID!]
  tracks: [ID!]
  genres: [ID!]
}

mutation UpdateAlbum($album: UpdateAlbumInput!) {
  updateAlbum(id: "62c2c7b9b9764a772348cea8", album: $album) {
		id
    name
    bands {
      name
      genres {
        name
      }
    }
    artists {
      firstName
      secondName
    }
    genres {
      name
    }
    tracks {
      title
    }
  }
}
```

**Result:**

```json
{
  "data": {
    "updateAlbum": {
      "id": "62c2c7b9b9764a772348cea8",
      "name": "Album 1",
      "bands": [
        {
          "name": "band 2",
          "genres": [
            {
              "name": "genre 1"
            }
          ]
        }
      ],
      "artists": [
        {
          "firstName": "Artist 1",
          "secondName": "Artist 1"
        }
      ],
      "genres": [
        {
          "name": "genre 1"
        }
      ],
      "tracks": [
        {
          "title": "Track 1"
        },
        {
          "title": "Track 2"
        }
      ]
    }
  }
}
```

</details><br>

5. Delete album by id:
<details>
  <summary>Details</summary>

```graphql
type DeletedAlbum {
  deletedCount: Int
  acknowledged: Boolean
}

mutation {
  deleteAlbum(id: "62c3216dad374391f63833a0") {
    deletedCount
    acknowledged
  }
}
```

**Result:**

```json
{
  "data": {
    "deleteAlbum": {
      "deletedCount": 1,
      "acknowledged": true
    }
  }
}
```

</details><br>
