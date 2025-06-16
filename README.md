# Home Library

NestJS backend for a home music library management app.

## Stack

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**

## Features

- CRUD operations for:

  - **Users**
  - **Tracks**
  - **Artists**
  - **Albums**
  - **Favorites**

## Installation

### Clone the Repository

```bash
git clone https://github.com/uv95/home-library.git
cd home-library
```

### Install Dependencies

```bash
npm install
```

### Add .env

```bash
mv .env.example .env
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Build

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` by default.

## PostgreSQL & Prisma

- Prisma schema defined in `prisma/schema.prisma`
- Environment variables loaded from `.env`
- Apply migrations:

  ```bash
  npx prisma migrate deploy
  ```

## Docker

To run the full environment:

```bash
docker-compose up
```

## Entities

### User

```typescript
interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
```

### Artist

```typescript
interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}
```

### Track

```typescript
interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
```

### Album

```typescript
interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
```

### Favorites

```typescript
interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
```

## API Endpoints

### Users

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| GET    | `/user`     | Get all users   |
| GET    | `/user/:id` | Get user by ID  |
| POST   | `/user`     | Create new user |
| PUT    | `/user/:id` | Update user     |
| DELETE | `/user/:id` | Delete user     |

### Tracks

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/track`     | Get all tracks   |
| GET    | `/track/:id` | Get track by ID  |
| POST   | `/track`     | Create new track |
| PUT    | `/track/:id` | Update track     |
| DELETE | `/track/:id` | Delete track     |

### Artists

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/artist`     | Get all artists   |
| GET    | `/artist/:id` | Get artist by ID  |
| POST   | `/artist`     | Create new artist |
| PUT    | `/artist/:id` | Update artist     |
| DELETE | `/artist/:id` | Delete artist     |

### Albums

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/album`     | Get all albums   |
| GET    | `/album/:id` | Get album by ID  |
| POST   | `/album`     | Create new album |
| PUT    | `/album/:id` | Update album     |
| DELETE | `/album/:id` | Delete album     |

### Favorites

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/favs`            | Get all favorites            |
| POST   | `/favs/track/:id`  | Add track to favorites       |
| DELETE | `/favs/track/:id`  | Remove track from favorites  |
| POST   | `/favs/artist/:id` | Add artist to favorites      |
| DELETE | `/favs/artist/:id` | Remove artist from favorites |
| POST   | `/favs/album/:id`  | Add album to favorites       |
| DELETE | `/favs/album/:id`  | Remove album from favorites  |