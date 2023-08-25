// Import d'Express
const express = require('express');

// Import de fs
const fs = require('fs');

// Import de body-parser
const bodyParser = require('body-parser');

// Import de json-server
const jsonServer = require('json-server');

// Le Middleware json-server
const jsm = jsonServer.router('db.json');

// On lance le serveur express
const app = express();

// ------------------ APP USE AND SET ------------------ //

app.use(bodyParser.urlencoded({ extended: false })); 

app.use(bodyParser.json()); 

app.use('/api', jsm); 

app.set('view engine', 'ejs');

// ------------------ ROUTES ------------------ //
app.get('/', (req, res) => {
    res.redirect('/livres')
})

app.get('/livres', (req, res) => {
    const livres = JSON.parse(fs.readFileSync('db.json')).livres
    res.render('livres', { livres})
})

app.post('/livres/create', (req, res) => {
    const livres = JSON.parse(fs.readFileSync('db.json')).livres;
    const newlivre = { 
        id: Date.now(), 
        title: req.body.title,
        author: req.body.author,
        img: req.body.img,
        description: req.body.description,
        status: req.body.status,
    };
    livres.push(newlivre);
    fs.writeFileSync('db.json', JSON.stringify({ livres }));
    // let message = 'La tâche a bien été ajoutée';
    res.redirect('/livres');
});

app.get('/livres/delete/:id', (req, res) => {
    const livres = JSON.parse(fs.readFileSync('db.json')).livres; 
    const newlivres = livres.filter(livre => livre.id !== parseInt(req.params.id)); 
    fs.writeFileSync('db.json', JSON.stringify({ livres: newlivres }));
    // let message = 'La tâche a bien été supprimée';
    res.redirect('/livres');
});

app.get('/livre:id', (req, res) => {
    const livre = JSON.parse(fs.readFileSync('db.json')).livres; 
    res.redirect('/livre');
});




// Je suis le dernier de la liste !
app.listen(3000, () => console.log('Le serveur est lancé sur le port 3000'));