import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is missing');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });
  console.log('MongoDB connected');
<<<<<<< HEAD
}
=======
}
>>>>>>> 3aaa7999a940efd5c5b86ed820ed4c00b034c7a4
