var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

const appData = require('./data.json')  
const ratings = appData.ratings 
const seller = appData.seller 
const goods = appData.goods  
const apiRouter = express.Router()  

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
console.log(process.env.PORT)
	apiRouter.get('/seller', (req, res) => {
	  res.json({
	    // 这里是你的json内容
	    errno: 0,
	    data: seller
	  })
	}),
	apiRouter.get('/goods', (req, res) => {
	  res.json({
	    // 这里是你的json内容
	    errno: 0,
	    data: goods
	  })
	}),
	apiRouter.get('/ratings', (req, res) => {
	  res.json({
	    // 这里是你的json内容
	    errno: 0,
	    data: ratings
	  })
	})
app.use('/api',apiRouter)  

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  // if (process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
})
