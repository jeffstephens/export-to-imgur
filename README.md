## Export to imgur

This is a Chrome extension that is currently a side project for me. It was
created to create imgur albums out of threads on `/wg/` to create curated
wallpaper albums.

I plan to support more sites eventually. **Pull requests are very welcome.**

### Dependencies

This project uses `handlebars.js` for templating. However, Chrome requires templates to be precompiled because on-the-fly compilation requires the use of `eval()` which is insecure in the highly privileged Chrome extension environment.

To precompile the templates, you need to install Handlebars locally. [Instructions are here](http://handlebarsjs.com/precompilation.html). I also found [this blog post](http://www.adamwadeharris.com/how-to-precompile-handlebars-templates/) to be very helpful.

Once it's installed, just run the following command from the repository's root directory:

    handlebars -m templates-src/> js/templates.js

The templates are compiled into a single file, `js/templates.js`, which is included in the extension.

### Building the Extension

Instructions to load an unpacked Chrome extension are available on [Google's documentation website](https://developer.chrome.com/extensions/egetstarted#unpacked). Follow those instructions. That's it.

Eventually I'll publish a version to the Chrome web store.
