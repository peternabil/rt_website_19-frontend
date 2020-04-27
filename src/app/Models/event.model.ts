export class Evnt{
    public id:number;
    public name:string;
    public description:string;
    public date:string;
    public image:Array<{id:Number,image:string}>;
    public event_type:string;
    public status:boolean;
    constructor(id:number,name:string,description:string,date:string,image:any[],event_type:string,status:boolean){
        this.date=date;
        this.id=id;
        this.description =description;
        this.event_type=event_type;
        this.image=image;
        this.name=name;
        this.status=status;
    }
}