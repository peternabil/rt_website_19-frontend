import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UsersService } from 'src/app/Services/adminpanel/users.service';
import { User, Group } from 'src/app/Models/user';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  users_table:User[] = []

  user_groups:Group[] = []

  search_field:FormControl = new FormControl('');

  constructor(private usersService:UsersService) { }

  ngOnInit() {
    this.usersService.fetch_users().subscribe(users=>{
      this.users_table = users;
    });

    this.usersService.fetch_groups().subscribe(groups=>{
      this.user_groups = groups;
    })

    this.search_field.valueChanges.subscribe(val=>{
      this.users_table = this.usersService.get_users().filter((user)=>{
        return (''+user.name+' '
                  +user.email+' '
                  +user.phone+' '
                  +user.college_id+' '
                  +user.group.name).toLowerCase().includes(val.toLowerCase());
      })
    })
  }

  update_group(group:string,user_id:number){
    this.usersService.update_user_group(group,user_id);
  }

}
