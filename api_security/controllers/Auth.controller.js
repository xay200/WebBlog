import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { resetLimiter } from "../middleware/loginLimiter.js";

const getClientIp = (req) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
  if (ip && ip.toString().includes('::ffff:')) {
    ip = ip.toString().replace('::ffff:', '');
  }
  return ip;
};

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return next(handleError(409, "User already registered."));
    }

    const hashedPassword = bcryptjs.hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    
    console.log(`[REGISTER] New user: ${email} | IP: ${getClientIp(req)}`);

    res.status(200).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const clientIp = getClientIp(req);

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`\x1b[31m[LOGIN FAILED] IP: ${clientIp} | Email: ${email} (User not found)\x1b[0m`);
      
      return next(handleError(404, "Invalid login credentials."));
    }

    const hashedPassword = user.password;
    const comparePassword = await bcryptjs.compare(password, hashedPassword);
    
    if (!comparePassword) {
      console.log(`\x1b[31m[LOGIN FAILED] IP: ${clientIp} | Email: ${email} (Wrong Password)\x1b[0m`);

      return next(handleError(404, "Invalid login credentials."));
    }

    resetLimiter(clientIp);

    console.log(`\x1b[32m[LOGIN SUCCESS] IP: ${clientIp} | Email: ${email}\x1b[0m`);

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful.",
    });
  } catch (error) {
    console.error(`\x1b[31m[SYSTEM ERROR] Login failed: ${error.message}\x1b[0m`);
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    const clientIp = getClientIp(req);
    let user;
    user = await User.findOne({ email });
    
    if (!user) {
      const password = Math.random().toString();
      const hashedPassword = bcryptjs.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });

      user = await newUser.save();
    }

    console.log(`\x1b[33m[GOOGLE LOGIN] User: ${email} | IP: ${clientIp}\x1b[0m`);

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Logout = async (req, res, next) => {
  try {
    // console.log("[LOGOUT] User logged out");
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};