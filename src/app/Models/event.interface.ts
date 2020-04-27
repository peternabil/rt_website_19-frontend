export interface Event{
  id:Number,
  name:string,
  date:Date,
  description:string,
  status:boolean,
  image:Array<{id:Number,image:string}>,
  event_type:string
}
