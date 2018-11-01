const router = require('express').Router();

module.exports = function(db){
  router.post('/', function(req, res){
    console.log(req.body);
  })
}
