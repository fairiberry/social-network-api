const { Schema, model } = require('mongoose');

// trimmed means it removes white spaces...
// mongoose assigns a default _id to each schema.

const Users = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "Users"
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
)

// friend count virtual

Users.virtual("friendCount").get(function() {
    return this.friends.length;    
});

const User = model("user", Users);

module.exports = User;