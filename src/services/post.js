const {
  BlogPost,
  PostCategory,
  sequelize,
} = require('../database/models/index');

module.exports = {
  async createPost(postData, userId) {
    const result = await sequelize.transaction(async (transaction) => {
      const post = await BlogPost.create(
        { ...postData, userId },
        { transaction },
      );
  
      const blogPostData = postData.categoryIds
      .map((id) => ({ categoryId: id, postId: post.id }));

      await PostCategory.bulkCreate(blogPostData, {
        transaction,
      });

      return post;
    });

    return result;
  },
};
