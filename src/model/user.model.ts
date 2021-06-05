import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UserDocument extends Document {
  firstname: string,
  middlename: string,
  lastname: string,
  email: string,
  username: string,
  password: string,
  description: string,
  token: string
}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true, trim: true },
  middlename: { type: String, required: false, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  token: { type: String }
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next: HookNextFunction) {
  let user = this as UserDocument;
  
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.generateAuthToken = async function () {
  let user = this as UserDocument;
  const token = jwt.sign({ _id: user._id }, 'portfoliosecret');
  user.token = token;
  await user.save();
  return token;
}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;