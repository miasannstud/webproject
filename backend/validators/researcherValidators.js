
import { validationResult } from "express-validator";
import { body, query, param } from "express-validator";
import Researcher from "../models/researcherSchema.js";

export const createUserValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("Firstname is required"),

  body("lastName")
    .notEmpty()
    .withMessage("Lastname is required"),

    body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 150 })
    .withMessage("Username cannot exceed 150 characters")
    .isAlphanumeric()
    .withMessage("Username cannot contain special characters")
    .custom(async (value) => {
      const user = await Researcher.findOne({ username: value });
      if (user) {
        throw new Error("Username already in use");
      }
    }),
    
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required")

    .custom(async (value) => {
      const user = await Researcher.findOne({password: value});
      if (user) {
        throw new Error("Email already in use");
      }
    }),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min: 5})
    .withMessage("Password must be at least 5 characters long."),
];


const searchByAllowedOptions = [
  "firstname",
  "surname",
  "username",
  "email",
  "birthdate",
];

const findUsersValidatorArr = [
  query("searchBy")
    .isString()
    .isIn(searchByAllowedOptions)
    .withMessage(
      "Invalid searchBy option. Allowed options are: " +
      searchByAllowedOptions.join(", ")
    ),

  query("SearchValue")
    .isString()
    .notEmpty()
    .withMessage("search value is required")
];