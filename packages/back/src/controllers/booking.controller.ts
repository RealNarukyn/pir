import { FastifyReply, FastifyRequest } from 'fastify';
import { BookingModel } from '../models/booking.model';
import { validDate } from '../utils/validators';

type MainRequest = FastifyRequest<{ Params: { bDate: string } }>

export class BookingController {
  static main = async (request: MainRequest, reply: FastifyReply) => {
    const { bDate } = request.params;
    const pDate = bDate.trim().replace(/ /g, '');

    if (!validDate(pDate)) {
      return reply.code(500).send({error: 'Invalid bDate'});
    }

    return await BookingModel.find({ bDate: pDate }).lean();
  };
};
