import {Component, OnInit} from '@angular/core';
import {faBars, faInfo, faPlusCircle, faTachometerAlt, faObjectGroup, faSearchPlus, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import {EspService} from '../../services/esp.service';
import {Esp} from '../../models/esp';
import {Reading} from '../../models/reading';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';


  faBars = faBars;
  faCircle = faCircle;
  faDashboard = faTachometerAlt;
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;
  faInfos = faInfo;
  faStats = faObjectGroup;
  faValue = faSearchPlus;

  date = new Date();

  ESPs: Esp[] = [];


  espChosenName;
  espChosen;

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

  humidityChart = [];
  humidityChartData = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Humidité de la terre',
          borderColor: '#3e95cd',
          fill: false,
          data: [],
        }
      ]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: 'Humidité'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: 'MM/DD/YYYY HH:mm',
            // round: 'day'
            tooltipFormat: 'll HH:mm'
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
      }
    }
  };

  temperatureChart = [];
  temperatureChartData = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Temperature de l\'air',
          borderColor: '#3e95cd',
          fill: false,
          data: []
        }
      ]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: 'Temperature'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: 'MM/DD/YYYY HH:mm',
            // round: 'day'
            tooltipFormat: 'll HH:mm'
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
      },
    }
  };

  temperatureLastValue = 'Pas de donnée';
  temperatureLastValueTime = '';
  humidityLastValue = 'Pas de donnée';
  humidityLastValueTime = '';


  constructor(private router: Router,
              private espService: EspService) {
    this.filtersKey = Object.keys(this.filters);
  }

  public ngOnInit(): void {
    this.espService.getEsp().subscribe(data => {
      this.ESPs = data;
      this.espChosenName = this.ESPs[0].name;
      this.espChosen = this.ESPs[0];
      this.switchESP({value: this.espChosenName});
    });
  }

  public switchESP(item): void {
    this.ESPs.forEach(esp => {
      if (esp.name === item.value) {
        this.espChosen = esp;
        this.espService.retrieveEspHumidity(esp.id, 20).subscribe(dataHumidity => {
          const humidityValue = [];
          const humidityTime = [];
          const dataReadHumidity: Reading[] = dataHumidity;
          if (dataReadHumidity != null) {
            dataReadHumidity.forEach(reading => {
              humidityValue.push(reading.value);
              humidityTime.push(new Date(reading.time));
            });
            this.humidityLastValue = dataReadHumidity[0].value + ' %';
            this.humidityLastValueTime =  '' + dataReadHumidity[0].time;
            this.humidityChartData.data.datasets[0].data = humidityValue;
            this.humidityChartData.data.labels = humidityTime;
            this.humidityChart = new Chart('humidityChart', this.humidityChartData);
          } else {
            this.humidityLastValue = 'Pas de donnée';
            this.humidityLastValueTime = '';
            this.humidityChartData.data.datasets[0].data = [];
            this.humidityChartData.data.labels = [];
            this.humidityChart = new Chart('humidityChart', this.humidityChartData);
          }
        });
        this.espService.retrieveEspTemperature(esp.id, 20).subscribe(dataTemperature => {
          const temperatureValue = [];
          const temperatureTime = [];
          const dataReadTemperature: Reading[] = dataTemperature;
          if (dataReadTemperature != null) {
            dataReadTemperature.forEach(reading => {
              temperatureValue.push(reading.value);
              temperatureTime.push(new Date(reading.time));
            });
            this.temperatureLastValue = dataReadTemperature[0].value + ' °C';
            this.temperatureLastValueTime = '' + dataReadTemperature[0].time;
            this.temperatureChartData.data.datasets[0].data = temperatureValue;
            this.temperatureChartData.data.labels = temperatureTime;
            this.temperatureChart = new Chart('temperatureChart', this.temperatureChartData);
          } else {
            this.temperatureLastValue = 'Pas de donnée';
            this.temperatureLastValueTime = '';
            this.temperatureChartData.data.datasets[0].data = [];
            this.temperatureChartData.data.labels = [];
            this.temperatureChart = new Chart('temperatureChart', this.temperatureChartData);
          }
        });
      }
    });
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
