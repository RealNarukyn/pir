import { FastifyReply, FastifyRequest } from 'fastify';
import { BookingModel, IBooking } from '../models/booking.model';
import { ITrack } from '../models/track.model';
import { splitTime, sumTime } from '../utils/utils';
import { validDate, validEmail, validTime } from '../utils/validators';

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

    // #region [ Validations ]
    if (!bDate || !trackID || !bName || !bEmail || !initTime || !duration) {
      return reply.code(500).send({ error: 'Missing element in request' });
    }
    if (!validDate(bDate)) {
      return reply.code(500).send({ error: 'Invalid booking Date' });
    }
    if (!validEmail(bEmail)) {
      return reply.code(500).send({ error: 'Invalid booking Email' });
    }
    if (!validTime(initTime, duration)) {
      return reply.code(500).send({ error: 'Invalid booking Start Time' });
    }
    const endTime = sumTime(initTime, duration);

    // [ Get all the bookings for that track for that day ]
    const bookings: IBooking[] = await BookingModel.find({ bDate, trackID });
    // [ Get all the bookings beyond the current hour ]
    const bTime = splitTime(initTime);
    const beyondBookings = bookings.filter((booking) =>
      splitTime(booking.initTime)[0] >= bTime[0]
    );

    // [ Check that there're options to book ]
    let validBook = true;
    beyondBookings.forEach((booking) => {
      const alreadyBookedTime: Array<number> = splitTime(booking.initTime);
      const alreadyBookedEndTime: Array<number> = splitTime(
          sumTime(booking.initTime, booking.duration)
      );

      // Same booking tame === [ ERROR ]
      if (booking.initTime === initTime) validBook = false;

      // Booking between an already booked === [ ERROR ]
      // [ Case 21:00 ]
      if (bTime[0] >= alreadyBookedTime[0] &&
        bTime[0] < alreadyBookedEndTime[0]) {
        validBook = false;
      }
      // [ Case 21:30 ]
      if (bTime[0] >= alreadyBookedTime[0] &&
        (bTime[0] === alreadyBookedEndTime[0] &&
          bTime[1] > alreadyBookedEndTime[1]) ) {
        validBook = false;
      }
    });
    if (!validBook) {
      return reply.code(500).send({
        error: 'There\s already a book for that time'
      });
    }
    // #endregion

    // [ Create Booking ]
    try {
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
