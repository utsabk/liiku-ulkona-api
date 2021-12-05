'use strict';
import User from '../models/User.js';

export const userWithId = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    // delete password before returning user object
    const { password, __v, ...strippedUser } = user.toObject();

    res.json({ ...strippedUser });
  } catch (err) {
    console.log('Error getting user:-', err);
    next(err);
  }
};

export const updateUserData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await User.findByIdAndUpdate(
      id,
      { points: req.body.points },
      { new: true }
    );
    const { password, __v, ...strippedResponse } = response.toObject();
    res.json({ ...strippedResponse });
  } catch (err) {
    next(err);
  }
};
