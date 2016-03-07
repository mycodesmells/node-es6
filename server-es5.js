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

