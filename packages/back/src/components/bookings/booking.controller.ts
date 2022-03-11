import { FastifyReply } from 'fastify';

import { BookingModel, IBooking } from './booking.model';
import { sumTime } from '../../utils/utils';
import {
  validDate, validDuration, validEmail,
  isFreeToBook, validTime, hasUser,
} from '../../utils/validators';
import {
  BookingRequest, MainRequest, JoinGameRequest, BookTimeInfo
} from '../../types/booking';
import { SkillEnum } from '../../types/enums';
import { TrackModel } from '../tracks/track.model';

const getTracksInfo = async (bookings: any[])=> {
  return await Promise.all(
      bookings.map(async (book) => {
        return await TrackModel.findById(book.trackID);
      })
  );
};

export class BookingController {
  static main = async (req: MainRequest, reply: FastifyReply) => {
    const { bDate } = req.params;
    const pDate = bDate.trim().replace(/ /g, '');

    if (!validDate(pDate)) {
      return reply.code(500).send({ error: 'Invalid bDate' });
    }

    const bookings = await BookingModel.find({ bDate: pDate }).lean();

    const tracks = await getTracksInfo(bookings);

    // Assign the track info to a new object
    return bookings.map((book, index) => {
      const info:any = book;
      info.trackInfo = tracks[index];
      return info;
    });
  };

  static booking = async (req: BookingRequest, reply: FastifyReply) => {
    const { bDate } = req.params;
    const {
      trackID, userID, bName, bEmail, initTime, duration, openGame
    } = req.body;

    try {
      // #region [ General Validations ]
      if (!bDate) throw new Error('Missing element [ bDate ]');
      if (!trackID) throw new Error('Missing element [ trackID ]');
      if (!bName) throw new Error('Missing element [ bName ]');
      if (!bEmail) throw new Error('Missing element [ bEmail ]');
      if (!initTime) throw new Error('Missing element [ initTime ]');
      if (!duration) throw new Error('Missing element [ duration ]');
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

      // Get when will the book end
      const endTime = sumTime(initTime, duration);

      const newBookInfo:BookTimeInfo = { bDate, initTime, endTime };
      if (!isFreeToBook(newBookInfo, bookings)) {
        throw new Error('There\s already a book for that time');
      }
      // #endregion


      // [ Create CLOSED Booking ]
      if (!openGame) {
        return await BookingModel.create({
          trackID,
          userID: userID || '',
          bName,
          bEmail,
          bDate,
          initTime,
          endTime,
          duration,
        });
      }

      // #region [ Open Booking Validations ]
      if (openGame && !userID) {
        throw new Error(
            'In order to book an open game you need and [ USER ID ]'
        );
      }
      const { host } = req.body;
      let { minSkill, maxSkill } = req.body;

      if (!host) throw new Error('Invalid [ HOST ]');

      // Set minimum skill
      switch (minSkill) {
        case 'noob': minSkill = SkillEnum.noob; break;
        case 'amateur': minSkill = SkillEnum.amateur; break;
        case 'pro': minSkill = SkillEnum.pro; break;
        default: minSkill = SkillEnum.any; break;
      }

      // Set minimum skill
      switch (maxSkill) {
        case 'noob': maxSkill = SkillEnum.noob; break;
        case 'amateur': maxSkill = SkillEnum.amateur; break;
        case 'pro': maxSkill = SkillEnum.pro; break;
        default: maxSkill = SkillEnum.any; break;
      }
      // #endregion

      // Add host to the game
      const players = [host];

      // [ Create OPEN Booking ]
      const book = await BookingModel.create({
        trackID,
        userID: userID,
        bName,
        bEmail,
        bDate,
        initTime,
        endTime,
        duration,
        openGame,
        host,
        players,
        minSkill,
        maxSkill
      });
      if (!book) throw new Error('Error creating the booking');

      return reply.code(201).send({ message: 'Booking correctly created!'});
    } catch (error) {
      return reply.code(500).send({ error });
    }
  };

  static findOpenGames = async (req: MainRequest, reply: FastifyReply) => {
    const { bDate } = req.params;
    const pDate = bDate.trim().replace(/ /g, '');

    if (!validDate(pDate)) {
      return reply.code(500).send({ error: 'Invalid bDate' });
    }

    // Get all bookings
    const bookings = await BookingModel.find({
      bDate: pDate, openGame: true
    }).lean();

    // Get the respective track info to every booking
    const tracksInfo = await getTracksInfo(bookings);

    // Assign the track info to a new object
    return bookings.map((book, index) => {
      const info:any = book;
      info.trackInfo = tracksInfo[index];
      return info;
    });
  };

  static joinGame = async (req: JoinGameRequest, reply: FastifyReply) => {
    // Has a user???
    const user = await hasUser(req);
    if (!user) return reply.code(401).send({ error: 'NO USER TOKEN' });

    try {
      const { bookID } = req.params;
      if (!bookID) throw new Error('Not receiving [ bookID ]');

      const booking:IBooking = await BookingModel.findById(bookID).lean();
      if (!booking) {
        throw new Error('Invalid [ bookID ]');
      }
      if (!booking.openGame) {
        throw new Error('Trying to join a private game');
      }
      if (!booking.stillJoinable) {
        throw new Error('The game isn\'t joinable anymore');
      }

      if (booking.players.includes(user.sub)) {
        throw new Error('You\'re already in the game...');
      }

      // @TODO: CHECKEAR QUE UN USUARIO CON LVL NOOB
      // NO SE PUEDA UNIR A UN GAME DE LVL AMATEUR O PRO

      // @TODO: CHECKEAR EL NUMERO MAXIMO DE PLAYERS POR BOOKING
      // SI ES PADEL SOLO: NUM PLAYERS MAX = 2
      // SI ES PADEL DUO: NUM PLAYERS MAX = 4
      // SI ES PADBOL: NUM PLAYERS MAX = 4

      const numPlayers = booking.players.length;
      // Imposible to join
      if (numPlayers >= 4) throw new Error('The game is not joinable anymore');

      // Update players
      if (numPlayers < 3) {
        await BookingModel.findOneAndUpdate(
            { _id: bookID },
            { players: [...booking.players, user.sub] },
            { new: true }
        );
        return reply.code(200).send({ message: 'Updated succesfully' });
      }

      // Update players && joinable option
      if (numPlayers === 3) {
        await BookingModel.findOneAndUpdate(
            { _id: bookID },
            {
              players: [...booking.players, user.sub],
              stillJoinable: false,
            },
            { new: true }
        );
        return reply.code(200).send({ message: 'Updated succesfully' });
      }
    } catch (error: any) {
      return reply.code(418).send({ error: error.message });
    }
  };
};
