export interface ArtistsResponse {
  $id: string;
  data: Artists;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  sortColumn: any;
  sortOrder: any;
  filterColumn: any;
  filterQuery: any;
}

export interface Artists {
  $id: string;
  $values: Artist[];
}

export interface Artist {
  $id: string;
  name: string;
  debut: string;
  artistId: number;
  albums: any;
}
