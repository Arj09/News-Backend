const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    title: {
        type: String,
        required: [true, "Please add title "],
    },
    description: {
        type: String,
        required: [true, "please add description"]
    }
},{
    timestamps : true
})

module.exports = mongoose.model("blogpost", postSchema)