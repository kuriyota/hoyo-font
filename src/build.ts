import { fontSplit } from 'cn-font-split';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
const dirname = import.meta.dirname as string;
const filename = import.meta.filename as string;

import { fonts } from './meta.ts';

await fs.mkdir(path.join(dirname, '../fonts'), { recursive: true });
await fs.writeFile(
  path.join(dirname, '../fonts/meta.json'),
  JSON.stringify(
    structuredClone(fonts).map((font) => {
      font.path = undefined as unknown as string;
      return font;
    }),
    null,
    2
  )
);
await fs.writeFile(
  path.join(dirname, '../fonts/index.css'),
  fonts
    .map((font) => {
      return `@import "./${font.name}/index.css";\n`;
    })
    .join('')
);
fonts.map(async (font) => {
  await fs.mkdir(path.join(dirname, `../fonts/${font.name}`), {
    recursive: true
  });
  await fs.copyFile(
    font.path,
    path.join(dirname, `../fonts/${font.name}/index.ttf`)
  );
});
await fs.copyFile(
  path.join(dirname, `../index.html`),
  path.join(dirname, `../fonts/index.html`)
);

if (process.argv.includes('--meta')) {
  process.exit(0);
}

for (const font of fonts.slice(0)) {
  fontSplit({
    input: font.path,
    css: {
      fileName: 'index.css',
      fontFamily: font.name,
      localFamily: [font.name]
    },
    languageAreas: true,
    reduceMins: true,
    reporter: true,
    renameOutputFont: '[hash:6].[ext]',
    outDir: path.join(dirname, `../fonts/${font.name}`)
  });
}
