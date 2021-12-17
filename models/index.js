// add model ref
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Create associations between the models
// User-Post relationship
User.hasMany(Post, {
  foreignKey: 'user_id'
});
//Post-User relationship
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"
});

// Comment-User relationship
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

// Comment-Post relationship
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

// User-Comment relationsihp
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// Post-Comment relationship
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
})

module.exports = { User, Post, Comment };