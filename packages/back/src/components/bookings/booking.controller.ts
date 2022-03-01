import { FastifyReply, FastifyRequest } from 'fastify';

import { BookingModel, IBooking } from './booking.model';
import { ITrack } from '../tracks/track.model';
import { splitTime, sumTime } from '../../utils/utils';
import {
  validDate, validDuration, validEmail, isFreeToBook, validTime
} from '../../utils/validators';

type MainRequest = FastifyRequest<{ Params: { bDate: string } }>
type BookingRequest = FastifyRequest<{
  Body: {
    trackID: ITrack['_id'],
    userID?: string,
    bName: string,
    bEmail: string,
    initTime: string,
    duration: number,
  },
  Params: { bDate: string }
}>

export class BookingController {
  static main = async (req: MainRequest, reply: FastifyReply) => {
    const { bDate } = req.params;
    const pDate = bDate.trim().replace(/ /g, '');

    if (!validDate(pDate)) {
      return reply.code(500).send({ error: 'Invalid bDate' });
    }

    return await BookingModel.find({ bDate: pDate }).lean();
  };

  static booking = async (req: BookingRequest, reply: FastifyReply) => {
    const { bDate } = req.params;
    const {
      trackID, userID, bName, bEmail, initTime, duration
    } = req.body;

    try {
      // #region [ Validations ]
      if (!bDate || !trackID || !bName || !bEmail || !initTime || !duration) {
        throw new Error('Missing element in request');
      }
      if (!validEmail(bEmail)) {
        throw new Error('Invalid [ BOOKING EMAIL ]');
      }
      if (!validDuration(duration)) {
        throw new Error('Invalid [ DURATION ]');
      }
      if (!validDate(bDate)) {
        throw new Error('Invalid [ BOOKING DATE ]');
      }
      if (!validTime(bDate, initTime, duration)) {
        throw new Error('Invalid [ BOOKING START TIME ]');
      }

      // [ Get all the bookings for that track for that day ]
      const bookings: IBooking[] = await BookingModel.find({ bDate, trackID });
      // [ Get all the bookings beyond the current hour ]
      const bTime = splitTime(initTime);
      const beyondBookings = bookings.filter((booking) =>
        splitTime(booking.initTime)[0] >= bTime[0]
      );

      if (!isFreeToBook(initTime, beyondBookings)) {
        return reply.code(500).send({
          error: 'There\s already a book for that time'
        });
      }
      // #endregion

      // [ Create Booking ]
      const endTime = sumTime(initTime, duration);
      return await BookingModel.create({
        trackID,
        userID: userID || '',
        bName,
        bEmail,
        bDate,
        initTime,
        endTime,
        duration
      });
    } catch (error) {
      return reply.code(500).send({ error });
    }
  };
};
