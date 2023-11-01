export default {
    app: {
        name: 'unitedtranssexuals.org',
        version: '1.0.0',
        info: 'United Transsexuals'
    },
    ip: {
        server: '10.134.0.2'
    },
    port: {
        server: 4000,
        socket: 6660
    },
    security: {
        cookie: {
            secret: '66iVzEwvXu3AHwxAjAw2UD6CYyC29vGgbGK86mcCJCXvxWNj3C',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week cookie age.
        },
    },
    database: {
        postgres: {
            use: 'development', // set to 'deployment' or 'development' to switch.
            deployment: 'postgres://jezebel:password123@localhost/transsdb',
            development: 'postgres://jezebel:password123@localhost/transsdb'
        }
    },
    websocket: {
        deployment: [
            'ws://unitedtranssexuals.org',
            'wss://unitedtranssexuals.org',
            'https://unitedtranssexuals.org'
        ],
        development: [
            'ws://localhost:6660',
            'wss://localhost:6660',
            'http://localhost:6660',
            'https://localhost:6660'
        ]
    }
};
