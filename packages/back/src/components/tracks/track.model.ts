/* eslint-disable no-unused-vars */
import { Document, Schema, model } from 'mongoose';

export enum TracksEnum {
    solo = 'padel solo',
    duo = 'padel duo',
    padbol = 'padbol',
}

export interface ITrack extends Document {
    trackNum: number;
    trackType: TracksEnum;
};

const schema = new Schema<ITrack>({
  trackNum: { type: Number, required: true },
  trackType: { type: String, required: true, enum: TracksEnum, trim: true }
}, { versionKey: false });

export const TrackModel = model<ITrack>('Track', schema);
