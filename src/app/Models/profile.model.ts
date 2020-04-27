

export class Profile{
    //public user: number;
    public profile_pic:string;
    public name:string;
    public mobile:string;
    public birth_date:string;
    public address:string;
    public university:string;
    public faculty:string;
    public college_department:string;
    public graduation_year:string;
    public college_id:string;
    public emergency_name:string;
    public emergency_mobile:string;
    public emergency_relation:string;
    public national_id:string;
    public national_front:string;
    public national_back:string;
    public passport_id:string;
    public passport_img:string;

    constructor(pic:string,Fullname:string,
         Mobile:string,University:string,Faculty:string,College_id:string,College_Department:string,Expected_Year_Of_Graduation:string,
         Address:string,  DOB:string,National_id:string,National_id_front:string,National_id_back:string,Passport_id:string,
         Passport_id_im:string, Em_contact_name:string, Em_contact_mobile:string,Em_contact_relation:string
        ){
        //this.user =user;
        this.profile_pic= pic;
        this.address=Address;
        this.college_department=College_Department;
        this.name=Fullname;
        this.college_id=College_id;
        this.birth_date=DOB;
        this.university=University;
        this.emergency_mobile=Em_contact_mobile;
        this.emergency_name =Em_contact_name;
        this.graduation_year=Expected_Year_Of_Graduation;
        this.national_id=National_id;
        this.passport_id =Passport_id;
        this.passport_img = Passport_id_im;
        this.emergency_relation = Em_contact_relation;
        this.faculty = Faculty;
        this.mobile =Mobile;
        this.national_front =National_id_front;
        this.national_back = National_id_back;
    }
}