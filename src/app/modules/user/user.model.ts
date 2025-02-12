import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
// UserSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     delete ret.__v;
//     delete ret.createdAt;
//     delete ret.updatedAt;
//   },
// });

// UserSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     // Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// UserSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

// UserSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
//   return await User.findOne({ email }).select('+password');
// };

// UserSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

// UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000;
//   return passwordChangedTime > jwtIssuedTimestamp;
// };

export const User = model<TUser, UserModel>('User', UserSchema);
