# Racetrack Info-Screens – Requirements List

## Interfaces overview

| Interface | Persona | Route |
|---|---|---|
| Front Desk | Receptionist | `/front-desk` |
| Race Control | Safety Official | `/race-control` |
| Lap-line Tracker | Lap-line Observer | `/lap-line-tracker` |
| Leader Board | Guest | `/leader-board` |
| Next Race | Race Driver | `/next-race` |
| Race Countdown | Race Driver | `/race-countdown` |
| Race Flags | Race Driver | `/race-flags` |

---

### General requirements

- [ ] **GEN-01** All interfaces update in real time without polling (e.g. Socket.IO).
- [ ] **GEN-02** Employee interfaces (Front Desk, Race Control, Lap-line Tracker) require an access key before use.
- [ ] **GEN-03** Access keys are set via environment variables; the server must not start if they are missing.
- [ ] **GEN-04** An incorrect access key gets a 500 ms delayed response before the user can try again.
- [ ] **GEN-05** A race lasts 10 minutes in normal mode, but in development mode the race timer is 1 minute, to make testing faster.
- [ ] **GEN-06** Public displays (Guest and Race Driver interfaces) need no login and have a fullscreen button.

---

### Front Desk
**Persona:** Receptionist · **Route:** `/front-desk`

- [ ] **FD-01** View a list of upcoming race sessions.
- [ ] **FD-02** Add and remove race sessions (Starting times are not editable -> All the sessions go to a list and Safety Official just presses "start").
- [ ] **FD-03** Add, edit and remove drivers in a session.
- [ ] **FD-04** Driver names must be unique within a session.
- [ ] **FD-05** Maximum number of drivers per session (likely 8).
- [ ] **FD-06** Drivers are assigned cars.
- [ ] **FD-07** A session disappears from the list once it starts.

### Race Control
**Persona:** Safety Official · **Route:** `/race-control`

- [ ] **RC-01** View the next race session.
- [ ] **RC-02** Start the race, which sets the mode to Safe and starts the timer.
- [ ] **RC-03** Change race mode: Safe / Hazard / Danger / Finish.
- [ ] **RC-04** Finish mode is final and cannot be undone.
- [ ] **RC-05** End the session once cars have returned to the pit lane, after which the next session is shown.
- [ ] **RC-06** Designed for mobile use.

### Lap-line Tracker
**Persona:** Lap-line Observer · **Route:** `/lap-line-tracker`

- [ ] **LT-01** One large button per car.
- [ ] **LT-02** Pressing a button records the car crossing the lap line, used to calculate lap times.
- [ ] **LT-03** Designed for tablet use with easy-to-hit buttons.
- [ ] **LT-04** Buttons are disabled when the session ends.

### Leader Board
**Persona:** Guest · **Route:** `/leader-board`

- [ ] **LB-01** Drivers are ordered by fastest lap time.
- [ ] **LB-02** Shows car number, driver name, fastest lap and current lap.
- [ ] **LB-03** Shows remaining race time.
- [ ] **LB-04** Shows the current flag/mode.
- [ ] **LB-05** Keeps showing the previous race's results until the next race starts.
- [ ] **LB-06** Fullscreen button.

### Next Race
**Persona:** Race Driver · **Route:** `/next-race`

- [ ] **NR-01** Shows drivers and assigned cars for the upcoming session.
- [ ] **NR-02** After a race ends, shows a message telling the next session's drivers to proceed to the paddock.
- [ ] **NR-03** Fullscreen button.

### Race Countdown
**Persona:** Race Driver · **Route:** `/race-countdown`

- [ ] **CD-01** Shows remaining race time.
- [ ] **CD-02** Fullscreen button.

### Race Flags
**Persona:** Race Driver · **Route:** `/race-flags`

- [ ] **RF-01** The full screen shows the color matching the current mode:
  - Safe = green
  - Hazard = yellow
  - Danger = red
  - Finish = chequered
- [ ] **RF-02** Fullscreen button.

### User personas

#### Employees

<table>
<tr>
<td width="calc(100% / 3)" valign="top">
<img src="images/receptionist.png" alt="Maya, Receptionist" width="100%">
</td>
<td width="calc(100% / 3)" valign="top">
<img src="images/maya.png" alt="Maya, Receptionist" width="100%">
</td>
<td width="calc(100% / 3)" valign="top">
<img src="images/maya.png" alt="Maya, Receptionist" width="100%">
</td>
</tr>
<tr>
<td valign="top">

#### Receptionist – "Liisa"

> "There's a race coming and guests are asking for directions to the spectator area, I need to pay attention to two things at once."

**Age:** 24 · **Device:** Desktop at reception · **Login:** Yes

**Background:** 24, works part-time at the racetrack reception alongside her studies. Comfortable with computers but not technical.
 
**Context:** Works at a busy front desk, often talking to customers while typing. Interruptions are constant, especially on weekends.
 
**Goals**
- Register drivers into upcoming sessions quickly
- Fix mistakes (typos, swapped drivers) without starting over
- Know at a glance which sessions are full and which still have space

**Frustrations**
- Unclear error messages that don't say what to do next
- Losing typed information after an error
- Not knowing whether a session has already started

</td>
<td valign="top">

#### Receptionist – "Maya"

> "There's a queue at the desk and someone wants to change their friend's name."

