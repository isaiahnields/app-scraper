var gplay = require('google-play-scraper');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

// create the reviews database
let db = new sqlite3.Database('play-store/reviews.db');

// read in the apps that will be loaded
const apps = JSON.parse(fs.readFileSync("play-store/apps.json"));

// iterates over the apps in apps.json
for (let app of apps)
{
  // run the following commands in serialized mode
  db.serialize( () =>
  {
    // drop the table if it
    db.run(`DROP TABLE IF EXISTS ${app.name}`);

    // creats a table with the specified columns
    db.run(`CREATE TABLE ${app.name}(ID text, UserName text, Date text, Score integer, Text text)`);


    for (let pageNumber = 1; pageNumber < 100; pageNumber++)
    {
      // get the reviews of the specified app
      gplay.reviews({
        appId: `${app.id}`,
        sort: gplay.sort.HELPFULNESS,
        page: pageNumber
      })

      // passes the reviews into the following function
      .then( (reviews) => {

        // iterates over the reviews of the current page
        for (let review of reviews)
        {
          console.log(review);
          // inserts the review into the apps table
          db.run(
            "INSERT INTO " + app.name + " VALUES(?, ?, ?, ?, ?)",
          review.id,
          review.userName,
          review.date,
          review.score,
          review.text);
        }
      })

      // print an error to the console if one is thrown
      .catch(console.log);
    }
  });
}
