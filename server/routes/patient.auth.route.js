const express = require("express");
const { body } = require('express-validator');
const {
  checkPatientAuthRoute,
  registerPatient,
  loginPatient,
  verifyAuth,
  logOut,
} = require("../controller/patient.auth.controller");
const patientAuth = express.Router();

patientAuth.get("/", checkPatientAuthRoute);
patientAuth.post("/sign-up-patient",[
  body('email').isEmail().withMessage("not a valid email"),
  body('password').isLength({min:5}).withMessage("password must be 5 character long")
],registerPatient);
patientAuth.post("/sign-in-patient", [
  body('email').isEmail().withMessage("not a valid email"),
  body('password').isLength({ min: 5 }).withMessage("password must be 5 character long")
],loginPatient);
patientAuth.get("/verify-auth",verifyAuth)
patientAuth.get("/logout",logOut)

module.exports = patientAuth;
