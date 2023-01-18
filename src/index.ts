/**
    This script was made by
    @MixDevCode
 */

import cloudscraper from 'cloudscraper';
import { load } from 'cheerio';

export interface SearchAnimeData {
    title: string
    type: string,
    year: number,
    cover: string,
    url: string
}

export interface AnimeData {
    title: string
    alternative_title: string
    status: string
    cover: string
    synopsis: string
    genres: string[]
    episodes: number
    url: string
}

export interface ChapterData {
    title: string,
    chapter: number,
    type: string,
    cover: string,
    url: string
}

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

let options: cloudscraper.OptionsWithUrl = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Cache-Control': 'private',
        'Referer': 'https://www.google.com/search?q=monoschinos2',
        'Connection': 'keep-alive',
    },
    uri: ""
}

export async function searchAnime(query: string): Promise<SearchAnimeData[]> {
    try {

        options.uri = 'https://monoschinos2.com/buscar?q=' + query.toLowerCase().replace(/\s+/g, "+");

        const searchData = (await cloudscraper(options)) as string;
        const $ = load(searchData);

        let search: SearchAnimeData[] = []
        if ($('body > section:nth-child(4) > div > div > div > div.col-md-4.col-lg-2.col-6').length > 0) {
            $('body > section:nth-child(4) > div > div > div > div.col-md-4.col-lg-2.col-6').each((i, el) => {
                let temp: SearchAnimeData = {
                    title: $(el).find('h3').text(),
                    type: $(el).find('span').text().split(" · ")[0],
                    year: Number($(el).find('span').text().split(" · ")[1]),
                    cover: $(el).find('img').attr('src') as string,
                    url: $(el).find('a').attr('href') as string
                }
                search.push(temp);
            })
        };
        return search;
    } catch {
        return [];
    }
}

export async function getAnimeInfo(animeId: Required<string>): Promise<AnimeData | null> {
    try {

        options.uri = 'https://monoschinos2.com/anime/' + animeId;

        const animeData = (await cloudscraper(options)) as string;
        const $ = load(animeData);

        let aElem = $('body > section:nth-child(4) > div > div > div.acontain > div.row > div > div:nth-child(3) > p.textComplete').children('a').text();
        let animeInfo: AnimeData = {
            title: $('body > section:nth-child(4) > div > div > div.acontain > div.row > div > div:nth-child(1) > h1').text(),
            alternative_title: $('body > section:nth-child(4) > div > div > div.acontain > div.row > div > div:nth-child(1) > span').text(),
            status: $('#btninfo').text(),
            cover: $('body > section:nth-child(4) > div > div > div.herobg > img').attr('src') as string,
            synopsis: $('body > section:nth-child(4) > div > div > div.acontain > div.row > div > div:nth-child(3) > p.textComplete').text().replace(aElem, ""),
            genres: $('body > section:nth-child(4) > div > div > div.acontain > div.row > div > div:nth-child(3) > nav:nth-child(1) > ol > li.breadcrumb-item > a').text().split(/(?=[A-Z])/),
            episodes: Number($('body > section:nth-child(5) > div > div.heromain2 > div.allanimes > div > div.col-item').last().attr('data-episode')),
            url: options.uri
        };

        return animeInfo;

    } catch {
        return null
    }
}

export async function getLatest(): Promise<ChapterData[]> {
    try {

        options.uri = 'https://monoschinos2.com/';

        const chaptersData = (await cloudscraper(options)) as string;
        const $ = load(chaptersData);

        let chapters: ChapterData[] = []
        if($('.col.col-md-6.col-lg-2.col-6').length > 0){
            $('.col.col-md-6.col-lg-2.col-6').each((i, el) => {
                let temp: ChapterData = {
                    title: $(el).find('h2').text(),
                    chapter: Number($(el).find('div.positioning').children('p').text()),
                    type: $(el).find('div.positioning').children('button').text(),
                    cover: $(el).find('div.animeimgdiv').children('img').attr('data-src') as string,
                    url: $(el).find('a').attr('href') as string,
                }
               chapters.push(temp);
            });
        }

        return chapters;

    } catch {
        return [];
    }
}

export async function getOnAir(): Promise<SearchAnimeData[]> {
    try {

        options.uri = 'https://monoschinos2.com/emision';

        const onAirMainData = (await cloudscraper(options)) as string;
        const $ = load(onAirMainData);

        let pageCount = Number($('body > section:nth-child(4) > div > div > div > div.pagination.justify-content-center > nav > ul > li.page-item').last().prev().text());
        let onAir: SearchAnimeData[] = []

        for (let i = 1; i <= pageCount; i++) {
            options.uri = 'https://monoschinos2.com/emision?p=' + i;
            const onAirData = await cloudscraper(options);
            const $ = load(onAirData);
            if($('body > section:nth-child(4) > div > div > div > div.col-md-4.col-lg-2.col-6').length > 0){
                $('body > section:nth-child(4) > div > div > div > div.col-md-4.col-lg-2.col-6').each((i, el) => {
                    let temp: SearchAnimeData = {
                        title: $(el).find('h3').text(),
                        type: $(el).find('span').text().split(" · ")[0],
                        year: Number($(el).find('span').text().split(" · ")[1]),
                        cover: $(el).find('img').attr('data-src') as string,
                        url: $(el).find('a').attr('href') as string
                    }
                    onAir.push(temp);
                });
            }
        }

        return onAir;
        
    } catch {
        return [];
    }
}

export async function getCalendar(): Promise<CalendarData[]> {
    try {

        options.uri = 'https://monoschinos2.com/calendario';

        const calendarData = (await cloudscraper(options)) as string;
        const $ = load(calendarData);
        
        const week = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        let calendar: CalendarData[] = []
        if ($('body > section:nth-child(4) > div > div > div.accordionItem.close').length > 0) {
            $('body > section:nth-child(4) > div > div > div.accordionItem.close').each((i, el) => {
                let temp: CalendarData = {
                    day: week[i],
                    animes: []
                };

                $(el).find('div.col-md-6.col-lg-6.col-sm-12.col-xl-4').each((i2, el2) => {
                    temp.animes.push({
                        title: $(el2).find('h3').text(),
                        chapter: Number($(el2).find('h4').text().replace("Capitulo ", "")),
                        synopsis: $(el2).find('p').text(),
                        cover: $(el2).find('img').attr('data-src') as string,
                        genres: $(el2).find('.seriesbtns > a').text().split(/(?=[A-Z])/)
                    });
                });

                calendar.push(temp);
            });
        };

        return calendar;

    } catch {
        return [];
    }
}