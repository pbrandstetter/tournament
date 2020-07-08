import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/model/match';

@Component({
  selector: 'app-roundrobin',
  templateUrl: './roundrobin.component.html',
  styleUrls: ['./roundrobin.component.scss'],
})
export class RoundrobinComponent implements OnInit {
  matchData: Match[] = [{ playerOne: 'M', playerTwo: 'P', points: 15 }];

  constructor() {}

  ngOnInit(): void {}

  addRow() {
    this.matchData.push(
      { playerOne: 'D', playerTwo: 'P', points: 68 }
    );
    console.log(this.matchData);
  }
}
