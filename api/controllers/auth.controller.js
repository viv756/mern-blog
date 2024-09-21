import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmi: user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
