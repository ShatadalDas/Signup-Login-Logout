import express from "express";
import { User } from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import { salt } from "./salt.mjs";
const router = express.Router();

router.post("/", async (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const phone = req.body.phn;
  const password = bcrypt.hashSync(req.body.pass, salt);
  if (await User.findOne({ email: email })) {
    res.send(false)
  } else {
    const user = User({ firstname, lastname, email, phone, password });
    user.save();
    res.send(true);
  }
});

export default router;
