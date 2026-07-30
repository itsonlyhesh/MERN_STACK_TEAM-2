# SPORTS

A basic full-stack sports shop built with Node.js, Express, MongoDB, and a static frontend.

## Structure
- Backend: Express API and MongoDB integration
- Database: sample seed data and schema reference
- Frontend: responsive HTML, CSS, and JavaScript storefront

## Run locally
1. Make sure [Backend/.env](Backend/.env) exists and contains your `MONGODB_URI`.
2. From the `Backend` folder, run `npm install` one time.
3. From the top-level `Sports` folder, run `npm run seed` to add sample products.
4. From the top-level `Sports` folder, run `npm run dev` to start the app.
5. Open `http://localhost:5000/`.

If you prefer, you can also run the commands directly inside `Backend`:
`npm run seed` and `npm run dev`.

## API
- GET /items
- POST /items
- PUT /items/:id
- DELETE /items/:id
