// Dependencies
// Express.js connection
const router = require('express').Router();
// Comment model
const { Comment } = require('../../models');
// Authorization Helper
const withAuth = require('../../utils/auth');


// Get comments
router.get('/', (req, res) => {

  Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get comments by ID
router.get('/:id', (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Post a new comment
router.post('/', (req, res) => {

  if (req.session) {
    Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

// Update comment by ID
router.put('/:id', (req, res) => {
  Comment.update({
    comment_text: req.body.comment_text
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;