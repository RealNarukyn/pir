import { Schema, model, Document } from 'mongoose';

export interface INews extends Document {
    title: string;
    body: string;
    author: string;
};

const schema = new Schema<INews>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true }
}, { versionKey: false, timestamps: true });

export const NewsModel = model<INews>('News', schema);
