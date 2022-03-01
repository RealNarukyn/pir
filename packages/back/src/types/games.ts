import { FastifyRequest } from 'fastify';
import { ITrack } from '../components/tracks/track.model';

interface IProposal {
    trackID: ITrack['_id'];
    host: string;
    date: string;
    initTime: string;
    duration: number;
    minSkill?: string;
    maxSkill?: string;
};
export type ProposalReq = FastifyRequest<{ Body: IProposal }>

interface IAddPlayer {

}
export type AddPlayerReq = FastifyRequest<{ Body: IAddPlayer }>
