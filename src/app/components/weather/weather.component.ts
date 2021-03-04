import {Component, OnInit} from '@angular/core';
import {faCloud, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {UserInformationService} from '../../services/user-information.service';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  WeatherData: any;
  facloud = faCloud;
  fasun = faSun;
  famoon = faMoon;
  city = 'lille';

  constructor(private userInformationService: UserInformationService) {
  }

  ngOnInit(): void {
    this.userInformationService.getUserInformation().subscribe(result => {
      this.city = result.city;
      this.WeatherData = {
        main: {},
        isDay: true
      };
      this.getWeatherData();
    },
      error => {
        this.WeatherData = {
          main: {},
          isDay: true
        };
        this.getWeatherData();
      });
  }

  getWeatherData(): void {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&appid=0b9d1c80b895cc8fe657d7981acdc5c1&lang=fr')
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
      });
  }

  public setWeatherData(data): void {
    this.WeatherData = data;
    console.log(this.WeatherData);

    const sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    const currentDate = new Date();

    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}
