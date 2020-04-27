import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { TeamsService } from '../../../Services/adminpanel/teams.service';
import { Team,Achivement } from '../../../Models/team.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  endpoint = environment.endpoint;

  id:number;
  team:Team=null;
  achivements : Achivement[]=null;
  constructor(private modalService: NgbModal,private route:ActivatedRoute,private router:Router,private ts: TeamsService) {
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        console.log(params);
        this.id = +params['id'];
        this.ts.get_team_by_id(this.id).subscribe(
          team =>{
            this.team = team;
            this.achivements=team.achievement;
          }
        );
      }
    );
  }

  openXl(content) { this.modalService.open(content, {size: 'lg'}); }

}
