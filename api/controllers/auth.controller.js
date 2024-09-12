import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "all fields are required"));
  }
  const hasPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hasPassword,
  });

  try {
    await newUser.save();
    res.json("signup successfull");
  } catch (error) {
    next(error);
  }
};
