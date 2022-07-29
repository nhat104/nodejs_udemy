const fs = require('fs');

const routeHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Enter message</title>
      </head>
      <body>
        <p>Hieu ngu vcl</p>
        
        <form action="/create-user" method="POST">
          <input type="text" name="name" />
          <button type="submit">Create</button>
        </form>
      </body>
    </html>
    `);
    return res.end();
  }
  if (url === '/users') {
    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Enter message</title>
      </head>
      <body>
        <ul>
        <li>Ngu vcl</li>
        <li>Ao chinh</li>
        <li>Cuong 7Nui</li>
        <li>Gam can anh</li>
      </ul>
      </body>
    </html>
    `);
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log('chunk', chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const name = parsedBody.split('=')[1];
      console.log('parsedBody', name);
      return res.end();
    });
  }
  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>My First Page</title>
    </head>
    <body>
      <h1>Hello from my Node.js server!</h1>
    </body>
  </html>
  `);
  res.end();
};

module.exports = routeHandler;
