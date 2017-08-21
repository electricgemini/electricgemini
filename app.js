var express = require('express')
var app = express()
var hogan = require('hogan-express')
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public/'))
var Cosmic = require('cosmicjs')
var bucket_slug = process.env.COSMIC_BUCKET || 'electric-gemini'
var read_key = "QgM72tMuu4JT1eVdZJkKZ2hIoPaJFut45FYTkBHQBi5fwMsQi4"
app.get('/', function(req, res) {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, function(err, response) {
    res.locals.cosmic = response;
    res.render('index.html')
  })
});
app.listen(app.get('port'))
