const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { body, validationResult } = require('express-validator');
const auth = require('../../Middelware/auth');

const User = require('../../models/user');
//@route    GET api/auth/
//@desc     Get auth details
//@access   Public

router.get('/', auth, async (req, res) => {
  try {
    //Get user data
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

//@route    Post api/auth
//@desc     Authenticate user & get token
//@access   Public

router.post(
  '/',
  [
    body('email', 'Please includes email address').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // Check email id already exists or not from mongoDB
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invaild Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invaild Credentials' }] });
      }

      //Get user id from user collection
      const payload = {
        user: {
          id: user.id,
        },
      };
      //Get JWT Token and set expires for the token
      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
