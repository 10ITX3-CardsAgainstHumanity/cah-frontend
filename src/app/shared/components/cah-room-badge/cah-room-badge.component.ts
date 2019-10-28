import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'cah-room-badge',
  templateUrl: './cah-room-badge.component.html',
  styleUrls: ['./cah-room-badge.component.scss']
})
export class CahRoomBadgeComponent implements OnInit {

  /**
   * The form of the room badge
   * @access public
   * @property {FormGroup} form
   */
  public form: FormGroup;

  /**
   * Assigns the defaults
   * @access public
   * @param  {FormBuilder}    _fb
   * @param  {ActivatedRoute} _route
   * @constructor
   */
  public constructor(private readonly _fb: FormBuilder,
                     private readonly _route: ActivatedRoute) {
    this._buildForm();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.form.setValue({roomId: params.get('id')});
    });
  }

  /**
   * Builds the form
   * @access private
   * @return {void}
   */
  private _buildForm(): void {
    this.form = this._fb.group({
      roomId: ['']
    });
  }
}
