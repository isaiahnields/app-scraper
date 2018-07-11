const {google} = require('googleapis');
var sheets = google.sheets('v4');


var request = {
  spreadsheetId : ""
}

sheets.sheetsService.spreadsheets.values.append({
  spreadsheetId,
  range,
  valueInputOption,
  resource,
}, (err, result) => {
  if (err) {
    // Handle error.
    console.log(err);
  } else {
    console.log(`${result.updates.updatedCells} cells appended.`);
  }
});
