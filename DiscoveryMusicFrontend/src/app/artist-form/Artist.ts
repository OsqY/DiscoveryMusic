export interface Artist {
  name: string;
  debut: string;
  albumId: number;
}

export interface ArtistToEdit {
  $id: string;
  name: string;
  debut: string;
  artistId: number;
  albums: any;
}
