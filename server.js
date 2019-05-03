const express = require('express');
const routes = require('./server/routes');
const mongoose = require('mongoose');
const URI = require('./server/config');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const API_PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || URI; 

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => console.log('Mongodb connection established'))
    .catch(err => console.log('Mongodb connection error - ' + err));

app.use('/assets', express.static(path.join(__dirname, '../client/assets')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.use(routes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        console.log('Path -> ' + path.join(__dirname, './build/index.html'));
        res.sendFile(path.join(__dirname, './build/index.html'))
    })   
}

app.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}`)
});