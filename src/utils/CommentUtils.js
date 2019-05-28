const {
    comment: Comment,
} = require('../data/models');

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

const getCommentAndCounts = async (limit, offset, where) => {
    const options = {
        where,
        limit: limit || 10,
        offset: offset || 0,
        order: [
            ['createdAt', 'DESC'],
        ],
    };

    const {
        count: total_count,
        rows: comments,
    } = await Comment.findAndCountAll(options);

    return {
        total_count,
        comments,
    };
};

const saveComment = async (content, movie_id, ip_address) => Comment.create({
    content,
    movie_id,
    ip_address,
});

module.exports = {
    getCommentCounts,
    getCommentAndCounts,
    saveComment,
};
