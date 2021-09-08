const diplomeCrudService = require('./service/diplomeCrudService')
const etablissementCrudService = require('./service/etablissementCrudService')
const userCrudService = require('./service/userCrudService')
const path = require('path');
require("dotenv").config();

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http');
const rateLimit = require("express-rate-limit");
const server = http.Server(app);
var compression = require('compression')
const authorize = require("./middlewares/auth");


/**************fired up****************/

main();

/*************************déclaration*****************************/


function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(compression({ filter: shouldCompress }))
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15000, // limit each IP to 100 requests per windowMs;
  message:
    "Too many connexion"
});

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  } else {
    return next();
  }
});

app.set('trust proxy', 1);
app.use(limiter);

/****************************************************************/
async function main() {
  await startDB()
}


async function startDB() {
  /****INIT DB */

  await require('./db/db').run()
}


/***************************************************************************/


/***********************Routes*******************************/
AllRouters = (require('./routes/allRouters'))
new AllRouters(app, authorize)
/********************Default Answer*******************************/
app.get('/', function (req, res, next) {

  res.sendFile(path.join(__dirname, '/index.html'));

});

/***********************************************************/

const port = process.env.PORT || 5000;


server.listen(port, () => {
  console.log(`started on port: ${port}`);
});