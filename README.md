# Beachside Racetrack

## Prerequisites

- Node 26.x

## Usage

#### Install dependencies  
`npm install`


#### Set access keys

**Key names needed**
| Key | Interface |
|---|---|
| `RECEPTIONIST_KEY` | Front Desk (`/front-desk`) |
| `SAFETY_KEY` | Race Control (`/race-control`) |
| `OBSERVER_KEY` | Lap-line Tracker (`/lap-line-tracker`) |

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

#### Start server
`npm start`


