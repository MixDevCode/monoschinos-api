import cloudscraper from 'cloudscraper';
import { options } from '../constants';
import { SearchAnimeData } from '../interfaces';
import { load } from 'cheerio';

export async function searchAnime(query: string): Promise<SearchAnimeData[]> {
    try {

        options.uri = 'https://monoschinos2.com/buscar?q=' + query.toLowerCase().replace(/\s+/g, "+");

        const searchData = (await cloudscraper(options)) as string;
        const $ = load(searchData);

        let search: SearchAnimeData[] = []
        if ($('div.col-md-4.col-lg-2.col-6').length > 0) {
            $('div.col-md-4.col-lg-2.col-6').each((i, el) => {
                search.push({
                    title: $(el).find('h3').text(),
                    type: $(el).find('span').text().split(" · ")[0],
                    year: Number($(el).find('span').text().split(" · ")[1]),
                    cover: $(el).find('img').attr('src') as string,
                    url: $(el).find('a').attr('href') as string,
                    id: $(el).find('a').attr('href')?.split('/')[4] as string
                });
            })
        };
        return search;
    } catch {
        return [];
    }
}