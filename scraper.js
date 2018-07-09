var store = require('app-store-scraper');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

// create the reviews database
let db = new sqlite3.Database('reviews.db');

// read in the apps that will be loaded
const apps = JSON.parse(fs.readFileSync("apps.json"));

// iterates over the apps in apps.json
for (let app of apps)
{
  // run the following commands in serialized mode
  db.serialize( () =>
  {
    // drop the table if it
    db.run(`DROP TABLE IF EXISTS ${app.name}`);

    // creats a table with the specified columns
    db.run(`CREATE TABLE ${app.name}(ID integer PRIMARY KEY, Version text, Score integer, Title text, Text text)`);


    for (var pageNumber = 1; pageNumber < 11; pageNumber++)
    {
      // get the reviews of the specified app
      store.reviews({
        id: `${app.id}`,
        sort: store.sort.HELPFUL,
        page: pageNumber
      })

      // passes the reviews into the following function
      .then( (reviews) => {

        // iterates over the reviews of the current page
        for (let review of reviews)
        {
          // inserts the review into the apps table
          db.run(
            "INSERT INTO " + app.name + " VALUES(?, ?, ?, ?, ?)",
          review.id,
          review.version,
          review.score,
          review.title,
          review.text);
        }
      })

      // print an error to the console if one is thrown
      .catch(console.log);
    }
  });
}
