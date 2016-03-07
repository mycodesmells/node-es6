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
