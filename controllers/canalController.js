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
          return res.status(400).json(null)
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
  console.log('entre',req.body.nombre)
  Canal.findOneAndDelete({nombre: req.body.nombre})
    .then((data) =>{
        if (data) res.render('delete',{message:'El canal se elimino con exito'});

        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}

module.exports.update = async (req, res) =>{
  let update = {
    nombre: req.body.newNombre,
    propietario: req.body.propietario,
    subscriptores: req.body.subscriptores
  }
  Canal.findOneAndUpdate({
        username: req.body.nombre
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

