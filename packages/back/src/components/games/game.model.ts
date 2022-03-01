/* eslint-disable max-len */
import { Schema, model, Document } from 'mongoose';

import { ITrack } from '../tracks/track.model';
import { SkillEnum } from '../users/user.model';

export interface IGame extends Document {
    trackID: ITrack['_id'];
    host: string;
    players: string[];
    date: string;
    initTime: string;
    duration: number;
    minSkill: string;
    maxSkill: string;
}

const schema = new Schema<IGame>({
  trackID: { type: Schema.Types.ObjectId, required: true },
  host: { type: String, required: true },
  players: { type: [String], required: true, },
  date: { type: String, required: true, },
  initTime: { type: String, required: true, },
  duration: { type: Number, required: true, },
  minSkill: { type: String, required: false, enum: SkillEnum, default: SkillEnum.any },
  maxSkill: { type: String, required: false, enum: SkillEnum, default: SkillEnum.any }
}, { versionKey: false });

export const GameModel = model<IGame>('Game', schema);
