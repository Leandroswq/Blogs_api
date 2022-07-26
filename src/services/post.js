const Joi = require('joi');
const httpErrors = require('http-errors');
const { Op } = require('sequelize');
const {
  BlogPost,
  PostCategory,
  sequelize,
  User,
  Category,
} = require('../database/models/index');

const categoryService = require('./category');

function validatecCeatePostData(postData) {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().required()).required(),
  }).validate(postData);

  if (error) {
    throw new httpErrors.BadRequest('Some required fields are missing');
  }
}

function validateUpdatePostData(postData) {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(postData);

  if (error) {
    throw new httpErrors.BadRequest('Some required fields are missing');
  }
}

module.exports = {
  async validateCreatePost(postData) {
    validatecCeatePostData(postData);
    const exist = await categoryService.categoriesExists(postData.categoryIds);

    if (!exist) throw new httpErrors.BadRequest('"categoryIds" not found');
  },

  async createPost(postData, userId) {
    const result = await sequelize.transaction(async (transaction) => {
      const post = await BlogPost.create(
        { ...postData, userId },
        { transaction },
      );

      const blogPostData = postData.categoryIds.map((id) => ({
        categoryId: id,
        postId: post.id,
      }));

      await PostCategory.bulkCreate(blogPostData, {
        transaction,
      });

      return post;
    });

    return result;
  },

  async getAll() {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });

    return posts;
  },

  async getById(id) {
    const post = await BlogPost.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });

    if (!post) throw new httpErrors.NotFound('Post does not exist');
    return post;
  },

 async validatePostUserId(userId, postId) {
    const post = await this.getById(postId);
    const postUserId = post.toJSON().user.id;

    if (Number(userId) !== Number(postUserId)) {
      throw new httpErrors.Unauthorized('Unauthorized user');
    }
  },

  async validateUpdatePost(userId, id, data) {
    await this.validatePostUserId(userId, id);
    validateUpdatePostData(data);
  },

  async updatePost(id, data) {
    const post = BlogPost.update(
      {
        title: data.title,
        content: data.content,
      },
      {
        where: {
          id,
        },
      },
    );

    return post;
  },

  async deletePost(id) {
    const response = await BlogPost.destroy({ where: { id } });

    return response;
  },

  async getByTitleOrContent(q) {
    const posts = await BlogPost.findAll({
      where: { [Op.or]: [
        { title: { [Op.substring]: q } },
        { content: { [Op.substring]: q } },
      ] },
      include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        }],
    });

    return posts;
  },
};
