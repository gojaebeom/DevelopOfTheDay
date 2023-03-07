import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IModalState, ModalHandlerService } from 'src/app/services/modal-handler.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.container.html'
})
export class ModalContainer implements OnInit{

  modal$!:Observable<IModalState>;

  constructor(
    private readonly handler: ModalHandlerService
  ) {}

  ngOnInit(): void {
    this.modal$ = this.handler.getState();
  }

  onClose() {
    this.handler.close();
  }
}
