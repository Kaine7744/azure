const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.CosmosDB);
const container = client.database('DemoDatabase').container('Items');

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