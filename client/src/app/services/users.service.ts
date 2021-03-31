import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { UserDetails } from '../models/UserDetails';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public firstStepRegisterCompleted: boolean;
  public userFirstName: string;
  public userDetails: UserDetails;
  public cities: string[];

  constructor(private http: HttpClient) {
    this.firstStepRegisterCompleted = false;
    this.userDetails = new UserDetails();

    this.cities =
      ['Jerusalem', 'Tel Aviv', 'Haifa', 'Ashdod', 'Rishon LeZiyon', 'Petah Tikva', 'BeerSheba', 'Netanya', 'Holon', 'Bnei Brak']
        .sort((a, b) => a == b ? 0 : a < b ? -1 : 1);

    this.userDetails.city = this.cities[0];
  }

  public login(userDetails: UserDetails, id: number): Observable<SuccessfulLoginServerResponse> {
    let loginDetails = id ? { id } : userDetails;
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", loginDetails);
  }

  public logout(token: string): Observable<void> {
    return this.http.post<void>("http://localhost:3001/users/logout", { token });
  }

  public signupValidations(userDetails: UserDetails): Observable<void> {
    return this.http.post<void>("http://localhost:3001/users/validations", userDetails);
  }

  public addUser(userDetails: UserDetails): Observable<void> {
    return this.http.post<void>("http://localhost:3001/users/signup", userDetails);
  }

  public getUserAddress(): Observable<any> {
    return this.http.get<any>("http://localhost:3001/users/address");
  }

  public selectCity(e: any): void {
    this.userDetails.city = e.target.value;
  }
}
