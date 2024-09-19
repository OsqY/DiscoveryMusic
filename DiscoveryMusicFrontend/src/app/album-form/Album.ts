export interface Album {
  id: number;
  name: string;
  releaseDate: string;
  artistId: number;
  songs: Song[];
}

export interface Song {
  name: string;
  releaseDate: string;
  albumId: number;
}

export interface Artists {
  $id: string;
  data: Data;
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

export interface Data {
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
