const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const User = require('../../models/user');
const auth = require('../../Middelware/auth');
const { body, validationResult } = require('express-validator');

//@route    POST api/posts
//@desc     Create a Post data
//@access   Private

router.post(
  '/',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password'); //find user data with user id
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

//@route    GET api/post
//@desc     Get all post
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

//@route    GET api/post/:id
//@desc     Get Post by id
//@access   Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    return res.status(500).send('Server error');
  }
});

//@route    DELETE api/post/:id
//@desc     Delete a post
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    return res.status(500).send('Server error');
  }
});

//@route    PUT api/post/like/:id
//@desc     Like a post
//@access   Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    const liked = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    );
    if (liked.length > 0) {
      return res.status(404).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

//@route    PUT api/post/like/:id
//@desc     Like a post
//@access   Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    const liked = post.likes.filter(
      (like) => like.user.toString() === req.user.id
    );
    if (liked.length === 0) {
      return res.status(404).json({ msg: 'Post has not yet been liked' });
    }
    //Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

//@route    POST api/post/comment/:id
//@desc     Comment a post
//@access   Private
router.post(
  '/comment/:id',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ msg: error.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password'); //find user data with user id
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

//@route    DELETE api/post/comment/:id/:comment_id
//@desc     Delete a post
//@access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //check the comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment dose not exist' });
    }
    //Check the user authorized
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not Authorized' });
    }

    //Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
