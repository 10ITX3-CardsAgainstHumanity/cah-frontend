import { Component } from '@angular/core';
import {Player} from './interfaces/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public players: Player[] = [
    {
      username: 'player 1',
      points: 1
    },
    {
      username: 'player 2',
      points: 2
    },
    {
      username: 'player 3',
      points: 3,
    },
    {
      username: 'player 4',
      points: 4
    }
  ];
}
