import cloudscraper from 'cloudscraper';
import { options } from '../constants';
import { ChapterData } from '../interfaces';
import { load } from 'cheerio';

export async function getLatest(): Promise<ChapterData[]> {
    try {

        options.uri = 'https://monoschinos2.com/';

        const chaptersData = (await cloudscraper(options)) as string;
        const $ = load(chaptersData);

        let chapters: ChapterData[] = []
        if($('.col.col-md-6.col-lg-2.col-6').length > 0){
            $('.col.col-md-6.col-lg-2.col-6').each((i, el) => {
                chapters.push({
                    title: $(el).find('h2').text(),
                    chapter: Number($(el).find('div.positioning').children('p').text()),
                    type: $(el).find('div.positioning').children('button').text(),
                    cover: $(el).find('div.animeimgdiv').children('img').attr('data-src') as string,
                    url: $(el).find('a').attr('href') as string
                });
            });
        }

        return chapters;

    } catch {
        return [];
    }
}