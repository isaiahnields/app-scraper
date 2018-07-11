var gplay = require('google-play-scraper');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

// create the reviews database
let db = new sqlite3.Database('apps.db');

// read in the apps that will be loaded
const apps = JSON.parse(fs.readFileSync("play-store/apps.json"));

// iterates over the apps in apps.json
for (let app of apps)
{
  // run the following commands in serialized mode
  db.serialize( () =>
  {
    // drop the table if it
    db.run('DROP TABLE IF EXISTS PlayStorePOS');

    // creats a table with the specified columns
    db.run(`CREATE TABLE PlayStorePOS(
      AppId text PRIMARY KEY,
      Title text,
      Description text,
      Summary text,
      Installs integer,
      Score real,
      Ratings integer,
      Reviews integer,
      Price real,
      Size text,
      AndroidVersion text,
      Developer text,
      Released text,
      Updated integer,
      Version text
    )`);


    // get the reviews of the specified app
    gplay.app({appId: `${app.id}`})

    // passes the reviews into the following function
    .then( (data) =>
    {
      db.run('INSERT INTO Android VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        data.appId,
        data.title,
        data.description,
        data.summary,
        data.minInstalls,
        data.score,
        data.ratings,
        data.reviews,
        data.price,
        data.size,
        data.androidVersion,
        data.developer,
        data.released,
        data.updated,
        data.version
      );
    })

    // print an error to the console if one is thrown
    .catch(console.log);

  });
}
