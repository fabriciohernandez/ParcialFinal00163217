var express = require('express');
var router = express.Router();

//GET all
router.get('/', (req,res) =>{
  res.render('beginPage');
});


module.exports = router;
