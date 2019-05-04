const seeder = require('mongoose-seed');
const data = require('./server/default-data/initializeDB')
const URI = require('./server/config');
const MONGODB_URI = process.env.MONGODB_URI || URI; 

seeder.connect(MONGODB_URI, () => {
    console.log('Seeding mongodb...');

    seeder.loadModels(['./server/models/Team.js',
    './server/models/Tournament.js'])

    // Clear specified collections
    seeder.clearModels(['Team', 'Tournament'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });

    });

    console.log('Seeding mongodb complete.');

})