var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    assets = require('metalsmith-assets'),
    watch = require('metalsmith-watch');

var siteBuild = metalsmith(__dirname)
    .metadata({
        site: {
            title: 'Site Title',
            url: 'https://example.com'
        }
    })
    .source('./src')
    .destination('./build')
    .use(assets({
        source: './src/assets',
        destination: './assets'
    }))
    .use(markdown())
    .use(layouts({
        engine: "handlebars",
        directory: "./layouts"
    }))
    .use(watch({
        paths: {
            "${source}/**/*": true,
            "layouts/**/*": "**/*",
        }
    }))
    .build(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Site build complete!');
        }
    });