import { check , body } from "express-validator";
import validatorMiddleware from "../../middleware/validator.js";
import flock from "../../model/flock.js";

exports.createFlockValidator = [
  check('flockName')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Name required'),
  check('number')
    .notEmpty()
    .withMessage('Number is required')
    .isLength({ max: 5000 })
    .withMessage('Too long Number')
    .isNumeric()
    .withMessage('must be a number'),
  check('Breed')
    .notEmpty()
    .withMessage('Name required'),
  check('CostPerBirds')
    .isNumeric()
    .withMessage('CostPerBirds must be a number'),
  check('Supplier')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Supplier required'),
  
  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];