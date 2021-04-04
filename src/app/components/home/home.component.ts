import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'

import { Prayer } from '../../classes/prayer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  timer: any = "05:40:59";
  miladi: any;
  Prayer: Prayer = new Prayer();
  selector: string = "fajr";
  constructor(private http: HttpClient) {
    this.getPrayers('https://prayertimes.mahmoud.ma/api/69/today');
  }

  ngOnInit(): void {
    setInterval(() => {
      // moment.locale('ar-ma');
      // this.timer = moment().format('LTS');
      // this.miladi =
      //   moment().format('dddd') + ' ' + moment().format(' DD MMM YYYY');
      this.nextPrayer();
    }, 1000);
  }
  getDiff() {}
  getPrayers(ROOT_URL: string): any {
    this.http.get(ROOT_URL).subscribe((data: any) => {
      this.Prayer.fajr = data['fajr'];
      this.Prayer.sunrise = data['sunrise'];
      this.Prayer.dohr = data['dohr'];
      this.Prayer.asr = data['asr'];
      this.Prayer.maghreb = data['maghreb'];
      this.Prayer.ichaa = data['ichaa'];
    });
  }

  nextPrayer() {

    var time = this.timer.split(':');
    var fajr = this.Prayer.fajr.split(':');
    var dohr = this.Prayer.dohr.split(':');
    var asr = this.Prayer.asr.split(':');
    var maghreb = this.Prayer.maghreb.split(':');
    var ichaa = this.Prayer.ichaa.split(':');

    var inttime = parseInt(time[0] + time[1]);
    var intfajr = parseInt(fajr[0] + fajr[1]);
    var intdohr = parseInt(dohr[0] + dohr[1]);
    var intasr = parseInt(asr[0] + asr[1]);
    var intmaghreb = parseInt(maghreb[0] + maghreb[1]);
    var intichaa = parseInt(ichaa[0] + ichaa[1]);

    inttime >= intfajr ? (this.selector = "dohr") : "";
    inttime >= intdohr ? (this.selector = 'asr') : '';
    inttime >= intasr ? (this.selector = 'maghreb') : '';
    inttime >= intmaghreb ? (this.selector = 'ichaa') : '';
    inttime >= intichaa ? (this.selector = 'fajr') : '';


      console.log(this.selector)

    // time[0] < fajr[0] && time[1] < fajr[1] ? console.log('fajr YES') : '';
    // time[0] < dohr[0] && time[1] < dohr[1] ? console.log('dohr YES') : '';
    // time[0] < asr[0] && time[1] < asr[1] ? console.log('asr YES') : '';
    // time[0] < maghreb[0] && time[1] < maghreb[1]? console.log('maghreb YES')
    //   : '';
    // time[0] < ichaa[0] && time[1] < ichaa[1] ? console.log('ichaa YES') : '';
  }
}
