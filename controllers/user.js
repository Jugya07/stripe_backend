import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import { error } from "../utils/response.js";
import { generateTokenId } from "../utils/generateToken.js";
import { setPassword, validPassword } from "../utils/generatePassword.js";

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(error("Please fill in all the fields", 400));
  }
  const user = await User.findOne({ email });
  if (user) {
    return next(error("User already exists", 400));
  }

  const { hashPassword, salt } = setPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    salt,
  });

  newUser.password = undefined;
  newUser.salt = undefined;

  return res.json({
    status: "success",
    message: "User created successfully",
    user: newUser,
    token: generateTokenId(newUser._id),
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(error("Please fill in all the fields", 400));
  }

  const user = await User.findOne({ email });
  if (!user || !validPassword(password, user.password, user.salt)) {
    return next(error("Invalid credentials", 401));
  }

  user.password = undefined;
  user.salt = undefined;
  return res.json({
    status: "success",
    message: "User logged in successfully",
    user: user,
    token: generateTokenId(user._id),
  });
});

export default { signup, login };
