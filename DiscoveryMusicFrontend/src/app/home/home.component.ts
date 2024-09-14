import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PaginatedAlbumsResponse } from './ApiResponse';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public albumsResponse!: PaginatedAlbumsResponse;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    var url = environment.baseUrl;
    this.http.get<any>(url + '/api/Album/GetAlbums').subscribe({
      next: (result) => {
        this.albumsResponse = result;
      },
      error: (error) => console.error(error),
    });
  }
}
