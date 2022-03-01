import { FastifyReply, FastifyRequest } from 'fastify';
import { NewsModel } from './news.model';

export class NewsController {
  static main = async (req: FastifyRequest, reply: FastifyReply) => {
    return await NewsModel.find().lean();
  };
};
