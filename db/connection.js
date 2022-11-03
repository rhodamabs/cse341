const {MongoClient} = require('mongodb');

async function main() {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.2cpu2ov.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
    await client.connect();
    await listDatabases(client);

    ;
    } catch (event) {
        console.error(event);
    } finally {
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 
    