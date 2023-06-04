const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
  const { Configuration, OpenAIApi } = require("openai");
  
  const { input, filename } = req.body;
  
  // Content to be sent in the response
  const apiKey = "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"; // Replace with your actual API key
  
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "summarize this in 20 words:  " + input ,
      max_tokens: 500, 
    }); 
   ;

    const content = `${filename}:\n${input} \n summarized: ${completion.data.choices[0].text}`;

    // Set the response headers to trigger a file download
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.txt`);

    // Send the content as the response
    res.send(content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
