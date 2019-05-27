/* eslint-disable camelcase */
const {
    Comment,
} = require('../models/Comment');

const getCommentCounts = async (movieIds) => {
    const countPromises = [];
    movieIds.forEach((movieId) => {
        const promise = Comment.count({
            where: {
                id: movieId,
            },
        });
        countPromises.push(promise);
    });

    const counts = await Promise.all(countPromises);

    const results = new Map();

    counts.forEach((count, i) => results.set(movieIds[i], count));

    return results;
};


const getComments = async (req, res) => {
    const {
        limit,
        offset,
    } = req.query;

    const comments = await Comment.findAll({
        limit: limit || 10,
        offset: offset || 0,
        order: [
            ['created_at', 'DESC'],
        ],
    });

    return res.status(200).send({
        comments,
    });
};

const postComment = async (req, res) => {
    const {
        content,
        movie_id,
    } = req.body;

    const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    await Comment.create({
        content,
        movie_id,
        ip_address,
    });

    res.status(200).send({
        message: 'Comment Posted Successfully',
    });
};

module.exports = {
    getCommentCounts,
    getComments,
    postComment,
};
