app.get('/', (req, res) => {
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
  // Content to be sent in the response
  const content = `${filename}:\n${input}`;

  // Set the response headers to trigger a file download
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.txt`);

  // Send the content as the response
  res.send(content);
});

app.listen(port, () => {
