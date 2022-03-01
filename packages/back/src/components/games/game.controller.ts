import { FastifyReply, FastifyRequest } from 'fastify';

import { GameModel } from './game.model';

type AddRequest = FastifyRequest<any>

export class GameController {
  static main = async (request: FastifyRequest, reply: FastifyReply) => {
    return await GameModel.find().lean();
  };

  static addProposal = async (request: AddRequest, reply: FastifyReply) => {

  };
}
