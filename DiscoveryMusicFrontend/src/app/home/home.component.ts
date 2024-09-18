import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PaginatedAlbumsResponse } from './ApiResponse';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public albumsResponse!: PaginatedAlbumsResponse;
  public totalPages: number[] = [];
  public currentPage: number = 0;
  public pagesToShow: number[] = [];
  public maxVisiblePages: number = 4;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData(this.currentPage);
  }

  getData(page: number) {
    this.http
      .get<PaginatedAlbumsResponse>(
        `/api/Album/GetAlbums?pageSize=40&pageIndex=${page}`,
      )
      .subscribe({
        next: (result) => {
          this.albumsResponse = result;
          this.totalPages = new Array(result.totalPages);
        },
        error: (error) => console.error(error),
      });
  }

  updateVisiblePages() {
    const totalPages = this.albumsResponse.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= this.maxVisiblePages + 1) {
      this.pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
      return;
    }

    const visiblePages: number[] = [];

    for (let i = 1; i <= Math.min(this.maxVisiblePages, totalPages); i++) {
      visiblePages.push(i);
    }

    if (currentPage < totalPages - this.maxVisiblePages) {
      visiblePages.push(-1);
    }

    visiblePages.push(totalPages);

    this.pagesToShow = visiblePages;
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page !== -1) {
      this.currentPage = page;
      this.getData(page);
    }
  }
}
