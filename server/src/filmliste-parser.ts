import { RedisService, RedisKeys } from './redis-service';
import { FilmlisteUtils } from './filmliste-utils';
import { IFilmliste, IFilmlisteArchive } from './interfaces';
import { Utils } from './utils';
import { Entry } from './model';

class FilmlisteManager {
  redisService: RedisService;
  filmlisteArchive: IFilmlisteArchive;

  constructor(filmlisteArchive: IFilmlisteArchive) {
    this.redisService = RedisService.getInstance();
    this.filmlisteArchive = filmlisteArchive;
  }

  async indexFilmliste(filmliste: IFilmliste) {
  }

  async buildArchive(days: number) {
    let date = new Date();
    let end = Math.floor(date.getTime() / 1000);
    date.setDate(date.getDate() - days);
    let begin = Math.floor(date.getTime() / 1000);

    let filmlists = await this.sortFilmlistsDescending(await this.filmlisteArchive.getRange(begin, end));


  }

  async sortFilmlistsDescending(filmlists: IFilmliste[]): Promise<IFilmliste[]> {
    let sorted: { timestamp: number, filmliste: IFilmliste }[] = [];

    for (let i = 0; i < filmlists.length; i++) {
      let timestamp = await filmlists[i].getTimestamp();
      sorted.push({ timestamp: timestamp, filmliste: filmlists[i] });
    }

    sorted.sort((a, b) => b.timestamp - a.timestamp);

    return sorted.map((i) => i.filmliste);
  }

  async update() {

  }
}

async function loop() {
  try {
    let update = await FilmlisteUtils.checkUpdateAvailable();

    if (update.available) {

    }
  } catch (exception) {
    console.error(exception);
  }


  setTimeout(() => loop(), 2000);
}

loop();
