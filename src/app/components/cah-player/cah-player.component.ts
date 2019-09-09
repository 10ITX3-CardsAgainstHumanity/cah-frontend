import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cah-player',
  templateUrl: './cah-player.component.html',
  styleUrls: ['./cah-player.component.scss']
})
export class CahPlayerComponent implements OnInit {

  /**
   * States if the cah player is the czar
   * @access public
   * @property {boolean} isCzar
   * @default  false;
   */
  public isCzar: boolean;

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
    this.isCzar = false;
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {}

}
