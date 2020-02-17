import {Component, OnInit} from '@angular/core';

/**
 * The AppComponent class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
  }

  /**
   * @access public
   * @return {void}
   */
  public ngOnInit(): void {
  }

}
