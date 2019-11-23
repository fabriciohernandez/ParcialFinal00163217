var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var User = require('../models/user');
/* GET users listing. */

//GET all
router.get('/', userController.getAll);

//Register new user
router.post('/',userController.createOne);

//get user info
router.get('/:id',getUser,(req,res) => {
  res.send(res.user.username)
});

//Updating user
router.patch('/:id',getUser, userController.update);

//delete user
router.delete('/:id',getUser, userController.deleteOne);


//middleware function
async function getUser(req, res, next){
  let user
  try {
    user = await User.findById(req.params.id)
    if(user == null){
      return res.status(404).json({message: 'Usuario no encontrado'})
    }
  }
  catch (err)
  {
    return res.status(500).json({message: err.message})
  }

  res.user = user
  next()
}

module.exports = router;
