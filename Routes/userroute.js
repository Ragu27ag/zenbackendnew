import express from "express";
import { createEntity, getOneEntity } from "../DB/db-utility.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userrouter = express.Router();

userrouter.post("/register", async (req, res) => {
  const obj = req.body;
  await bcrypt.hash(obj.password, 10, async (err, hash) => {
    console.log(hash);
    obj.password = hash;
    const data = await createEntity("users", obj);
    res.send(data);
    // if (err) {
    //   res.send({ msg: err });
    // }
  });
});

userrouter.post("/login", async (req, res) => {
  const dataObj = req.body;
  const dbUser = await getOneEntity("users", dataObj.email);
  if (dbUser === null) {
    res.send({ msg: "User doesnt exist" });
  } else {
    await bcrypt.compare(
      dataObj.password,
      dbUser.password,
      async (err, result) => {
        let userToken = "";
        if (result) {
          delete dataObj.password;
          await jwt.sign({ ...dataObj }, "usercheck", (err, token) => {
            userToken = token;
          });
          console.log(userToken);
          delete dbUser.password;
          res.send({ ...dbUser, accesstoken: userToken, msg: "Success" });
        } else {
          res.send({ msg: "Invalid Credentials", error: err });
        }
      }
    );
  }
});

export default userrouter;
