export interface AnimeData {
    title: string
    alternative_title: string
    status: string
    release_date: string
    cover: string
    synopsis: string
    genres: string[]
    episodes: EpisodeType[]
    url: string
}

export type EpisodeType = {
    number: number
    cover: string
    url: string
}