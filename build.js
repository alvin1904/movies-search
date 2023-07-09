const esbuild = require('esbuild');
const fs = require('fs-extra');

esbuild
  .build({
    entryPoints: ['./app.js'],
    bundle: true,
    outfile: 'dist/app.js',
    minify: true,
    sourcemap: true,
    loader: {
      '.html': 'text',
      '.css': 'text',
    },
  })
  .then(() => {
    // Copy required assets to the output directory
    fs.copySync('./index.html', './dist/index.html');
    fs.copySync('./style.css', './dist/style.css');
    fs.copySync('./movie_default.jpg', './dist/movie_default.jpg');
    console.log('Build complete!');
  })
  .catch((err) => {
    console.error('Build failed:', err);
    process.exit(1);
  });
