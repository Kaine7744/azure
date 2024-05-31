const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.CosmosDB);
const container = client.database('DemoDatabase').container('Items');
const partitionKey = "UfcOVvPTuh3TXBuILh4Um7C9WBHmtr1oT13EueqmWKdy3Rn5XqYTUEsS0xKQ5k3NBfAkXZ8FN73yACDbZEwS9g==";

app.http('deleteItem', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'items/delete',
    handler: async (request, context) => {
        
        const item = await request.json();
        const { id } = item;
        await container.item(id, partitionKey).delete();
        return {
            body: JSON.stringify({ message: 'Item deleted successfully' }),
            status: 200
        };
    }
});