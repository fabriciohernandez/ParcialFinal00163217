var Canal = require('../models/canal');
var express = require('express');

module.exports.getAll = async (req, res) => {
  try {
    const canales = await Canal.find()
    //res.json(canales)
    var cant = canales.length

    res.render('all',{arreglo:canales, cant:cant})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.getOne = async (req, res) =>{
  
    Canal.findOne({nombre: req.body.nombre}).then((foundUser) => {
      if (foundUser){
        res.render('one',{nombre: foundUser.nombre, propietario: foundUser.propietario, subscriptores: foundUser.subscriptores, creacion: foundUser.createdAt})
      }
          
      else
          return res.render('one', {message:'Canal no encontrado.'})
      })
  
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
  Canal.findOneAndDelete({nombre: req.body.nombre})
    .then((data) =>{
        if (data) res.render('delete',{message:'El canal se elimino con exito'});

        else res.render('delete',{message:'El canal no pudo ser encontrado.'});
    }).catch( err => {
        next(err);
    })
}

module.exports.update = async (req, res) =>{
  let update = {
    ...req.body
  }
  Canal.findOneAndUpdate({
        nombre: req.body.nombre
    }, update, {
        new: true
    })
    .then((updated) => {
        if (updated)
            return res.status(200).json(updated);
        else
            return res.status(400).json(null);
    }).catch(err => {
        next(err);
    });
}



module.exports.getAllLocal = async (req, res) => {
  try {
    const canal = await Canal.find()
    res.json(canal)
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.createOneLocal = async (req, res) => {
  const canal = new Canal({
    nombre: req.body.nombre,
    propietario: req.body.propietario
  })
  try {
    const newCanal = await canal.save()
    res.status(201).json(newCanal)
  }
  catch (err){
    res.status(400).json({message: err.message})
  }
}

module.exports.deleteOneLocal = async (req, res) => {
  try {
    await Canal.findOneAndDelete({_id: req.params.id})
    res.json({message: 'Canal borrado'})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.updateLocal = async (req, res) =>{
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
