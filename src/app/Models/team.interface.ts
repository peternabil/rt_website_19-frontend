export interface Team {
    id:Number,
    name:string,
    description:string,
    image:Array<{id:Number,image:string}>,
    team_type:string,
    achievement:Array<Achivement>,
}

export interface Achivement {
    id:Number,
    title: string,
    position: string,
    description: string,
    image: string,
    year: Date
}