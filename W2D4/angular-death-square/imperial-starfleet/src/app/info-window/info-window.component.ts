import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {

  dataBanks: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.forEach(param => {
      this.findTurret(param.id);
    });
  }

  findTurret(turretNumber) {
    this.http.get(`http://localhost:3000/api/turret/${turretNumber}`)
      .toPromise()
      .then((res: any) => this.dataBanks = res);
  }

}
