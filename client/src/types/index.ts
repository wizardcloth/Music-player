export interface Song{
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    ImageUrl: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album{
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    Songs: Song[];
    createdAt: string;
    updatedAt: string;
}



