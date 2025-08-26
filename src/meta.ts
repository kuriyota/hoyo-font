import fs from 'node:fs/promises';
import path from 'node:path';
const dirname = import.meta.dirname as string;
const filename = import.meta.filename as string;

const fontFiles = fs.glob(path.join(dirname, '../raw-fonts/*.ttf'));

const fonts = [] as {
  name: string;
  game: string;
  lang: string;
  path: string;
  css?: string;
}[];

for await (const fontPath of fontFiles) {
  const name = path.basename(fontPath, '.ttf');
  const game = name.split('_')[0];
  const lang = name.split('_')[1];
  fonts.push({ name, game, lang, path: fontPath });
}

export { fonts };
