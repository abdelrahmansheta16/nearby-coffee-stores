const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
});
var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);

const table = base('discover-coffee');
const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
  console.log("table", table)
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  console.log("findCoffeeStoreRecords", findCoffeeStoreRecords)
  return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
