import { img } from './img.model';

export class Post {

    constructor(public id:number,
                public image:img[],
                public title:string,
                public description: string,
                public date:Date,
                public status:boolean,
                public article_type:string,
                public video :string
                ){

                }

}