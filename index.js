const dotenv = require("dotenv");
const { GoogleSpreadsheet } = require("google-spreadsheet");

dotenv.config();

main();

async function main() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  console.log(doc.title); // Output: Das Spreadsheet
  console.log(sheet.title); // Output: Sheet1
  console.log(sheet.rowCount); // Output: 1000?

  const rows = await sheet.getRows();
  for (const row of rows) {
    console.log(`[${row._rowNumber}] Name=${row.Name}, Grade=${row.Grade}`);
    // Output: [2] Name=rpappalardo, Grade=A+
    // Output: [3] Name=pdehaan, Grade=C-
  }
}
