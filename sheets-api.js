const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

function append(values, range, valueInputOption)
{
  // package values in resources object
  let resource = {
    values: values
  };

  // append the resource to the sheet
  const sheets = google.sheets({version: 'v4', auth: 'AIzaSyCyWlPYPMBRdawLg6cg0ma-kI-Ztfi7zc4'});
  sheets.spreadsheets.values.append({
    spreadsheetId: "1_wrqwVoN0iBeYH0ThGvQ9kkl0H9nZtsQWeO0huAS-9U",
    range: range,
    valueInputOption: valueInputOption,
    resource,
  }, (err, result) => {
    if (err) {
      // Handle error.
      console.log(err);
    } else {
      console.log(`${result.updates.updatedCells} cells appended.`);
    }
  });
}

append([1, 2, 3], "'App Store'!A1:1", "RAW");

module.exports = {
  append: append
}
