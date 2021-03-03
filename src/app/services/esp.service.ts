import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Esp} from "../models/esp";

@Injectable({
  providedIn: 'root'
})
export class EspService {

  constructor(private http: HttpClient) { }


  public getEsp(): Observable<Esp[]> {
    return this.http.get<Esp[]>('https://www.sleafy.fr/back/esp');
  }

  public addEsp(esp: Esp): Observable<any> {
    return this.http.post('https://www.sleafy.fr/back/esp', esp);
  }

  public updateEsp(esp: Esp): Observable<any> {
    return this.http.put( 'https://www.sleafy.fr/back/esp', esp);
  }

  public deleteEsp(espId: number): Observable<any> {
    return this.http.delete( 'https://www.sleafy.fr/back/esp/' + espId);
  }

  public resetSecretKey(espId: number): Observable<any> {
    return this.http.put( 'https://www.sleafy.fr/back/esp/' + espId + '/reset', null);
  }
}
