## AI log

### Planning

#### 1. Requirements

- **Who:** Vivian
- **Asked:** Format my notes into requirements.
- **Kept:** the basic structure.
- **Changed or rejected:** added small details I saw necessary or rephrased

#### 2. Flowchart sample

- **Who:** Vivian
- **Asked:** a sample Mermaid flowchart of the race day flow.
- **Kept:** the basic structure.
- **Changed or rejected:** added more decision questions and changed the colours myself.

#### 3. User personas

- **Who:** Vivian
- **Asked:** I gave names, age and some small details, I asked it to format the whole base for user personas.
- **Kept:** the basic structure.
- **Changed or rejected:** used it for inspiration, but basically recreated all the scenarios, just needed a skeleton

### Coding

#### 4. Server start and login (teaching)

- **Who:** Vivian
- **Asked:** Do not touch or code anything for me. Teach how to use access keys and do the login process, can suggest and explain why am I doing what I'm doing, but do not show the answer.
- **Kept:** 
    - Helped to check single key in terminal and add env to start -script
    - I had a lot of repetition, so suggested to use filter()
    - Taught me the meaning of NODE_ENV -> it's a common practise in Node world to tell if in development- or production environment
    - Explained that Vite cooks React's JSX into plain JavaScript, since browsers don't understand JSX directly.
    - Explained how to use `useState()`. If you want a change to show up on the screen, a regular variable isn't enough. You **need** `useState()`, because updating state makes React re-render the component. For example, in `const [count, setCount] = useState(0);` &rarr; `count` is the current value, `setCount` is the function that updates it, and `useState(0)` sets the initial value to 0 and returns both of them as an array.
- **Changed or rejected:** 
    - Added the key checks in the code and print
    - Tried to add my own radiobuttons and some handleSubmit logic. Why: I wanted the `accessKey` input to know what is selected.

- **Asked:** (Continuing the same conversation) Review of LoginForm + radio buttons. 
- **Kept:** Radio buttons inside the form, read with FormData. 
- **Changed:** separated handleSubmit from the component.

- **Asked:** how Express receives a POST. 
- **Kept:** 
    - express.json() middleware, POST /api/login logs req.body. 
    - Basically express().use() uses it to all requests. `express()` &rarr; function returns app object which is also a function that can use methods like .get(), .use(), .listen(). So called factory function (like we did math object in the javascript sprint). `express.json()` &rarr; reads the requests body in JSON. 

- **Asked:** how to add a 500 ms delay. 
- **Kept:** setTimeout around the 401 response.

- **Asked:** Teach, how does the React frontend (Vite, port 5173) reach the Express server (port 3000) in development?
- **Kept:**
  - Vite proxy: requests starting with `/api` are forwarded to `http://localhost:3000` (`frontend/vite.config.js`).
  - Why: the browser blocks requests to another port by default (CORS), and with the proxy the frontend always calls `/api/login`, which also works in production when Express serves everything from one port.