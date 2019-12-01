import {Component} from '@angular/core';

/**
 * The CoreRootComponent class
 * @access public
 * @class
 * @export
 * @name CoreRootComponent
 */
@Component({
  selector: 'core-root',
  template: `
      <router-outlet></router-outlet>`,
  styles: [``]
})
export class CoreRootComponent {

  /**
   * Assigns the defaults
   * @access public
   * @constructor
   */
  public constructor() {
  }
}
