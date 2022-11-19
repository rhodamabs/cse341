  const mongodb = require('../db/connect');
  const ObjectId = require('mongodb').ObjectId;

  const getAll = async (req, res, next) => {
    // #swagger.tags = ['Contacts']

    try{
      const result = await mongodb.getDb().db('collection').collection('contacts').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err){
      res.status(500).json({message: err.message});
    }
    };
    

  const getSingle = async (req, res, next) => {
    // #swagger.tags = ['Contacts']

    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db('collection')
        .collection('contacts')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch (err){
      res.status(500).json({message: err.message});
    }
    };
    

  const createContact = async (req, res, next) => {
    // #swagger.tags = ['Contacts']

    try{
      const contact = {
        Name: req.body.Name,
        Surname: req.body.Surname,
        Email: req.body.Email,
        FavoriteColor: req.body.FavoriteColor,
        Birthday: req.body.Birthday
      };
      const response = await mongodb.getDb().db('collection').collection('contacts').insertOne(contact);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }  
  }catch (err){
    res.status(500).json({message: err.message});
  }
};

  const updateContact = async (req, res, next) => {
    // #swagger.tags = ['Contacts']

    try {
      const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
      Name: req.body.Name,
      Surname: req.body.Surname,
      Email: req.body.Email,
      FavoriteColor: req.body.FavoriteColor,
      Birthday: req.body.Birthday,
    };
    const response = await mongodb
      .getDb()
      .db('collection')
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
    }catch (err){
      res.status(500).json({message: err.message});
    }
    
  };

  const deleteContact = async (req, res, next) => {
    // #swagger.tags = ['Contacts']

    try{
      const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('collection').collection('contacts').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
    }catch (err){
      res.status(500).json({message: err.message});
    }
    
  };

  module.exports = {getAll, getSingle, createContact, updateContact, deleteContact};
