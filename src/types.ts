export type Movie = {
    id: string
    title: string
    description: string
    imagePath: string
    tags: string[]
    year: string
    country: string
    length: string
    rating: number
    reviews: number
    views: string
    likes: string
    downloads: string,
    progress?: number,
    screenshots: string[]
};

export type Nullable<T> = T | null;