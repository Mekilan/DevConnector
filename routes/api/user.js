const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../../models/user');

//@route    Post api/users/
//@desc     Register user data
//@access   Public

router.post(
  '/',
  [
    body('name', 'Name is Required').not().isEmpty(),
    body('email', 'Please includes email address').isEmail(),
    body('password', 'Password contains maximum of 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // Check email id already exists or not from mongoDB
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
      }

      //Get avatar for email from gravatar package
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      //bcrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save user collection data
      await user.save();

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
