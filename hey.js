const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const { input, filename } = req.body;

  // Content to be sent in the response
  const content = `${filename}:\n${input}`;

  // Set the response headers to trigger a file download
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.txt`);

  // Send the content as the response
  res.send(content);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
