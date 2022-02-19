const { ParseServer } = require('parse-server')
const ParseDashboard = require('parse-dashboard')
const env = require('./lib/env')

module.exports = () => {
    const api = new ParseServer({
        databaseURI: env.DATABASE_URI,
        cloud: env.CLOUD_PATH,
        appId: env.APP_ID,
        masterKey: env.MASTER_KEY, // Add your master key here. Keep it secret!
        serverURL: env.SERVER_URL,  // Don't forget to change to https if needed
        // liveQuery: {
        //   classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
        // }
        });
        // Client-keys like the javascript key or the .NET key are not necessary with parse-server
        // If you wish you require them, you can set them as options in the initialization above:
        // javascriptKey, restAPIKey, dotNetKey, clientKey
        const dashboard = new ParseDashboard({
        "apps":[
            {
            "serverURL": env.SERVER_URL,
            "appId": env.APP_ID,
            "masterKey": env.MASTER_KEY,
            "appName": env.APP_NAME
            }
        ],
        "users":[
            {
            "user": env.USERNAME,
            "pass": env.PASSWORD
            }
        ]
        }, { 
        allowInsecureHTTP: true,
        trustProxy: 1
    });

    return { api, dashboard }
}