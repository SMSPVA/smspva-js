import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { relative, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root=new URL('../',import.meta.url), directory=fileURLToPath(root);
const require=createRequire(import.meta.url);
const compiler=resolve(require.resolve('typescript/package.json'), '../bin/tsc');
// Clean only these verified build directories inside this package.
for(const name of ['dist','.checks/cjs']) {
  const path=resolve(directory,name), rel=relative(directory,path);
  if(!rel||rel.startsWith('..'))throw new Error('Invalid build path');
  await rm(path,{recursive:true,force:true});
}
const shared={target:'ES2022',module:'NodeNext',moduleResolution:'NodeNext',lib:['ES2022','DOM'],types:[],strict:true,skipLibCheck:true,declaration:true,sourceMap:true,inlineSources:true,forceConsistentCasingInFileNames:true};
await mkdir(new URL('.checks/',root),{recursive:true});
await writeFile(new URL('.checks/esm.json',root),JSON.stringify({compilerOptions:{...shared,rootDir:'../src',outDir:'../dist/esm'},include:['../src/**/*.ts']}));
execFileSync(process.execPath,[compiler,'-p',fileURLToPath(new URL('.checks/esm.json',root))],{stdio:'inherit',windowsHide:true});
await mkdir(new URL('.checks/cjs/',root),{recursive:true});
for(const name of await readdir(new URL('src/',root))) {
  if(!name.endsWith('.ts'))continue;
  const source=(await readFile(new URL('src/'+name,root),'utf8')).replace(/(from\s+['"]\.\/[^'"]+)\.js(['"])/g,'$1.cjs$2');
  await writeFile(new URL('.checks/cjs/'+name.replace(/\.ts$/,'.cts'),root),source);
}
await writeFile(new URL('.checks/cjs.json',root),JSON.stringify({compilerOptions:{...shared,rootDir:'./cjs',outDir:'../dist/cjs'},include:['./cjs/**/*.cts']}));
execFileSync(process.execPath,[compiler,'-p',fileURLToPath(new URL('.checks/cjs.json',root))],{stdio:'inherit',windowsHide:true});
console.log('Built ESM + CommonJS with declarations and source maps.');
