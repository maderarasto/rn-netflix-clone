export type Movie = {
    id: string
    title: string
    description: string
    imagePath: string
    tags: string[]
    rating: number
    reviews: number
    views: string
    likes: string
    downloads: string,
    progress?: number
}