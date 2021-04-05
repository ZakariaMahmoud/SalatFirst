import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Prayer } from '../../classes/prayer';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  timer: any = '--:--:--';
  miladi: any;
  countDownDate: any;
  difTime: string = '--:--:--';
  Prayer: Prayer = new Prayer();
  selector: string = 'fajr';
  next_prayer: Array<any> = [];
  constructor(private http: HttpClient) {
    this.getPrayers('https://prayertimes.mahmoud.ma/api/69/today');
  }

  ngOnInit(): void {
    setInterval(() => {
      moment.locale('ar-ma');
      this.timer = moment().format('LTS');
      this.miladi =
        moment().format('dddd') + ' ' + moment().format(' DD MMM YYYY');
      this.nextPrayer();
    }, 1000);
  }

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

    inttime >= intfajr ? (this.selector = 'dohr') : '';
    inttime >= intdohr ? (this.selector = 'asr') : '';
    inttime >= intasr ? (this.selector = 'maghreb') : '';
    inttime >= intmaghreb ? (this.selector = 'ichaa') : '';
    inttime >= intichaa ? (this.selector = 'fajr') : '';

    this.next_prayer = this.Prayer.nextPrayer(this.selector);

    this.countDiffPrayer();
  }

  countDiffPrayer() {
    var time = this.timer.split(':');

    var ichaa = this.Prayer.ichaa.split(':');

    var today = new Date();
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    if (time[0] >= ichaa[0] && time[1] >= ichaa[1]) {
      this.countDownDate = new Date(
        tomorrow.getMonth() +
          1 +
          '/' +
          tomorrow.getDate() +
          '/' +
          tomorrow.getFullYear() +
          ' ' +
          this.next_prayer[0]
      ).getTime();
    } else {
      this.countDownDate = new Date(
        today.getMonth() +
          1 +
          '/' +
          today.getDate() +
          '/' +
          today.getFullYear() +
          ' ' +
          this.next_prayer[0]
      ).getTime();
    }

    var now = new Date().getTime();
    var distance = this.countDownDate - now;

    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var h = hours < 10 ? '0' + hours : hours;
    var m = minutes < 10 ? '0' + minutes : minutes;
    var s = seconds < 10 ? '0' + seconds : seconds;

    this.difTime = h + ' : ' + m + ' : ' + s;
  }
}
