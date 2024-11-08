import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  jobRole: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  password: {
    type: String,
    require: true
  },
});

export default mongoose.model('Student', studentSchema);
