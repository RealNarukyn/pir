import { FastifyRequest } from 'fastify';
import { ITrack } from '../components/tracks/track.model';

export type MainRequest = FastifyRequest<{ Params: { bDate: string } }>
export type BookingRequest = FastifyRequest<{
  Body: {
    trackID: ITrack['_id'],
    userID?: string,
    bName: string,
    bEmail: string,
    initTime: string,
    duration: number,
    openGame?: boolean,
    host?: string,
    minSkill?: string,
    maxSkill?: string,
  },
  Params: { bDate: string }
}>

export type JoinGameRequest = FastifyRequest<{
  Params: { bookID: string; }
}>
