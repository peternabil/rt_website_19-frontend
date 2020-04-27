export interface Article{
    id:Number,
    title:String,
    description:String,
    date:Date,
    image:Array<{id:Number,image:string}>,
    video:String,
    status:boolean,
    article_type:string
}