export interface Highlight{
    id:Number,
    title:String,
    description:String,
    image:Array<{id:Number,image:string}>,
    url:String,
    active:boolean
}