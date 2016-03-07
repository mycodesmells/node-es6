# Running Node.JS with ES6 features

Once you start working with the coolest features of ES6, it's really hard to go back. Being a full-stack JS developer, you obviously want to use them in your Node back-end as well. You might have heard that ES6 is supported from Node 4, but this is not quite true. This post explains how to run your app, to utilize everything that ES6 has to offer.

### Simple app in ES5 style

Our example application sets up a small HTTP server using `express` - we just read some path parameters and print an information JSON for those params, as well as some arbitrary data. We want to make sure that the JSON is built correctly, even if some data is missing:

    'use strict';
    var express = require('express');
    let app = express();

    app.get('/', (req, res) => res.end('Root page'));

    app.get('/items/:itemId/subitems/:subitemId', (req, res) => {
        let itemId = req.params.itemId,
            subItemId = req.params.subitemId,
            empty = req.params.emptyParam;

        res.json(getDetails(itemId, subItemId, empty, ['app-name', '1.0.0']));
    });

    app.listen(3000, () => console.log('App has started'));

    function getDetails(itemId, subitemId, emptyP, extras) {
        let _itemId = typeof itemId !== 'undefined' ? itemId : -1;
        let _subitemId = typeof subitemId !== 'undefined' ? subitemId : -1;
        let empty = typeof emptyP !== 'undefined' ? emptyP : -1;
        let appName = extras[0];
        let appVer = extras[1];

        return {
            title: 'Subitem page',
            details: `Item: ${_itemId}, Subitem: ${_subitemId}`,
            empty,
            app: `${appName} v.${appVer}`
        };
    }

As you can see, there are a couple of places, where you can really improve the readability of the code. It's annoying to extract all parameters manually, or to write verbose checks for the paramters of `getDetails` method. Finally, it's hard to understand the `extras` parameter by function definition, without going into details by looking on its body. We know we can do better.

### Same code, ES6 style

Look how easy the code in ES6 looks:

    import express from 'express';
    let app = express();

    app.get('/', (req, res) => res.end('Root page'));

    app.get('/items/:itemId/subitems/:subitemId', (req, res) => {
        let {itemId, subItemId, empty} = req.params;

        res.json(getDetails(itemId, subItemId, empty, ['app-name', '1.0.0']));
    });

    app.listen(3000, () => console.log('App has started'));

    function getDetails(itemId = -1, subitemId = -1, empty = -1, [appName, appVer]) {
        return {
            title: 'Subitem page',
            details: `Item: ${itemId}, Subitem: ${subitemId}`,
            empty,
            app: `${appName} v.${appVer}`
        };
    }

Problem is, that if we want to run that last code with Node v.4, it will scream on the top of its console voice, pointing out that:

- you cannot use _import_,
- you cannot use _let_ outside strict mode (yeah, this is not _that_ bad),
- cannot use _variable or parameter desctructuring_,
- cannot use _default parameter values_

### Solution - npm script

The solution is very simple, yet powerful - use Babel! Now you can do it two ways: transpile it within your command, or by creating an entry point script.

To do the first, you need to install Babel CLI and ES2015 preset to your devDependencies:

    npm install --save-dev babel-cli babel-preset-es2015

And then add a `script` attribute in your `package.json`:

    ...
    "scripts": {
        "start": "babel-node server-es6.js --presets es2015"
    },
    ...
    
That way you can start your server by typing:

    npm start


### Solution - enttry point

The second way requires you to install another tool alongside presets - `babel-register`:

    npm install --save dev babel-register babel-preset-es2015
    
Then you need to create two files. First is the aformentioned entry point:

    // app.js
    require('babel-register');
    require('./server-es6');

and another for babel's configuration:

    // .babelrc
    { "presets": ["es2015"] }

That way you can run your app simply by typing:

    node app.js


The code is available [on Github](https://github.com/mycodesmells/node-es6).

