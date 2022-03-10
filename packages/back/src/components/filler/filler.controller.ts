import { FastifyReply, FastifyRequest } from 'fastify';
import { TracksEnum } from '../../types/enums';
import { BookingModel } from '../bookings/booking.model';
import { TrackModel } from '../tracks/track.model';
import { BOOKINGS_PACK, DEFAULT_TRACKS } from './filler.data';

type MyRequest = FastifyRequest<{ Body: {date: string; trackID: string}}>;

const getTrackType = (trackType: string):string =>
      trackType === 'duo' ? TracksEnum.duo :
          trackType === 'solo' ? TracksEnum.solo : TracksEnum.padbol;

export class FillerController {
  static FillBookings = async (req: MyRequest, reply: FastifyReply) => {
    try {
      const { date, trackID } = req.body;

      const bookings = await Promise.all(
          BOOKINGS_PACK.map(async (book) => {
            book.bDate = date;
            book.trackID = trackID;
            return await BookingModel.create(book);
          })
      );

      return reply.code(201).send(bookings);
    } catch (error) {
      req.log.error('error at FillBookings', error);
      return reply.code(500).send({ error });
    }
  };

  static FillTracks = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const tracks = await Promise.all(
          DEFAULT_TRACKS.map(async (trackType:string, index: number) => {
            await TrackModel.create({
              trackNum: index+1,
              trackType: getTrackType(trackType)
            });
          })
      );

      return reply.code(201).send(tracks);
    } catch (error) {
      req.log.error('error at FillTracks', error);
      return reply.code(500).send({ error });
    }
  };
}
