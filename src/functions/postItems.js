const { app,output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
});

app.http('postItems', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    route: 'items/post',
    handler: async (request, context) => {
    const newItem = await request.json();
    context.extraOutputs.set(cosmosOutput, newItem);
    }
});
