import { getModelForClass } from "@typegoose/typegoose";
import User from "../../../domain/user";

const UserModel = getModelForClass(User);

export default UserModel;
