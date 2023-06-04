const express = require('express');
const fs = require('fs');
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

  // Save input value to a text file with the specified filename
  fs.writeFile(`${filename}.txt`, input, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving file');
    } else {
      console.log('File saved successfully');
      console.log('click here to return: http://localhost:3000/ ');
      res.send('File saved successfully click here to return:   <br> <a href="">http://localhost:3000</a>');
  
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
