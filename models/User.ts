import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the Interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "employee" | "employer" | "admin";
  companyName?: string;
  phone?: string;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return the password by default in queries
    },
    role: {
      type: String,
      enum: ["employee", "employer", "admin"],
      default: "employee",
    },
    companyName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      select: false,
    },
    emailVerificationTokenExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true, //for automated createdAt and updatedAt fields
  }
);

// 3. Create and Export the Model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
