const service = require('../services/post');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createPost(req, res) {
    const postData = req.body;
    const userId = req.user.id;
  
    await service.validateCreatePost(postData);
    const post = await service.createPost(postData, userId);

    res.status(201).json(post);
  },
    
};