import cloudscraper from 'cloudscraper';
import { options } from '../constants';
import { AnimeData } from '../interfaces';
import { load } from 'cheerio';

export async function getAnimeInfo(animeId: string): Promise<AnimeData | null> {
    try {

        options.uri = 'https://monoschinos2.com/anime/' + animeId;

        const animeData = (await cloudscraper(options)) as string;
        const $ = load(animeData);

        let aElem = $('p.textComplete').children('a').text();
        let animeInfo: AnimeData = {
            title: $('.chapterdetails > h1').text(),
            alternative_title: $('span.alterno').text(),
            status: $('#btninfo').text(),
            release_date: $('ol.breadcrumb').eq(1).find('li.breadcrumb-item').text(),
            cover: $('.herobg > img').attr('src') as string,
            synopsis: $('p.textComplete').text().replace(aElem, ""),
            genres: $('ol.breadcrumb').eq(0).find('li.breadcrumb-item').text().split(/(?=[A-Z])/),
            episodes: [],
            url: options.uri
        };
        $('.allanimes > div > div').each((i, el) => {
            animeInfo.episodes.push({
                number: Number($(el).attr('data-episode')),
                cover: $(el).find('.animeimghv').attr('data-src') as string,
                url: $(el).children().attr('href') as string
            })
        })

        return animeInfo;

    } catch {
        return null
    }
}