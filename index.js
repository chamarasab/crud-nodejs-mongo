const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function insertFakeData() {
    try {
        await client.connect();
        const database = client.db('crib');
        const collection = database.collection('customers');

        const fakeData = Array.from({ length: 10 }).map(() => {
            const nic = faker.string.numeric(9) + 'V';
            const timestamp = faker.date.future().toISOString().slice(11, 19).replace(/:/g, '');
            return {
                name: faker.person.firstName(),
                nic: nic,
                gender: faker.helpers.arrayElement(['Male', 'Female']),
                filename: `${nic}_${timestamp}_.txt`,
                brcode: '000',
                bruser: '000mgr',
                report: 'CustomerReport',
                status: 'paid',
                created: faker.date.future().toISOString().replace('T', '').slice(0, 19)
            }

        });

        const result = await collection.insertMany(fakeData);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

async function deleteFirst200Records() {
    try {
        await client.connect();
        const database = client.db('crib'); // Replace with your database name
        const collection = database.collection('customers'); // Replace with your collection name

        // Find the first 200 records sorted by insertion order
        const recordsToDelete = await collection.find().sort({ _id: 1 }).limit(1000).toArray();

        if (recordsToDelete.length > 0) {
            // Extract IDs of the records to delete
            const idsToDelete = recordsToDelete.map(record => record._id);

            // Delete records with the extracted IDs
            const result = await collection.deleteMany({ _id: { $in: idsToDelete } });
            console.log(`${result.deletedCount} documents were deleted`);
        } else {
            console.log('No documents found to delete.');
        }
    } finally {
        await client.close();
    }
}

async function duplicateAndChangeStatus() {
    try {
        await client.connect();
        const database = client.db('crib'); // Replace with your database name
        const collection = database.collection('customers'); // Replace with your collection name

        // Fetch the existing records (without limiting the number to ensure all are fetched)
        const records = await collection.find({}).toArray();

        if (records.length > 0) {
            // Create new records by duplicating existing ones and changing the status to 'free'
            const newRecords = records.map(record => {
                const { _id, ...rest } = record; // Exclude the _id field from the duplicated record
                return {
                    ...rest,
                    status: 'free', // Change the status to 'free'
                };
            });

            // Insert the new records back into the collection
            const result = await collection.insertMany(newRecords);
            console.log(`${result.insertedCount} documents were duplicated and status changed to 'free'`);
        } else {
            console.log('No documents found to duplicate.');
        }
    } finally {
        await client.close();
    }
}

async function retrieveFakeData() {
    try {
        await client.connect();
        const database = client.db('crib'); // Replace with your database name
        const collection = database.collection('customers'); // Replace with your collection name

        // Fetch all records from the collection
        const records = await collection.find({}).toArray();

        // Convert the records to a JSON string
        const jsonRecords = JSON.stringify(records, null, 2);

        console.log('Retrieved Records:');
        console.log(jsonRecords);

        return jsonRecords; // Return the records as a JSON object
    } catch (error) {
        console.error('Error retrieving data:', error);
    } finally {
        await client.close();
    }
}

retrieveFakeData().catch(console.dir);
//insertFakeData().catch(console.dir);
//deleteFirst200Records().catch(console.dir);
//duplicateAndChangeStatus().catch(console.dir);