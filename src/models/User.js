import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    index: true 
},
  passwordHash: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['ADMIN', 'DRIVER'], 
    default: 'DRIVER' },
    isEmailVerified: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true 
});

export default mongoose.model('User', UserSchema);
