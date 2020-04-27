export class Achivement{
  title:string;
  position:string;
  description:string;
  image:string;
  year:Date;
  constructor(title:string,position:string,description:string,image:string,year:Date){
    this.title=title;
    this.position=position;
    this.description=description;
    this.image=image;
    this.year=year;
  }
}
export class Team {
  id:number;
  name:string;
  description:string;
  images:string[];
  achivements :Achivement[];
  type:string;

  constructor(id:number,name:string,description:string,images:string[],achivements :Achivement[],type:string){
    this.id=id;
    this.name=name;
    this.description=description;
    this.images=images;
    this.achivements=achivements;
    this.type=type;
  }
}
