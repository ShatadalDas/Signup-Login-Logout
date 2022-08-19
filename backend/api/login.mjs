import express from "express";
import { User } from "../models/userModel.mjs";
import * as bcrypt from "bcrypt";
const router = express.Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const data = await User.findOne({ email: email });
  if (data) {
    const hash = data.password;
    const fname = data.firstname;
    bcrypt.compare(pass, hash).then((r) => {
      if (r) {
        res.send({ code: "1", name: fname });
        // res.send('Loged in')
      } else {
        res.send({ code: "0", name: '' });
        // res.send('Password incorrect')
      }
    });
  } else {
    res.send({ code: "-1", name: '', msg: '* email isn\'t signed up'});
    // res.send('User don\'t exist')
  }
});

export default router;