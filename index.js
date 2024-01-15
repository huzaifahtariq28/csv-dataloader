const fs = require('fs');
const logFilePath = './logs/processing_log.txt';
const csv = require('csv-parser');
const connection = require('./startup/db');
const { getPrice, updatePrice } = require('./helpers/pos');

connection.connect();

const updateQuery =
  'UPDATE products SET price = ? WHERE sku = ? AND user_id = 100 AND is_added_to_pos = 1';
const selectQuery = 'SELECT * FROM products WHERE sku = ? AND user_id = 100 AND is_added_to_pos = 1';

async function logToFile(message) {
  return new Promise((resolve, reject) => {
    fs.appendFile(logFilePath, message + '\n', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function processRow(row, rowIndex) {
  try {
    await new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      connection.query(updateQuery, [parseFloat(row.price), parseInt(row.sku)], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log(`Row ${rowIndex}: DB Updated`);

    const selectResults = await new Promise((resolve, reject) => {
      connection.query(selectQuery, [parseInt(row.sku)], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    if (selectResults.length > 0 && selectResults[0].pos_id) {
      const price = await getPrice(selectResults[0].pos_id);
      if (price.err) {
      } else {
        price[0].grossAmount = parseFloat(row.price);
        await updatePrice(price[0], price[0].variantId);
        console.log(`Row ${rowIndex}: POS Updated`);
      }
    } else {
      await logToFile(`Row ${rowIndex}: Could not find product with conditions.`);
    }

    await new Promise((resolve, reject) => {
      connection.commit((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await logToFile(`Row ${rowIndex}: Processing completed successfully.`);
  } catch (err) {
    console.error('Error processing row:', err);
    await logToFile(`Row ${rowIndex}: Error processing row - ${err.message}`);
    await new Promise((resolve) => {
      connection.rollback(() => {
        resolve();
      });
    });
  }
}

async function processCsvFile() {
  const rows = [];
  fs.createReadStream('./data/data 100 before discount.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', async () => {
      let rowIndex = 1;
      for (const row of rows) {
        await processRow(row, rowIndex);
        rowIndex++;
      }
      console.log('CSV file successfully processed');
      connection.end();
    });
}

processCsvFile();
