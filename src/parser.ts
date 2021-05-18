import { Lyric } from './interfaces/Lyric';

const parser = {
  parseLyricFile: (lyricFileData: string): Lyric[] => {
    if (!lyricFileData) {
      throw new Error('Missing file data');
    }

    const lyrics: Lyric[] = JSON.parse(lyricFileData);
    if (!lyrics) {
      throw new Error('Invalid data');
    }

    return lyrics;
  },

  exposeParserToWindow: (): void => {
    // Expose parser to window for convenience
    Object.defineProperty(window, '_parser', {
      value: parser,
    });
  },
};

export default parser;
