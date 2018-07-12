var sheets = require('./sheets-api.js')
var play = require('google-play-scraper');
var fs = require('fs');
var moment = require('moment');

let spreadsheetId = '18oOBL5jZefDrUQp-afVO3QbJE0saJvaqucgMFXdEjTw';
let range = 'A2:O2';


// read in the apps that will be loaded
const apps = JSON.parse(fs.readFileSync("apps.json"));

// iterates over the apps in apps.json
for (let app of apps.play)
{
    play.app({ appId: `${app.id}` }).then( (data) =>
    {
      sheets.append(spreadsheetId, range, [[
        moment().format('MMMM D, YYYY'),
        data.appId,
        data.title,
        data.summary,
        data.minInstalls,
        data.score,
        data.ratings,
        data.reviews,
        data.price,
        data.size,
        data.androidVersion,
        data.developer,
        moment(data.released).format('MMMM D, YYYY'),
        moment(data.updated).format('MMMM D, YYYY'),
        data.version
      ]]);
    });
}
