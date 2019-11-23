var express = require('express');
var router = express.Router();
var canalController = require('../controllers/canalController')
var Canal = require('../models/canal');
//GET all
router.get('/', canalController.getAllLocal);

//Register new user
router.post('/',canalController.createOneLocal);

//get user info
router.get('/:id',getCanal,(req,res) => {
  res.send(res.user.username)
});

//Updating user
router.patch('/:id',getCanal, canalController.updateLocal);

//delete user
router.delete('/:id',getCanal, canalController.deleteOneLocal);


//middleware function VERIFICA SI EL CANAL EXISTE 
async function getCanal(req, res, next){
  let canal
  try {
    canal = await Canal.findById(req.params.id)
    if(canal == null){
      return res.status(404).json({message: 'Canal no encontrado'})
    }
  }
  catch (err)
  {
    return res.status(500).json({message: err.message})
  }

  res.canal = canal
  next()
}

module.exports = router;
