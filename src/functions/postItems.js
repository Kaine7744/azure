const { app,input } = require('@azure/functions');

const cosmosOutput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
});

app.http('postItems', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmoOutput],
    route: 'items/post',
    handler: async (request, context) => {
    const newItem = await request.json();
    context.extraOutputs.set(cosmosOutput, newItem);
    }
});
