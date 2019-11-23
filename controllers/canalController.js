var Canal = require('../models/canal');
var express = require('express');

module.exports.getAll = async (req, res) => {
  try {
    const canales = await Canal.find()
    //res.json(canales)
    console.log((canales))
    res.render('all',{arreglo:canales})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.getOne = async (req, res) =>{
  res.send(res.canal)
}

module.exports.createOne = async (req, res) => {
  console.log(req.body)
  const canal = new Canal({
    nombre: req.body.nombre,
    propietario: req.body.propietario
  })
  try {
    const newCanal = await canal.save()
    //res.status(201).json(newCanal)
    res.render('index',{message: 'Canal creado con Exito'})
  }
  catch (err){
    res.status(400).json({message: err.message})
  }
}

module.exports.deleteOne = async (req, res) => {
  try {
    await Canal.findOneAndDelete({_id: req.params.id})
    res.json({message: 'Canal borrado satisfactoriamente'})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.update = async (req, res) =>{
  if (req.body.nombre!=null) {
    res.canal.nombre = req.body.nombre
  }
  if (req.body.propietario!=null) {
    res.canal.propietario = req.body.propietario
  }
  if (req.body.subscriptores!=null) {
    res.canal.subscriptores = req.body.subscriptores
  }
  try {
    const updatedCanal = await res.canal.save()
    res.json(updatedCanal)
  } catch (e) {
    res.status(400).json({message: e.message})
  }
}

