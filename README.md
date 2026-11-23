# Beachside Racetrack

## Prerequisites

- Node 26.x

## Usage

#### Install dependencies

`npm install`

#### Set access keys

**Key names needed**

| Key                | Interface                              |
| ------------------ | -------------------------------------- |
| `RECEPTIONIST_KEY` | Front Desk (`/front-desk`)             |
| `SAFETY_KEY`       | Race Control (`/race-control`)         |
| `OBSERVER_KEY`     | Lap-line Tracker (`/lap-line-tracker`) |

**Set the keys before starting the server in the terminal:**

```
export RECEPTIONIST_KEY=<your-key>
export OBSERVER_KEY=<your-key>
export SAFETY_KEY=<your-key>
```

`npm start` also reads a `.env` file in the project root, so you can put the keys there instead.

**Set the keys before starting the server in `.env` file:**

```
RECEPTIONIST_KEY=<your-key>
OBSERVER_KEY=<your-key>
SAFETY_KEY=<your-key>
```

`.env` is listed in `.gitignore`, so it won't be committed.

#### Development

During development, run two servers in separate terminals:

1. Backend (Express, port 3000), in the project root:
   `npm run dev`
2. Frontend (Vite, port 5173), in `frontend/`:
   `npm run dev`

Open `http://localhost:5173`. Requests to `/api` are forwarded to Express.

#### Start server

`npm start`

#### Routes

Open the app at `http://localhost:3000` (or `http://localhost:5173` in development).

| Interface        | URL                 | Who uses it       | Access key         |
| ---------------- | ------------------- | ----------------- | ------------------ |
| Front Desk       | `/front-desk`       | Receptionist      | `RECEPTIONIST_KEY` |
| Race Control     | `/race-control`     | Safety Official   | `SAFETY_KEY`       |
| Lap-line Tracker | `/lap-line-tracker` | Lap-line Observer | `OBSERVER_KEY`     |
| Leader Board     | `/leader-board`     | Guests            | (public)           |
| Next Race        | `/next-race`        | Race drivers      | (public)           |
| Race Countdown   | `/race-countdown`   | Race drivers      | (public)           |
| Race Flags       | `/race-flags`       | Race drivers      | (public)           |

The home page (`/`) has a station selection and an access key field for the three employee interfaces.
