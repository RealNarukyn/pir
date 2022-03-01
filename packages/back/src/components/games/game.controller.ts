import { FastifyReply, FastifyRequest } from 'fastify';

import { AddPlayerReq, ProposalReq } from '../../types/games';
import { splitTime } from '../../utils/utils';
import {
  isFreeToBook, validDate, validDuration, validTime
} from '../../utils/validators';
import { BookingModel, IBooking } from '../bookings/booking.model';
import { GameModel } from './game.model';

export class GameController {
  static main = async (req: FastifyRequest, reply: FastifyReply) => {
    return await GameModel.find().lean();
  };

  static addProposal = async (req: ProposalReq, reply: FastifyReply) => {
    const {
      trackID, host, date, initTime, duration, minSkill, maxSkill
    } = req.body;

    try {
      // #region [ Validations ]
      if (!trackID || !host || !date || !initTime || !duration) {
        throw new Error('Missing important parameter in the body request');
      }
      if (!validDuration(duration)) {
        throw new Error('Invalid [ DURATION ] for the proposal');
      }
      if (!validDate(date)) {
        throw new Error('Invalid [ DATE ] for the proposal');
      }
      if (!validTime(date, initTime, duration)) {
        throw new Error('Invalid [ TIME ] for the proposal');
      }

      // [ Get all the bookings for that track for that day ]
      const bookings: IBooking[] = await BookingModel.find({ date, trackID });
      // [ Get all the bookings beyond the current hour ]
      const bTime = splitTime(initTime);
      const beyondBookings = bookings.filter((booking) =>
        splitTime(booking.initTime)[0] >= bTime[0]
      );
      if (!isFreeToBook(initTime, beyondBookings)) {
        throw new Error('There\s already a book for that time');
      }
      // #endregion

      // Add host to the game
      const players = [host];
      // Create Game Proposal
      const game = await GameModel.create({
        trackID, host, players, date, initTime, duration, minSkill, maxSkill
      });
      return reply.code(201).send(game);
    } catch (error) {
      return reply.code(500).send({ error });
    }
  };

  static addPlayerToGame = async (req: AddPlayerReq, reply: FastifyReply) => {

  };
}
