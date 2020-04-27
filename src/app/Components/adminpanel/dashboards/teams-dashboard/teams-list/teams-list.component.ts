import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/Models/team.interface';
import { TeamsService } from 'src/app/Services/adminpanel/teams.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {

  teams_list: Team[] = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.teamsService.fetch_teams().subscribe(
      teams => {
        this.teams_list = teams;
      }
    ); 
  }

}
