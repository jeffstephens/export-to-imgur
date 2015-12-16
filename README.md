## Export to imgur

This is a Chrome extension that is currently a side project for me. It was
created to create imgur albums out of threads on `/wg/` to create curated
wallpaper albums.

I plan to support more sites eventually. **Pull requests are very welcome.**

### Dependencies

#### Templating with Handlebars.js

This project uses `handlebars.js` for templating. However, Chrome requires templates to be precompiled because on-the-fly compilation requires the use of `eval()` which is insecure in the highly privileged Chrome extension environment.

To precompile the templates, you need to install Handlebars locally. [Instructions are here](http://handlebarsjs.com/precompilation.html). I also found [this blog post](http://www.adamwadeharris.com/how-to-precompile-handlebars-templates/) to be very helpful.

Once it's installed, just run the following command from the repository's root directory:

    handlebars -m templates-src/> js/templates.js

The templates are compiled into a single file, `js/templates.js`, which is included in the extension.

#### Stylesheets in LESS

This project uses `LESS` for stylesheets to describe styles more expressively and efficiently than traditional `CSS`. However, it requires an extra step to compile to `CSS` so that it can be interpreted by browsers.

Instructions are available on [the LESS website](http://lesscss.org/#using-less). My preference is to use [LiveReload](http://livereload.com/) to compile the `LESS` to `CSS` on every file change.

#### CoffeeScript

This project uses [CoffeeScript](http://coffeescript.org/) because it's way easier to write and read than plain Javascript. Compilation instructions are listed on their website, but I prefer to use [LiveReload](http://livereload.com/) to compile the CoffeeScript to Javascript on every file change.

#### Unit Tests with Mocha and Chai

This project uses the [Mocha testing framework](https://mochajs.org/) with the [Chai assertion library](http://chaijs.com/).

They will be automatically installed if you run the following command in the project root directory:

    npm install

To run the test suite, just run

    mocha

### Building the Extension

Instructions to load an unpacked Chrome extension are available on [Google's documentation website](https://developer.chrome.com/extensions/getstarted#unpacked). Follow those instructions. That's it.

Eventually I'll publish a version to the Chrome web store.