**Age:** 24 · **Device:** Desktop at reception · **Login:** Yes

</td>
<td valign="top">

#### Receptionist – "Maya"

> "There's a queue at the desk and someone wants to change their friend's name."

**Age:** 24 · **Device:** Desktop at reception · **Login:** Yes

</td>
</tr>
</table>


## 1. End-to-end flow across interfaces

**Legend**
- Solid arrow `-->` = the person's next step
- Dotted arrow `-.->` = real-time update sent to another interface `[GEN-01]`
- 🟩 Green arrow shows the desired path
- 🟥 Red shows an error in the selection
- 🟪 Purple shows an optional path to goal
- 🟧 Orange goes back steps
- 🟦 Blue illustrates the real-time updates

```mermaid
flowchart TB

    subgraph FD["Front Desk – Receptionist"]
        FD0{New or existing</br>session?}
        FD1a[Create race</br>session]
        FD1b[Choose</br>upcoming session]
        FD2["`Add driver`"]
        FD3{"`Less than 8</br>drivers?`"}
        FD4{"`Driver's name</br>unique?`"}
        FD5["`Error: this</br>session is full</br>8/8 drivers`"]
        FD6{"`What would</br>you like</br>to do?`"}
        FD7["`Remove or</br>replace driver`"]
        FD8["`Race session</br>ready, shown</br>in Race Control`"]
        FD9["`Error: name</br>already in use`"]
        FD10["`Driver saved,</br>car assigned`"]
        FD11{"`More drivers?`"}
        FD12[Delete existing race session]
        FD13{"`What to do with</br>this session?`"}
        FD14["`Edit or</br>remove driver`"]
    end

    subgraph RC["Race Control – Safety Official"]
        RC1[See next session]
        RC2{Drivers ready<br/>in cars?}
        RC3[Start race]
        RC4{Situation<br/>on track}
        RC5[Safe]
        RC6[Hazard]
        RC7[Danger]
        RC8[Set Finish]
        RC9{All cars back<br/>in pit lane?}
        RC10[End session]
    end

    subgraph LT["Lap-line Tracker – Observer"]
        LT1[Car buttons activate]
        LT2[Tap car when it<br/>crosses lap line]
        LT3[Buttons disabled]
    end

    subgraph PUB["Public displays – Drivers and Guests"]
        NR1[Next Race:<br/>session, drivers, cars]
        NR2[Next Race:<br/>next drivers to paddock]
        FL[Race Flags:<br/>current mode color]
        CD[Race Countdown:<br/>timer running]
        LB1[Leader Board:<br/>live ranking]
        LB2[Leader Board:<br/>final results stay]
    end
    

    %% Front Desk
    FD0 -->|New| FD1a
    FD0 -->|Existing| FD1b
    FD1a --> FD2
    FD1b --> FD13
    FD13 -->|Add driver| FD2
    FD13 -->|Edit or remove driver| FD14
    FD14 --> FD13
    FD13 -->|Delete session| FD12
    FD12 --> FD0
    FD13 -->|Done| FD8
    FD2 --> FD3
    FD3 -->|Yes| FD4
    FD3 -->|No| FD5
    FD5 --> FD6
    FD6 -->|Add to another session| FD0
    FD6 -->|Replace a driver in this session| FD7
    FD7 --> FD2
    FD6 -->|Keep current drivers| FD8
    FD4 -->|No| FD9
    FD9 --> FD2
    FD4 -->|Yes| FD10
    FD10 --> FD11
    FD11 -->|Yes| FD2
    FD11 -->|No| FD8
    FD8 -.-> NR1
    FD8 --> RC1
    FD1b -.-|started session no</br>longer selectable| RC3

    linkStyle 0,1,2,3,4,9,10,11,17,20,21,23,25 stroke:#00FF0D,stroke-width:4px
    linkStyle 5,6,7,8,14,15,16,19,22 stroke:#FF8200,stroke-width:2px
    linkStyle 12,18 stroke:#FF0000,stroke-width:2px
    linkStyle 13 stroke:#CB1DFF,stroke-width:2px
    linkStyle 24,26 stroke:#0063FB,stroke-width:4px

    %% Race start
    RC1 --> RC2
    RC2 -->|No| RC1
    RC2 -->|Yes| RC3
    RC3 -.-> LT1
    RC3 -.-> FL
    RC3 -.-> CD
    RC3 -.-> LB1

    %% Race in progress
    RC3 --> RC4
    RC4 -->|Normal| RC5
    RC4 -->|Caution| RC6
    RC4 -->|Stop cars| RC7
    RC5 & RC6 & RC7 --> RC4
    RC5 & RC6 & RC7 -.-> FL
    LT1 --> LT2
    LT2 -->|Next crossing| LT2
    LT2 -.-> LB1

    %% Race end
    RC4 -->|Race over| RC8
    RC8 -.-> FL
    RC8 --> RC9
    RC9 -->|No, wait| RC9
    RC9 -->|Yes| RC10
    RC10 -.-> LT3
    RC10 -.-> NR2
    RC10 -.-> LB2
    RC10 -->|Next session| RC1

    style FD fill:#E3F2FD,stroke:#1E88E5
    style RC fill:#FFF3E0,stroke:#FB8C00
    style LT fill:#F3E5F5,stroke:#8E24AA
    style PUB fill:#F5F5F5,stroke:#9E9E9E
```
