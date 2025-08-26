import fs from 'node:fs/promises';
import path from 'node:path';
import { fonts } from './meta.ts';
import { execSync } from 'node:child_process';
const dirname = import.meta.dirname as string;
const filename = import.meta.filename as string;

// for (const font of fonts) {
//   execSync(`ttx -t name ${font.path}`);
//   console.log(font.path);
//   const ttxPath = font.path.replace('.ttf', '.ttx');
//   console.log(
//     `SDK_${font.lang.split('-')[1].toUpperCase()}_WEB`,
//     `${font.name}`
//   );
//   console.log(`${font.name} created`, ttxPath);
// }

for (const font of fonts) {
  const ttxPath = font.path.replace('.ttf', '.ttx');
  execSync(`ttx -m ${font.path} ${ttxPath} -o ${font.path}`);
}
