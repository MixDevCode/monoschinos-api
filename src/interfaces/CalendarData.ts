export interface CalendarData {
    day: string
    animes: Array<
        {
            title: string,
            chapter: number,
            synopsis: string,
            cover: string,
            genres: string[]
        }
    >
}