var express = require('express');
var router = express.Router();
var canalController = require('../controllers/canalController')
var Canal = require('../models/canal');

/* GET users listing. */

//GET all
router.get('/', (req,res) =>{
  res.render('index');
});

router.get('/all', canalController.getAll)

//REGISTRAR NUEVO CANAL
router.post('/',canalController.createOne);

//OBTENER LA INFORMACION DE UN CANAL
router.post('/search',canalController.getOne);
router.get('/search', (req,res) =>{
  res.render('one');
});

//ACTUALIZANDO CANAL
router.post('/update', canalController.update);
router.get('/update', (req,res) =>{
  res.render('update');
});
//BORRANDO CANAL
router.post('/delete', canalController.deleteOne);
router.get('/delete', (req,res) =>{
  res.render('delete');
});

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
