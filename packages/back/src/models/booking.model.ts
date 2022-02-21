/* eslint-disable no-unused-vars */
import { Document, Schema, model } from 'mongoose';

import { ITrack } from './track.model';

export interface IBooking extends Document {
    trackID: ITrack['_id'];
    userID?: string;
    bName: string;
    bEmail: string;
    bDate: string;
    initTime: string;
    duration: string;
};

const schema = new Schema<IBooking>({
  trackID: { type: Schema.Types.ObjectId, required: true },
  userID: { type: String, required: false, },
  bName: { type: String, required: true, },
  bEmail: { type: String, required: true, },
  bDate: { type: String, required: true, },
  initTime: { type: String, required: true, },
  duration: { type: String, required: true, enum: ['60', '90'] }
});

export const BookingModel = model<IBooking>('Booking', schema);
