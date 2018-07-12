var { google } = require('googleapis');
var privatekey = require("./client_secret.json");
const sheets = google.sheets('v4');

// configure a JWT auth client
const jwtClient = new google.auth.JWT(
       privatekey.client_email,
       null,
       privatekey.private_key,
       ['https://www.googleapis.com/auth/spreadsheets']);


function get(spreadsheetId, range)
{

  sheets.spreadsheets.values.get({
     auth: jwtClient,
     spreadsheetId: spreadsheetId,
     range: range
  }, function (err, response) {
     if (err) throw err;

     console.log(response.data.values);
     return response.data.values;
  });
}


function append(spreadsheetId, range, values)
{
  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: spreadsheetId,

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: range,

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',

    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',

    resource: {
      values: values
    },

    auth: jwtClient,
  };

  sheets.spreadsheets.values.append(request);

}

module.exports = {
  get: get,
  append: append
};
