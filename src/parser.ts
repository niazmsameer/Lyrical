import { Lrc, Lyric } from 'lrc-kit';

// Wrapper object for LRCKit
const parser = {
  parseLRCFile: (fileData: string): Lyric[] => {
    const lyricData = Lrc.parse(fileData);
    if (lyricData.lyrics) return lyricData.lyrics;
  },
};

export default parser;