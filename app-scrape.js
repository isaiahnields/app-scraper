var sheets = require('./sheets-api.js')
var store = require('app-store-scraper');
var fs = require('fs');
var moment = require('moment');

let spreadsheetId = '1_wrqwVoN0iBeYH0ThGvQ9kkl0H9nZtsQWeO0huAS-9U';
let range = 'App Store!A2:P2';


// read in the apps that will be loaded
const apps = JSON.parse(fs.readFileSync("apps.json"));

// iterates over the apps in apps.json
for (let app of apps.app)
{
    store.app({ id: `${app.id}` }).then( (data) =>
    {
      sheets.append(spreadsheetId, range, [[
        moment().format('MMMM D, YYYY h:mm:ss a'),
        data.id,
        data.title,
        data.description,
        data.size,
        moment(data.released).format('MMMM D, YYYY h:mm:ss a'),
        moment(data.updated).format('MMMM D, YYYY h:mm:ss a'),
        data.releaseNotes,
        data.version,
        data.price,
        data.developerId,
        data.developer,
        data.score,
        data.reviews,
        data.currentVersionScore,
        data.currentVersionReviews
      ]]);
    });
}
