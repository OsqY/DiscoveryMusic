export interface AlbumResponse {
  $id: string;
  album: Album;
  artist: Artist;
  comments: Comments;
}

export interface Album {
  $id: string;
  id: number;
  name: string;
  releaseDate: string;
  artistId: number;
  songs: any;
}

export interface Artist {
  $id: string;
  name: string;
  debut: string;
  artistId: number;
  albums: any;
}

export interface Comments {
  $id: string;
  $values: Value[];
}

export interface Value {
  $id: string;
  id: number;
  content: string;
  rating: number;
  albumId: number;
  username: string;
  userId: string;
}
