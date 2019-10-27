import {Component, OnInit} from '@angular/core';

/**
 * The CoreRootComponent class
 * @access public
 * @class
 * @export
 * @implements OnInit
 * @name CoreRootComponent
 */
@Component({
  selector: 'core-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class CoreRootComponent implements OnInit {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {}

  /**
   * @inheritDoc
   * @access public
   * @return {}
   */
  public ngOnInit() {}

}
