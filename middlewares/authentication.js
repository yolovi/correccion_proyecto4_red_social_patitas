/* const Post = require('../models/Post')

const isAuthor = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.stauts(403).send({message: "Esta publicación no es tuya"});
        }
        next();        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: "Ha habido un problema al verificar que este post es tuyo"})
    }
}

module.exports = isAuthor
*/
