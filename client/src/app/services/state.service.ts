import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';

// MODELS
import { Category } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  public path: string;
  public manageState: string;
  public activeCategory: Category;
  public showSuccessCover: boolean;

  public isAsidePanelOpen: boolean;
  public isLoggedIn: boolean;
  public isSearching: boolean;
  public isOrdering: boolean;
  public isOrderCompleted: boolean;
  public isShowModal: boolean;
  public isMobileScreen: boolean;

  @HostListener('window:resize', ['$event'])
  public getScreenSize(event?) {
    window.innerWidth < 600
      ? this.isMobileScreen = true
      : this.isMobileScreen = false;
  }

  constructor(private http: HttpClient) {
    this.path = '';
    this.manageState = 'none'
    this.showSuccessCover = false;

    this.isAsidePanelOpen = true;
    this.isSearching = false;
    this.isOrdering = false;
    this.isOrderCompleted = false;
    this.isShowModal = false;
    this.isLoggedIn = false;

    this.getScreenSize();
  }

  public getMarketState(): Observable<any> {
    return this.http.get("http://localhost:3001/market");
  }

  public setSuccessCoverClass(): {} {
    let classes = {
      'success-aside-cover': true,
      show: this.showSuccessCover
    }
    return classes;
  }

  public setIconClass(): {} {
    let classes = {
      fas: true,
      'fa-caret-left': this.isAsidePanelOpen,
      'fa-caret-right': !this.isAsidePanelOpen
    }
    return classes;
  }
}
