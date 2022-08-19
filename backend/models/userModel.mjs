import mongoose from "mongoose";
const { model } = mongoose;
import userSchema from "../schema/userSchema.mjs";

export const User = model("User", userSchema);
