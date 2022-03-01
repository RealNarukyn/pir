import { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from './user.model';

type MainRequest = FastifyRequest<{ Params: { authID: string } }>
export class UserController {
  static main = async (request: MainRequest, reply: FastifyReply) => {
    const { authID } = request.params;
    const pID = authID.trim().replace(/ /g, '');
    if (!pID) {
      return reply.code(500).send({ error: 'Invalid authID' });
    }

    const user = await UserModel.findOne({ authID }).lean();
    if (!user) {
      return reply.code(404).send({ message: 'No User found' });
    }

    return user;
  };
};
