const express  = require("express")
const {  getPost, getPosts, createPost, deletePost, updatePost } = require("../controller/newsController")
const validateToken = require("../middleware/validationtokenHandler")
const router = express.Router()


//router.use(validateToken)
router.route("/").get(getPosts).post(validateToken,createPost)
router.route("/:id").delete(validateToken, deletePost).put(validateToken, updatePost).get(getPost)

module.exports = router