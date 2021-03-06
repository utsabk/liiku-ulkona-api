'use strict';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import passport from '../utils/pass.js';
import User from '../models/User.js';

const authenticate = (req, res) => {
  // Authentication handled as a Promise
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      try {
        if (err || !user) {
          reject(info.message);
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            reject(err);
          }
          // generate a signed Json web token with the contents of user object and return it in the response
          const token = jwt.sign(user, process.env.SECRET_KEY);
          resolve({ user, token });
        });
      } catch (err) {
        reject(err.message);
      }
    })(req, res);
  });
};

const userLogin = async (req, res) => {
  try {
    const response = await authenticate(req, res);
    return res.send({
      ...response.user,
      token: response.token,
    });
  } catch (err) {
    res.send({ error: err });
    //throw new Error(err);
  }
};
const userRegister = async (req, res, next) => {
  const hash = await bcrypt.hash(
    req.body.password,
    Number(process.env.SALT_ROUNDS) //SALT_ROUNDS converted to a number
  );

  const params = {
    username: req.body.username,
    email: req.body.email,
    password: hash,
  };

  try {
    const newUser = new User(params);
    await newUser.save();
    next();
  } catch (err) {
    console.log('Register error', err);
    return res.status(400).json({ error: 'register error' });
  }
};

const userLogout = async (req, res) => {
  // Invoking logout() will remove the req.user property and clear the login session (if any).
  req.logout();
  res.json({ message: 'logout' });
};

export { userLogin, userRegister, userLogout };
