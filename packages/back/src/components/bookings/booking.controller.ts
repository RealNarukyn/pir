import { FastifyReply } from 'fastify';

import { BookingModel, IBooking } from './booking.model';
import { sumTime } from '../../utils/utils';
import {
  validDate, validDuration, validEmail, isFreeToBook, validTime, BookTimeInfo
} from '../../utils/validators';
import {
  BookingRequest, MainRequest } from '../../types/booking';
import { SkillEnum } from '../../types/enums';


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
      return await BookingModel.create({
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
    } catch (error) {
      return reply.code(500).send({ error });
    }
  };
};
