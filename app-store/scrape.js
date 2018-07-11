var store = require('app-store-scraper');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

// create the reviews database
let db = new sqlite3.Database('apps.db');

// read in the apps that will be loaded
const apps = JSON.parse(fs.readFileSync("app-store/apps.json"));

// iterates over the apps in apps.json
for (let app of apps)
{
  // run the following commands in serialized mode
  db.serialize( () =>
  {
    // drop the table if it exists
    db.run('DROP TABLE IF EXISTS AppStorePOS');

    // creats a table with the specified columns
    db.run(`CREATE TABLE AppStorePOS(
      ID integer PRIMARY KEY,
      Title text,
      Description text,
      Size integer,
      Released text,
      Updated text,
      ReleaseNotes text,
      Version text,
      Price real,
      DeveloperId real,
      Developer text,
      Score real,
      Reviews integer,
      CurrentVersionScore real,
      CurrentVersionReviews integer
    )`);

    // get the reviews of the specified app
    store.app({ id: `${app.id}` })

    // passes the reviews into the following function
    .then( (data) =>
    {
      db.run('INSERT INTO iOS VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      data.id,
      data.title,
      data.description,
      data.size,
      data.released,
      data.updated,
      data.releaseNotes,
      data.version,
      data.price,
      data.developerId,
      data.developer,
      data.score,
      data.reviews,
      data.currentVersionScore,
      data.currentVersionReviews
      );
    })

    // print an error to the console if one is thrown
    .catch(console.log);

  });
}
