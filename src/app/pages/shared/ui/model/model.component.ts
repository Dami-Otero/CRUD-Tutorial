import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
})
export class ModelComponent {
  @Input() isOpen = false; //controls when model is open or closed
  @Output() closeModel = new EventEmitter(); //notifies when model should be closed

  onCloseModel() {
    this.closeModel.emit(false); //false means model should be closed
  }
}
