export interface Notification {

  id:number;

  title:string;

  message:string;

  icon:string;

  type:
  | 'ORDER'
  | 'DOWNLOAD'
  | 'FAVORITE'
  | 'SYSTEM'
  | 'COUPON';

  date:Date;

  read:boolean;

}