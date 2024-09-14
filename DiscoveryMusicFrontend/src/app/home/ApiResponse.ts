export interface Album {
  id: number;
  name: string;
  releaseDate: string;
  imageUrl: string | null;
  artistId: number;
  artist: any | null;
  songs: {
    $id: string;
    $values: Song[];
  };
  createdDate: string;
  lastModifiedDate: string;
}

export interface AlbumsData {
  $id: string;
  $values: Album[];
}

export interface PaginatedAlbumsResponse {
  $id: string;
  data: AlbumsData;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  sortColumn: string | null;
  sortOrder: string | null;
  filterColumn: string | null;
  filterQuery: string | null;
}

export interface Song {}
