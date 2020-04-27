export interface User{
    id:number,
		email:string,
		name: string,
		phone:string,
		college_id:string,
		group:Group
}

export interface Group{
	id:Number,
	name:string,
}