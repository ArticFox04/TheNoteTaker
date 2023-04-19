const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT =  process.env.PORT ||3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => { 
        if (err) {
            res.status
            console.log(err);
        } else {
            res.status.json(JSON.parse(data));
        }
    }
    );
});





app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add new note`);

    const { title, text } = req.body;

    if (title && text) {
        
        const Note = {
          title,
          text,
          id
        };    

        fs.readFile('./db/db.json', 'utf8', (err, data) => { 
            if (err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (sendErr) =>
                    sendErr
                    ? console.error(sendErr)
                    : console.info("Notes sent to db.")
                );
            }
});

const response = {
    status: "Succes",
    body: Note,
};

console.log(response);
res.json(response);
} else {
    res.json("Error. Wasn't able to Post");
}
});

app.listen(PORT, () => {
    console.log('The Server is Running')
})