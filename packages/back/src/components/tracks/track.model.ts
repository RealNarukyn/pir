import { Document, Schema, model } from 'mongoose';
import { TracksEnum } from '../../types/enums';

export interface ITrack extends Document {
    trackNum: number;
    trackType: TracksEnum;
};

const schema = new Schema<ITrack>({
  trackNum: { type: Number, required: true },
  trackType: {
    type: String, required: true, enum: TracksEnum, trim: true
  }
}, { versionKey: false });

export const TrackModel = model<ITrack>('Track', schema);
