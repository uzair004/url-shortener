const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// import mongoose schema model
const ShortURL = require('./models/url')

const port = process.env.PUBLIC_PORT || 3000;
app.use(express.urlencoded({extended: false}));
// setting view engine
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

app.get('/', async (req, res) => {
    const allData = await ShortURL.find();

    res.render('index', {shortUrls: allData})
});


app.post('/short', async (req, res) => {
    const fullUrl = req.body.fullUrl;

    const record = new ShortURL({
        full: fullUrl
    });

    await record.save();

    res.redirect('/')
});



app.get('/short', (req, res) => {
    res.send('Hello from short');
});



// connection to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(err => console.log(`OOPS unable to connect to mongodb because ${err.reson}`));


app.listen(port, () => console.log(`listening at port ${port}`))