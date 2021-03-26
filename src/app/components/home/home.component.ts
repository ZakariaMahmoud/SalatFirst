import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  readonly ROOT_URL = 'https://backend.menara.ma/api/prayers/82/3/';
  prayers: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getPrayers() {
    this.prayers = this.http.get(this.ROOT_URL);

    console.log(this.prayers)
  }
}
