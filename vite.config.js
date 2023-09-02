import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pxToViewport from 'postcss-px-to-viewport'
import fs from 'node:fs'
import path from 'node:path'

const findStyle = (id, suffix = '.less') => {
  let ext = path.extname(id);
  let stylepath = id.replace(ext, suffix);
  if (fs.existsSync(stylepath)) {
    return stylepath;
  }
  return '';
}

/**
 * @type {import("vite").PluginOption}
 */
const autoImpStyle = {
  name: "autoImpStyle",
  async transform(code, id) {
    if (/\.jsx$/.test(id)) {
      let stylepath = findStyle(id) || findStyle(id, '.css');

      if (stylepath) {
        code = `import "${stylepath}";\n ${code}`;
      }
    }
    return code;
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6001,
    host: '0.0.0.0',
    proxy: {
      "/gapi": {
        target: "http://localhost:8100/",
        rewrite: (path) => path.replace("/gapi", "")
      }
    }
  },
  plugins: [
    react(),
    autoImpStyle
  ],
  css: {
    postcss: {
      plugins: [
        pxToViewport({
          viewportWidth: 375,
          unitPrecision: 4,
          propList: ['*'],
          selectorBlackList: ['.ignore', '.hairlines'],
          minPixelValue: 1,
          mediaQuery: true
        })
      ]
    }
  }
})
