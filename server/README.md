# fruit-app

## Requirements

- Dockers
- Node
- PNPM

## Instructions

1. `cd server`
2. create `.env` `.env.prod`, one for development and the other for production
3. set variables in both
4. run `pnpm install` // install dependencies
5. run `docker compose up --build` // build and run api and database containers
6. run `pnpx prisma db seed` // seed data into database