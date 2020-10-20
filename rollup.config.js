import { readFileSync } from 'fs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import { createFilter } from '@rollup/pluginutils';
import sass from 'sass';

const dewsSamplePlugin = () => {
  const htmlDoc = readFileSync('src/index.html').toString();
  return {
    name: 'dewsSamplePlugin',
    generateBundle() {
      // index.html 생성
      this.emitFile({ type: 'asset', fileName: 'index.html', source: htmlDoc });
    },
  };
};
export function html({ include = ['**/*.html'], exclude } = {}) {
  const filter = createFilter(include, exclude);
  const importDeclaration = "import { html } from 'lit-html';";

  return {
    name: 'lit-html',
    transform(html, id) {
      // html 파일 여부 판단 아닐경우 리턴
      if (id.slice(-5) !== '.html') return null;
      if (!filter(id)) return null;

      // 출력 을 원하는 형태로 변경
      const output = `html\`${html}\`;`;
      const code = `${importDeclaration}\n export default function(){ \n return ${output}}; `;
      const map = { mappings: '' };
      return { code, map };
    },
  };
}

export function scss({ include = ['**/*.scss'], exclude } = {}) {
  const filter = createFilter(include, exclude);
  const importDeclaration = "import { css } from 'lit-element';";
  return {
    name: 'lit-scss',
    transform(scss, id) {
      // scss 파일 여부 판단 아닐경우 리턴
      if (id.slice(-5) !== '.scss') return null;
      if (!filter(id)) return null;

      // 출력 을 원하는 형태로 변경

      const result = sass.renderSync({ data: scss });
      const output = `css\`${result.css.toString()}\`;`;
      const code = `${importDeclaration}\n export default ${output}; `;
      const map = { mappings: '' };
      return { code, map };
    },
  };
}

export default [
  {
    // main 번들링
    input: 'src/index.ts',
    plugins: [
      dewsSamplePlugin(),
      typescript({ include: '**/*.ts', tsconfig: 'tsconfig.json' }),
      scss({ output: false, include: ['**/*.scss'] }),
      html(),
      nodeResolve(),
    ],
    output: {
      dir: 'dist',
      entryFileNames: 'js/dews-mobile.js',
      format: 'es',
    },
  },
];
