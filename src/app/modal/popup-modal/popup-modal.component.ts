import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './popup-modal.component.html',
})
export class PopupModalComponent {
  constructor() {}

  @Input() popupText: String = '';
  @Input() backgroundColor: string = '';
}
