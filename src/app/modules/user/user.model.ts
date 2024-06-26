import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<IUser>({

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone  is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: [true, 'Role is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this; 

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

  
  const User = model<IUser>('User', userSchema);
  
  export default User;