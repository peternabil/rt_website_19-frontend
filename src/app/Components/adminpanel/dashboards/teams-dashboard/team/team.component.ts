import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/Models/team.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() team:Team = null;

  constructor() { }

  ngOnInit() {
  }

}
