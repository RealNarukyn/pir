import { FastifyReply, FastifyRequest } from 'fastify';
import { BookingModel } from '../models/booking.model';
import { ITrack } from '../models/track.model';
import { validDate, validEmail, validTime } from '../utils/validators';

type MainRequest = FastifyRequest<{ Params: { bDate: string } }>
type BookingRequest = FastifyRequest<{
  Body: {
    trackID: ITrack['_id'],
    userID?: string,
    bName: string,
    bEmail: string,
    initTime: number,
    duration: string,
  },
  Params: { bDate: string }
}>

export class BookingController {
  static main = async (request: MainRequest, reply: FastifyReply) => {
    const { bDate } = request.params;
    const pDate = bDate.trim().replace(/ /g, '');

    if (!validDate(pDate)) {
      return reply.code(500).send({ error: 'Invalid bDate' });
    }

    return await BookingModel.find({ bDate: pDate }).lean();
  };

  static booking = async (request: BookingRequest, reply: FastifyReply) => {
    const { bDate } = request.params;
    const {
      trackID, userID, bName, bEmail, initTime, duration
    } = request.body;


    // [ Validations ]
    if (!validDate(bDate)) {
      return reply.code(500).send({ error: 'Invalid bDate' });
    }
    if (!trackID || !bName || !bEmail || !initTime || !duration) {
      return reply.code(500).send({ error: 'Missing element in request body' });
    }
    if (!validEmail(bEmail)) {
      return reply.code(500).send({ error: 'Invalid bEmail' });
    }
    if (!validTime(initTime)) {
      return reply.code(500).send({ error: 'Invalid initTime' });
    }

    // [ Create Booking ]
    try {
      return await BookingModel.create({
        trackID,
        userID: userID || '',
        bName,
        bEmail,
        bDate,
        initTime,
        duration
      });
    } catch (error) {
      return reply.code(500).send({ error });
    }
  };
};
