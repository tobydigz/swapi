const Util = require('../utils/Utils');
const {
    getCommentAndCounts,
    saveComment,
} = require('../data/sources/CommentSource');

const getCommentsForMovie = async (req, res) => {
    const {
        limit,
        offset,
    } = req.query;

    const {
        id,
    } = req.params;

    const {
        total_count,
        comments,
    } = await getCommentAndCounts(limit, offset,
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
    } = req.body;

    const {
        id,
    } = req.params;

    const ip_address = Util.getIp(req);

    await saveComment(content, id, ip_address);

    res.status(200).send({
        message: 'Comment Posted Successfully',
    });
};

module.exports = {
    postComment,
    getCommentsForMovie,
};
