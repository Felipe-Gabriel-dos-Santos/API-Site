import { Schema, model } from "mongoose";
import { IUserCreateInput } from "../../types/user";

const userSchema = new Schema<IUserCreateInput>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      maxlength: 50,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 50,
    },

    avatarUrl: {
      type: String,
      required: false,
      default: `https://firebasestorage.googleapis.com/v0/b
      /site-sorri-teste.appspot.com/
      o/DefaultProfileImage%2
      Fdefault-profile-image.png?alt=media&token=
      1742657d-48e1-4a0b-81aa-ea4a8855e910`,
    },
  },
  { timestamps: true }
);

export default model<IUserCreateInput>("User", userSchema);
