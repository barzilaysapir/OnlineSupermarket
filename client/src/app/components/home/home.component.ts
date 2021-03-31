// NG
import { Component } from '@angular/core';
// SERVICES
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(public stateService: StateService) { }

}
