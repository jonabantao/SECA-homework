import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  weather: any;
  searchSubject = new Subject();

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(zip => {
          this.searchService.createAPIObservable(zip)
            .subscribe(res => this.weather = res);
        }
      );
  }

  findWeather(zip) {
    this.searchSubject.next(zip);
  }
}
