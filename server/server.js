const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
//const path = require('path');
const PORT = 3000;
const api = require('./routes/api');
const app = express();
app.use(cors()); 
//app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use('/', (req, res) => res.send("Welcome to Billezy !"));
app.listen(process.env.PORT, () => console.log('Server is ready on localhost:' + PORT));