// NG
import { Component, OnInit } from '@angular/core';
// SERVICES
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  constructor(public stateService: StateService) { }

  ngOnInit(): void {
    // First hide this panel (relevant on mobile only)
    this.stateService.isAsidePanelOpen = false;
  }

}
