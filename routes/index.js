var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestamp Microservice' });
});

router.get('/:time', function(req, res){
  function unixToNatural(unix) {
    var date = new Date(unix * 1000)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    var month = months[date.getMonth()]
    var day = date.getDate()
    var year = date.getFullYear()

    var result = month + ' ' + day + ', ' + year;
    return result

  }
  if (!isNaN(req.params.time)) {
    var result = unixToNatural(req.params.time)
    var data = { unix: req.params.time, natural: result}
    res.json(data)
  } else {
    var natural = new Date(req.params.time)
    if (!isNaN(natural)) {
      var unix = natural / 1000;
      var data = { unix: unix, natural: req.params.time}
      res.json(data)
    } else {
      res.json({unix: null, natural: null})
    }
  }


})

module.exports = router;
