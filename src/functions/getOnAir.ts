import cloudscraper from 'cloudscraper';
import { options } from '../constants';
import { SearchAnimeData } from '../interfaces';
import { load } from 'cheerio';

export async function getOnAir(): Promise<SearchAnimeData[]> {
    try {

        options.uri = 'https://monoschinos2.com/emision';

        const onAirMainData = (await cloudscraper(options)) as string;
        const $ = load(onAirMainData);

        let pageCount = Number($('li.page-item').last().prev().text());
        let onAir: SearchAnimeData[] = []

        for (let i = 1; i <= pageCount; i++) {
            options.uri = 'https://monoschinos2.com/emision?p=' + i;
            const onAirData = await cloudscraper(options);
            const $ = load(onAirData);
            if($('div.col-md-4.col-lg-2.col-6').length > 0){
                $('div.col-md-4.col-lg-2.col-6').each((i, el) => {
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