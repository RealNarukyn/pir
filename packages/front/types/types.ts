export type UserAPI =
{ authID:string; skillLevel: string }
| { message: string }
| { error: string };

export interface BookingReq {
  userID?: string;
  bDate: string;
  bEmail:string;
  bName:string;
  duration:number;
  initTime:string;
  trackID:string;
}
