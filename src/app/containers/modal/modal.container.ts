import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IModalState, ModalHandlerService } from 'src/app/services/UI/modal-handler.service';

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
