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

  async getAll(_req, res) {
    const posts = await service.getAll();

    res.status(200).json(posts);
  },
 
  async getById(req, res) {
    const { id } = req.params;

    const post = await service.getById(id);
    
    res.status(200).json(post);
  },
};
