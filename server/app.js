const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const store = require('../helpers/storage');
const multer = require('multer');
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
var upload = multer({
    storage: store.storage
});

let url = 'mongodb://localhost:27017/diary'

mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true  })
.then(() =>{
    console.log('connected');
})
.catch(err =>{
    console.log(err);
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('../public'));
app.use(cors());
app.use('/static', express.static('../public'));


app.get('/', function (req, res) {
    res.send('hello world');
});

app.use('/diary',upload.single('img'), userRoute);



app.listen(port, function (err) {
    console.log(`listening to port ${port}`);
});