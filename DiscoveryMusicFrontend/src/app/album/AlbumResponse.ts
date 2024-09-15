export interface AlbumResponse {
  $id: string
  id: number
  name: string
  releaseDate: string
  imageUrl: any
  artistId: number
  artist: Artist
  songs: Songs2
  createdDate: string
  lastModifiedDate: string
}

export interface Artist {
  $id: string
  id: number
  name: string
  debut: string
  imageUrl: any
  createdDate: string
  lastModifiedDate: string
  albums: Albums
  songs: Songs
}

export interface Albums {
  $id: string
  $values: Value[]
}

export interface Value {
  $ref: string
}

export interface Songs {
  $id: string
  $values: any[]
}

export interface Songs2 {
  $id: string
  $values: any[]
}

