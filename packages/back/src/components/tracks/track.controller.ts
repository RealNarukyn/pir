import { FastifyReply, FastifyRequest } from 'fastify';
import { TrackModel } from './track.model';

export class TrackController {
  static main = async (request: FastifyRequest, reply: FastifyReply) => {
    return await TrackModel.find().lean();
  };
};
