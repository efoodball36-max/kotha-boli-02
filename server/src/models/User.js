import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    online: { type: Boolean, default: false },
    lastSeenAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
