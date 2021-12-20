// Dependencies
// Express.js connection
const router = require('express').Router();
// User Model, Post Model, and Comment Model
const { User, Post, Comment } = require('../../models');
// Authorization Helper
const withAuth = require('../../utils/auth');
// sequelize connection
const sequelize = require('../../config/connection');

// GET api/posts/ -- get all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [ 'id', 'content', 'title', 'created_at'],
    order: [[ 'created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  // return the posts
  .then(dbPostData => res.json(dbPostData))
  // if there was a server error, return the error
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET api/posts/:id -- get a single post by id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [ 'id', 'content', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbPostData => {
    // if no post by that id exists, return an error
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    // if a server error occured, return an error
    console.log(err);
    res.status(500).json(err);
  });
});

// POST api/posts -- create a new post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT api/posts/id-- update a post's title or text
router.put('/:id', (req, res) => {
  Post.update({
    title: req.body.title,
    content: req.body.content
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE api/posts/id -- delete a post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;