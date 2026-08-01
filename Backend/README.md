# SPORTS Backend

Express + MongoDB API for the SPORTS shop.

## Endpoints
- GET /items
- POST /items
- PUT /items/:id
- DELETE /items/:id
- GET /venues
- GET /venues/:id
- GET /venues/:venueId/availability?date=YYYY-MM-DD
- POST /bookings

## Setup
1. Copy `.env.example` to `.env`
2. Set `MONGODB_URI`
3. Run `npm install`
4. Run `npm run seed`
5. Run `npm run dev`

The backend also serves the frontend from the sibling `Frontend` folder at both `/booking` and `/bookings`.
