import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  name?: string;
  isAdmin?: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default model<IUser & { comparePassword?: (p: string)=>Promise<boolean> }>("User", UserSchema);
