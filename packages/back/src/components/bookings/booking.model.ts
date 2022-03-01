/* eslint-disable no-unused-vars */
import { Document, Schema, model } from 'mongoose';

import { ITrack } from '../tracks/track.model';

export interface IBooking extends Document {
    trackID: ITrack['_id'];
    userID?: string;
    bName: string;
    bEmail: string;
    bDate: string;
    initTime: string;
    endTime: string;
    duration: number;
};

const schema = new Schema<IBooking>({
  trackID: { type: Schema.Types.ObjectId, required: true },
  userID: { type: String, required: false, },
  bName: { type: String, required: true, },
  bEmail: { type: String, required: true, },
  bDate: { type: String, required: true },
  initTime: { type: String, required: true, },
  endTime: { type: String, required: true, },
  duration: { type: Number, required: true, enum: [60, 90, 120] }
}, { versionKey: false });

export const BookingModel = model<IBooking>('Booking', schema);
