const Util = require('../utils/Utils');
const {
    getCommentAndCounts,
    saveComment,
} = require('../utils/CommentUtils');

const getComments = async (req, res) => {
    const {
        limit,
        offset,
    } = req.query;

    const {
        count: total_count,
        rows: comments,
    } = await getCommentAndCounts((limit || 10), (offset || 10));

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
    } = await await getCommentAndCounts((limit || 10), (offset || 10),
        {
            movie_id: id,
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

    await saveComment(content, movie_id, ip_address);

    res.status(200).send({
        message: 'Comment Posted Successfully',
    });
};

module.exports = {
    getComments,
    postComment,
    getCommentsForMovie,
};
