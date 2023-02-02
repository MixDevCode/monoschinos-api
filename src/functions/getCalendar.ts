import cloudscraper from 'cloudscraper';
import { options } from '../constants';
import { CalendarData } from '../interfaces';
import { load } from 'cheerio';

export async function getCalendar(): Promise<CalendarData[]> {
    try {

        options.uri = 'https://monoschinos2.com/calendario';

        const calendarData = (await cloudscraper(options)) as string;
        const $ = load(calendarData);
        
        const week = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        let calendar: CalendarData[] = []
        if ($('div.accordionItem.close').length > 0) {
            $('div.accordionItem.close').each((i, el) => {
                let temp: CalendarData = {
                    day: week[i],
                    animes: []
                };

                $(el).find('div.col-md-6.col-lg-6.col-sm-12.col-xl-4').each((i, el) => {
                    temp.animes.push({
                        title: $(el).find('h3').text(),
                        chapter: Number($(el).find('h4').text().replace("Capitulo ", "")),
                        synopsis: $(el).find('p').text(),
                        cover: $(el).find('img').attr('data-src') as string,
                        genres: $(el).find('.seriesbtns > a').text().split(/(?=[A-Z])/)
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