import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { Match } from 'src/app/model/match';
import { Player } from 'src/app/model/player';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-roundrobin',
  templateUrl: './roundrobin.component.html',
  styleUrls: ['./roundrobin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundrobinComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  matchData: Match[] = [{ playerOne: 'M', playerTwo: 'P', points: 15 }];
  playerData: Player[] = [];

  newMatch: Match = new Match();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calcPlayerData();
  }

  addRow() {
    this.matchData.push({
      playerOne: this.newMatch.playerOne,
      playerTwo: this.newMatch.playerTwo,
      points: this.newMatch.points,
    });
    this.newMatch = new Match();
    this.calcPlayerData();
    this.table.renderRows();
  }

  calcPlayerData() {
    this.playerData = [];
    this.matchData.forEach((el) => {
      this.playerData.push(
        { name: el.playerOne, games: 1, points: el.points },
        { name: el.playerTwo, games: 1, points: el.points }
      );
    });
    let sum = 0;
    let g = 0;
    let ar: Player[] = [];
    this.playerData.forEach((el) => {
      this.playerData
        .filter((value) => value.name == el.name)
        .forEach((p) => {
          g++;
          sum += p.points;
        });
      if (!ar.some((value) => value.name == el.name)) {
        ar.push({ name: el.name, games: g, points: sum });
      }
      g = 0;
      sum = 0;
    });
    this.playerData = ar;
    this.playerData.sort((a, b) => b.points - a.points);
  }
}
