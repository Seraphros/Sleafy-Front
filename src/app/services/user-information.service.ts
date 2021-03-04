import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInformation} from '../models/userInformation';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private http: HttpClient) { }


  getUserInformation(): Observable<UserInformation> {
    return this.http.get<UserInformation>('https://www.sleafy.fr/back/user');
  }

  addCity(city: string): Observable<UserInformation> {
    return this.http.post<UserInformation>('https://www.sleafy.fr/back/user', null, {
      params: {
        city
      }
    });
  } ;
}
