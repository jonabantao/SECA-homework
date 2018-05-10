import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  weather: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  findWeather(zip) {
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},\
    us&appid=052f26926ae9784c2d677ca7bc5dec98`)
      .toPromise()
      .then((res: any) => this.weather = res)
      .catch(() => console.error('Zipcode not found!'));
  }
}
