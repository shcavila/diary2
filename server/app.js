const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const store = require('./config/storage');
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
app.use(express.static('../public/images'));
app.use(cors());
app.use('/static', express.static('./public/images'));


app.get('/', function (req, res) {
    res.sendfile('http://localhost:8081/static/img-1575875438064.jpg');
});

app.use('/diary',upload.single('img'), userRoute);



app.listen(port, function (err) {
    console.log(`listening to port ${port}`);
});