import { Component, OnInit } from '@angular/core';
import { faBars, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  faBars = faBars;
  faCircle = faCircle;

  title: string;
  date: Date = new Date();

  public onRouterOutletActivate(event: any): void {
    this.title = event.title;
    console.log(event);
  }

}
