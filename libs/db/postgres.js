import config from '../../config';

const pgp = require('pg-promise')();

export const Database = pgp(
  config.database.postgres.use === 'deployment'
    ? config.database.postgres.deployment
    : config.database.postgres.development
);

// (setup) initialize tables if not exists.

const createSession = async () => Database.none(`
    CREATE TABLE IF NOT EXISTS session (
        sid varchar NOT NULL,
        sess json NOT NULL,
        expire timestamp(6) NOT NULL
    )
    WITH (
        OIDS = FALSE
    );

    ALTER TABLE "session"
        ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY 
    IMMEDIATE;
`);
const alterSessionDrop = async () => Database.none(`
    ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_pkey"
`);
const alterSessionAdd = async () => Database.none(`
    ALTER TABLE "session"
        ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY 
    IMMEDIATE
`);
const createPublicUsers = async () => Database.none(`
    CREATE TABLE IF NOT EXISTS "public"."users" (
        uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
        email varchar NOT NULL,
        PASSWORD varchar NOT NULL,
        LANGUAGE varchar,
        permission varchar
    )
`);
createSession().catch((error) => {
  // console.log('createSession: ', error);
});
alterSessionDrop().catch((error) => {
  // console.log('alterSessionDrop: ', error);
});
alterSessionAdd().catch((error) => {
  // console.log('alterSessionAdd: ', error);
});
createPublicUsers().catch((error) => {
  // console.log('createPublicUsers: ', error);
});


// todo make universal db functions (here) if necessary.

export const shutdown = async() => {
  const endPostgres = async () => pgp.end();
  endPostgres().catch((error) => {
    console.log('endPostgres: ', error);
  });
};
