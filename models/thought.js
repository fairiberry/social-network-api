const { Schema, model } = require('mongoose');


const Reactions = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Thoughts = new Schema({
    thoughtId: {
        type: Schema.Types.ObjectId,
    },
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280         
    },
    createdAt: {
        type: Date,
        default: Date.now  
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reactions]
},
{
    toJSON: {
      virtuals: true
    },
    id: false,
  }
)

Thoughts.virtual("reactionCount").get(function() {
    return this.reactions.length;    
});

const Thought = model("thought", Thoughts);
const Reaction = model("reaction", Reactions);

module.exports = Thought;
module.exports = Reaction;