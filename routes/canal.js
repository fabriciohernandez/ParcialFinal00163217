var express = require('express');
var router = express.Router();
var canalController = require('../controllers/canalController')
var Canal = require('../models/canal');
/* GET users listing. */

//GET all
router.get('/', canalController.getAll);

//REGISTRAR NUEVO CANAL
router.post('/',canalController.createOne);

//OBTENER LA INFORMACION DE UN CANAL
router.get('/:id',getCanal,canalController.getOne);

//ACTUALIZANDO CANAL
router.patch('/:id',getCanal, canalController.update);

//BORRANDO CANAL
router.delete('/:id',getCanal, canalController.deleteOne);


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
