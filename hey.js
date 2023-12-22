const PDFDocument = require('pdfkit');
const fs = require('fs');
const express = require('express');

const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define a route for the home page
app.get('/', (_, res) => {
    res.sendFile(__dirname + '/public/textn.html');
});

// Define a route for handling form submission
app.post('/submit', (req, res) => {
    const text = req.body.text.replace(/Ð/g, '').replace(/\r\n|\r/g, '\n');

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF document to a writable stream
    const stream = fs.createWriteStream('output.pdf');
    doc.pipe(stream);

    // Add the text to the PDF document
    doc.text(text, { encoding: 'utf8' }); // Specify the encoding as 'utf8'

    // Finalize the PDF document
    doc.end();

    // Handle the completion of the PDF generation
    stream.on('finish', () => {
        console.log('PDF created successfully.');
        res.download('output.pdf', 'output.pdf', (err) => {
            if (err) {
                console.error('Error downloading PDF:', err);
                res.status(500).send('Error downloading PDF.');
            } else {
                console.log('PDF downloaded successfully.');
            }
        });
    });

    // Handle any errors that occur during the PDF generation
    stream.on('error', (err) => {
        console.error('Error creating PDF:', err);
        res.status(500).send('Error creating PDF.');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
