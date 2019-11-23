var User = require('../models/user');

module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.createOne = async (req, res) => {
  const user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  }
  catch (err){
    res.status(400).json({message: err.message})
  }
}

module.exports.deleteOne = async (req, res) => {
  try {
    await User.findOneAndDelete({_id: req.params.id})
    res.json({message: 'Usuario borrado'})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.update = async (req, res) =>{
  if (req.body.username!=null) {
    res.user.username = req.body.username
  }
  if (req.body.first_name!=null) {
    res.user.first_name = req.body.first_name
  }
  if (req.body.last_name!=null) {
    res.user.last_name = req.body.last_name
  }
  if (req.body.email!=null) {
    res.user.email = req.body.email
  }
  if (req.body.password!=null) {
    res.user.password = req.body.password
  }

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (e) {
    res.status(400).json({message: e.message})
  }
}
