import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArtistsResponse } from './ArtistsResponse';
import { RouterLink } from '@angular/router';
import { AuthService } from '../identity/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss',
})
export class ArtistsComponent implements OnInit {
  artistsResponse!: ArtistsResponse;
  public totalPages: number[] = [];
  public currentPage: number = 0;
  public pagesToShow: number[] = [];
  public maxVisiblePages: number = 4;
  isAdmin: boolean = false;
  deleteSuccess: boolean = false;
  artistId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.onRoleChanged().forEach((state: boolean) => {
      this.isAdmin = state;
    });
    this.getArtists(this.currentPage);
  }

  getArtists(page: number) {
    this.http
      .get<ArtistsResponse>(
        `/api/Artist/GetArtists?PageSize=30&PageIndex=${page}`,
      )
      .subscribe({
        next: (result) => {
          this.artistsResponse = result;
        },
        error: (error) => console.error(error),
      });
  }

  updateVisiblePages() {
    const totalPages = this.artistsResponse.totalPages;
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
      this.getArtists(page);
    }
  }

  openDeleteModal(artistId: string) {
    this.artistId = artistId;
    const deleteModal: HTMLDialogElement | null =
      document.querySelector('#deleteModal');
    if (deleteModal) {
      deleteModal.showModal();
    }
  }

  confirmDelete() {
    if (this.artistId) {
      this.handleDelete(this.artistId);
      this.artistId = null;
      const deleteModal: HTMLDialogElement | null =
        document.querySelector('#deleteModal');
      if (deleteModal) {
        deleteModal.close();
      }
    }
  }

  handleDelete(artistId: string) {
    this.http
      .delete(`/api/Artist/DeleteArtist/${artistId}`, { observe: 'response' })
      .subscribe({
        next: (result) => (this.deleteSuccess = result.ok),
        error: () => (this.deleteSuccess = false),
      });
  }
}
