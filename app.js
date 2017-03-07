var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var reactViews = require('express-react-views');

var app = express();

app.set('port', process.env.PORT || 8888);
app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function(req, res) {
  res.render('index', { title: 'Hyfn8 Challenge' });
});

app.get('/ads', function(req, res) {
  var ads = JSON.parse(fs.readFileSync('./ads.json', 'utf8'));
  console.log(ads);
  res.send(ads);
});

app.get('/ads_metrics', function(req, res) {
  var ads_metrics = JSON.parse(fs.readFileSync('./ads_metrics.json', 'utf8'));
  console.log(ads_metrics);
  res.send(ads_metrics);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});