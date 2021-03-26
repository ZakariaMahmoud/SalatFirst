import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  readonly ROOT_URL = 'https://backend.menara.ma/api/prayers/82/3/';
  prayers: any;
  constructor(private http: HttpClient) {}



  getPrayers() {
     this.http.get(this.ROOT_URL).subscribe(
      (data) => {
        console.log(data);
        this.prayers= data;
      },
      (err) => {
        console.log(err);
      }
    );


  }
}
