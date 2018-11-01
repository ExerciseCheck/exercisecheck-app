'use strict';
const Joi = require('joi');
const MongoModels = require('hicsail-mongo-models');

class Exercise extends MongoModels {

  static create(exerciseName, description, instructions, refVideoLinks, joint, axis, direction, refLowerJoint, refUpperJoint, userId, callback) {

    const document = {
      exerciseName,
      description,
      instructions,
      refVideoLinks,
      joint,
      axis,
      direction,
      refLowerJoint,
      refUpperJoint,
      createdAt: new Date()
    };

    this.insertOne(document, (err, docs) => {

      if (err) {
        return callback(err);
      }

      callback(null, docs[0]);
    });
  }
}

Exercise.collection = 'exercises';

Exercise.schema = Joi.object().keys({
  _id: Joi.object(),
  exerciseName: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.array(),
  refVideoLinks: Joi.array(),
  joint: Joi.number().integer().required(),
  axis: Joi.string().required(),
  direction: Joi.string().required(),
  refLowerJoint: Joi.number().integer().required(),
  refUpperJoint: Joi.number().integer().required(),
  createdAt: Joi.date().required()
});

Exercise.payload = Joi.object().keys({
  exerciseName: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  refVideoLinks: Joi.string().required(),
  joint: Joi.number().integer().required(),
  axis: Joi.string().valid('depthX','depthY').required(),
  direction: Joi.string().valid('up','down','L2R','R2L').required(),
  refLowerJoint: Joi.number().integer().required(),
  refUpperJoint: Joi.number().integer().required()
});



Exercise.indexes = [
  { key: { '_id': 1 } },
  { key: { userId: 1 } }
];

module.exports = Exercise;
