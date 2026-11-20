### ES modules instead of CommonJS

- **Question:** Should the backend use `require` (CommonJS) or `import` (ES modules)?
- **Decision:** ES modules (`"type": "module"` in package.json).
- **Why:** It is the official JavaScript standard, and Vite and React already use it, so frontend and backend code look the same. Also socket.io tutorial recommended it:
![alt text](img/image.png)
- **Alternatives:** CommonJS, the default at the start. Rejected because it is Node's older format.
- **Consequences:** use `import`, add `.js` to own file imports, use `import.meta.dirname` instead of `__dirname`.