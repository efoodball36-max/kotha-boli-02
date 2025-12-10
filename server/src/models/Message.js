import mongoose from 'mongoose';

const ReactionSchema = new mongoose.Schema(
  {
    emoji: { type: String, enum: ['👍', '❤️', '🤔', '🥺', '🤣'], required: true },
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { _id: false }
);

const MessageSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    reactions: [ReactionSchema],
    sentAt: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
