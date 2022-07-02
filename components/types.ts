export interface Entities {
    Search?: SearchEntity[];
    totalResults: string;
    Response: string;
}
export interface SearchEntity {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
