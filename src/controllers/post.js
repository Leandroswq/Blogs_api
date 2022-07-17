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

  async updatePost(req, res) {
    const { id } = req.params;
    const postData = req.body;
    const userId = req.user.id;

    await service.validateUpdatePost(userId, id, postData);
    await service.updatePost(id, postData);
    const post = await service.getById(id);
    
    res.status(200).json(post);
  },

  async deletePost(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    await service.validatePostUserId(userId, id);
    await service.deletePost(id);

    res.sendStatus(204);
  },
};
