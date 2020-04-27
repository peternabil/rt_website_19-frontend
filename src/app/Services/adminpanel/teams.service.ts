import { Injectable } from '@angular/core';
import { Team, Achivement } from 'src/app/Models/team.interface';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teams = [];
  private onChangeTeams = new Subject<Team[]>();
  private onReceiveOneTeam = new Subject<Team>();

  constructor(private http:HttpClient,
              private toastr:ToastrService,
              private router:Router) { }

  fetch_teams(){
    if(this.teams.length > 0){
      /** If teams fetched before next without sending request */
      setTimeout(() => {
        this.onChangeTeams.next(this.teams);
      });
    }else{
      this.http.get<Team[]>('api/teams/').subscribe(
        (teams:Team[]) => {
          this.teams = teams;
          this.onChangeTeams.next(this.teams);
        },
        (err:any) => {
          if ('msg' in err.error) {
            this.toastr.error(err.error.msg, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
        }
      );
    }
    return this.onChangeTeams;
  }

  update_fetched_data(){
    this.teams = [];
    this.fetch_teams();
  }

  get_team_by_id(id:Number){
    if(this.teams.length > 0){
      /** if all teams fetched before get this team from array */
      let team = this.teams.find(el => el.id == id);
      if(team){
        setTimeout(() => {
          this.onReceiveOneTeam.next(team);
        });
        return this.onReceiveOneTeam;
      }
    }
    /** else fetch team from backend */
    this.http.get<Team>('api/teams/'+id+'/').subscribe(
      (team: Team) => {
        this.onReceiveOneTeam.next(team);
      },
      (err:any) => {
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    );
    return this.onReceiveOneTeam;
  }

  post_team(data){
    this.teams = [];

    return this.http.post('api/teams/',{
      name: data.name,
      description: data.description,
      team_type: data.team_type,
      achievement: data.achievement,
      image: data.images
    });
  }

  update_team(id:Number,data){
    this.teams = [];

    return this.http.put('api/teams/'+id+'/',{
      name: data.name,
      description: data.description,
      team_type: data.team_type,
      achievement: data.achievement,
      image: data.images
    });
  }

  delete_team(id:Number){
    this.http.delete('api/teams/'+id+'/').subscribe(
      (res:any) => {
        this.toastr.success(res.msg,"Success");

        let index = this.teams.findIndex(el => el.id == id);
        this.teams.splice(index,1);
        this.router.navigate(['adminpanel/teams']);
      },
      (err:any) => {
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    )
  }

  delete_achievement_by_id(team_id:Number,achievement_id:Number){
    return this.http.get('api/remove-from/1/'+team_id+'/'+achievement_id+'/');
  }

}
