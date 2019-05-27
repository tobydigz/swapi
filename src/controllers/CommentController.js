/* eslint-disable camelcase */
const {
    comment: Comment,
} = require('../data/models');

const Util = require('../utils/Utils');

const getCommentCounts = async (movieIds) => {
    const countPromises = [];
    movieIds.forEach((movieId) => {
        const promise = Comment.count({
            where: {
                movie_id: movieId,
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

    const {
        count: total_count,
        rows: comments,
    } = await Comment.findAndCountAll({
        limit: limit || 10,
        offset: offset || 0,
        order: [
            ['createdAt', 'DESC'],
        ],
    });

    return res.status(200).send({
        total_count,
        comments,
    });
};

const getCommentsForMovie = async (req, res) => {
    const {
        limit,
        offset,
    } = req.query;

    const {
        id,
    } = req.params;

    const {
        count: total_count,
        rows: comments,
    } = await Comment.findAndCountAll({
        where: {
            movie_id: id,
        },
        limit: limit || 10,
        offset: offset || 0,
        order: [
            ['createdAt', 'DESC'],
        ],
    });

    return res.status(200).send({
        total_count,
        comments,
    });
};

const postComment = async (req, res) => {
    const {
        content,
        movie_id,
    } = req.body;

    const ip_address = Util.getIp(req);

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
    getCommentsForMovie,
};
