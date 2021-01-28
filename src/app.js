const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// import controller
const controller = require('./controllers/controller');

const port = process.env.PUBLIC_PORT || 3000;
app.use(express.urlencoded({extended: false}));
// setting view engine
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

// ROUTES
// homepage with shortened urls list
app.get('/', controller.renderHomePage);

// save shortened url to DB
app.post('/short', controller.urlShortener);

// redirect user to orginal url when click(request) on shortened url
app.get('/:shortid', controller.redirectToURL);



// connection to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(err => console.log(`OOPS unable to connect to mongodb because ${err.reson}`));

mongoose.connection.on('connected', () => console.log('connected to mongoDb'))

app.listen(port, () => console.log(`Server listening at port ${port}`))