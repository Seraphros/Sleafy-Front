import {Component, OnInit} from '@angular/core';
import {faBars, faInfo, faPlusCircle, faTachometerAlt, faObjectGroup, faSearchPlus, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faBars = faBars;
  faCircle = faCircle;
  faDashboard = faTachometerAlt;
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;
  faInfos = faInfo;
  faStats = faObjectGroup;
  faValue = faSearchPlus;

  date = new Date();

  ESPs = [
    {
      name: 'Salade',
      currentHumidity: '60%',
      currentTemperature: '20°C',
      pastHumidity: [20, 70, 30, 60, 50],
      pastTemperature: [20, 20, 19, 16, 20],
      lastWatering: '26/02 - 16h00',
    },
    {
      name: 'Fraise',
      currentHumidity: '50%',
      currentTemperature: '25°C',
      pastHumidity: [90, 70, 50, 60, 10],
      pastTemperature: [20, 20, 18, 17, 15],
      lastWatering: '26/02 - 16h05',
    }];

  humidityChart = [];
  temperatureChart = [];

  espChosenName = this.ESPs[0].name;
  espChosen = this.ESPs[0];

  expandTable = {
    humidity: true,
    values: true,
    temperature: true,
    meteo: true,
  };

  filters = {
    global: {name: 'Global', active: true, filter: []},
    humidity: {name: 'Humidité', active: false, filter: ['humidity']},
    temperature: {name: 'Temperature', active: false, filter: ['temperature']},
    irrigation: {name: 'Irrigation', active: false, filter: ['irrigation']},
  };

  filtersKey = [];
  filterChosen = 'Global';

  constructor(private router: Router) {
    this.filtersKey = Object.keys(this.filters);
  }

  public async ngOnInit() {
    this.switchESP({value: this.espChosenName});

  }

  public switchESP(item): void {
    this.ESPs.forEach(esp => {
      if (esp.name === item.value) {
        this.espChosen = esp;
      }
    });

    this.humidityChart = new Chart('humidityChart', {
      type: 'line',
      data: {
        labels: ['12h00', '13h00', '14h00', '15h00', '16h00'],
        datasets: [
          {
            label: 'Humidité de la terre',
            borderColor: '#3e95cd',
            fill: false,
            data: this.espChosen.pastHumidity
          }
        ]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: 'Humidité'
        }
      }
    });

    this.temperatureChart = new Chart('temperatureChart', {
      type: 'line',
      data: {
        labels: ['12h00', '13h00', '14h00', '15h00', '16h00'],
        datasets: [
          {
            label: 'Temperature de l\'air',
            borderColor: '#3e95cd',
            fill: false,
            data: this.espChosen.pastTemperature
          }
        ]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: 'Temperature'
        }
      }
    });

    console.log(this.espChosen);
  }

  public isCardCollapsedOrNotDisplayed(card): string[] {
    const classes = [];
    if (card !== 'values' && this.filters.global.active === false) {
      for (const key of Object.keys(this.filters)) {
        if (this.filterChosen === this.filters[key].name) {
          if (!this.filters[key].filter.includes(card)) {
            classes.push('card-hidden');
          }
        }
      }
    }
    if (!this.expandTable[card]) {
      classes.push('cardCollapsed');
    }

    return classes;
  }

  public changeCollapseAll(state): void {
    for (const key of Object.keys(this.expandTable)) {
      this.expandTable[key] = state;
    }
  }

  public changeFilter(): void {
    for (const key of Object.keys(this.filters)) {
      this.filters[key].active = this.filters[key].name === this.filterChosen;
    }
  }
}
