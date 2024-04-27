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
        if($('body > div.container.mt-3 > section:nth-child(2) > ul > li').length > 0){
            $('body > div.container.mt-3 > section:nth-child(2) > ul > li').each((i, el) => {
                chapters.push({
                    title: $(el).find('h2').text() as string,
                    chapter: Number($(el).find('a').children('div').children('span').text()),
                    type: $(el).find('.my-1').text(),
                    cover: $(el).find('div.position-relative.overflow-hidden').children('img').attr('data-src') as string,
                    url: $(el).find('a').attr('href') as string
                });
            });
        }

        return chapters;

    } catch {
        return [];
    }
}