import { DatabaseController } from './controllers/database.controller';
import { TrackModel, TracksEnum } from './models/track.model';

const DEFAULT_TRACKS = [
  'duo', 'duo', 'duo', 'duo', 'duo', 'duo',
  'solo',
  'padbol', 'padbol'
];
const getTrackType = (trackType: string):string =>
    trackType === 'duo' ? TracksEnum.duo :
        trackType === 'solo' ? TracksEnum.solo : TracksEnum.padbol;

// -- Auto called function
(async () => {
  try {
    // -- Connect to the Database
    await DatabaseController.connectDB();

    // -- Create Default Tracks
    await Promise.all(
        DEFAULT_TRACKS.map(async (trackType:string, index: number) => {
          await TrackModel.create({
            trackNum: index+1,
            trackType: getTrackType(trackType)
          });
        })
    );

    // -- Connect to the Database
    await DatabaseController.disconnectDB();
  } catch (error) {
    console.log('Something went wrong with the seed', error);
    throw new Error();
  }
})();