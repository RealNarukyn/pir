import { Document, Schema, model } from 'mongoose';
import { SkillEnum } from '../../types/enums';

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
    openGame: boolean;
    host?: string;
    players: string[];
    stillJoinable?: boolean;
    minSkill?: string;
    maxSkill?: string;
};

const schema = new Schema<IBooking>({
  trackID: { type: Schema.Types.ObjectId, required: true },
  userID: { type: String, required: false, },
  bName: { type: String, required: true, trim: true },
  bEmail: { type: String, required: true, trim: true },
  bDate: { type: String, required: true },
  initTime: { type: String, required: true, },
  endTime: { type: String, required: true, },
  duration: { type: Number, required: true, enum: [60, 90, 120] },
  openGame: { type: Boolean, required: true, default: false },
  host: { type: String, required: false },
  players: { type: [String], required: true, default: [] },
  stillJoinable: { type: Boolean, required: false, default: true },
  minSkill: {
    type: String, required: false, enum: SkillEnum, default: SkillEnum.any
  },
  maxSkill: {
    type: String, required: false, enum: SkillEnum, default: SkillEnum.any
  }
}, { versionKey: false, timestamps: true });

export const BookingModel = model<IBooking>('Booking', schema);
