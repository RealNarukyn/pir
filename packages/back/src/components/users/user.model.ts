/* eslint-disable no-unused-vars */
import { Document, Schema, model } from 'mongoose';

export enum SkillEnum {
    noobie = 'noobie',
    amateur = 'amateur',
    pro = 'professional',
}

export interface IUser extends Document {
    authID: string;
    skillLevel?: SkillEnum;
};

const schema = new Schema<IUser>({
  authID: { type: String, required: true, trim: true },
  skillLevel: { type: String, required: false, enum: SkillEnum, trim: true }
});

export const UserModel = model<IUser>('User', schema);
