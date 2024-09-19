import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatedAlbumsResponse } from './ApiResponse';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../identity/service';

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
  isAdmin: boolean = false;
  deleteSuccess: boolean = false;
  albumId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getData(this.currentPage);
    this.authService.isAdmin().forEach((state: boolean) => {
      this.isAdmin = state;
    });
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

  openDeleteModal(albumId: string) {
    this.albumId = albumId;
    const deleteModal: HTMLDialogElement | null =
      document.querySelector('#deleteModal');
    if (deleteModal) {
      deleteModal.showModal();
    }
  }

  confirmDelete() {
    if (this.albumId) {
      this.handleDelete(this.albumId);
      this.albumId = null;
      const deleteModal: HTMLDialogElement | null =
        document.querySelector('#deleteModal');
      if (deleteModal) {
        deleteModal.close();
      }
    }
  }

  handleDelete(id: string) {
    this.http
      .delete(`/api/Album/DeleteAlbum/${id}`, {
        withCredentials: true,
        observe: 'response',
      })
      .subscribe({
        next: (result) => {
          this.deleteSuccess = result.ok;
        },
        error: () => {
          this.deleteSuccess = false;
        },
      });
  }
}
