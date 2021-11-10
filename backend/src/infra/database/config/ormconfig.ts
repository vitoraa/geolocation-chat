import { environment } from "../../../environment";

export function ormConfig (): any {
  return {
    type: environment.databaseType,
    host: environment.databaseHost,
    port: parseInt(environment.databasePort),
    username: environment.databaseUsername,
    password: environment.databasePassword,
    database: environment.databaseName,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepConnectionAlive: true,
    connectTimeout: parseInt(environment.databaseConnectionTimeOut),
    acquireTimeout: parseInt(environment.databaseAcquireTimeOut),
    extra: {
      connectionLimit: parseInt(environment.databaseConnectionLimit),
    },
    entities: [
      'dist/**/entity/*.entity.js',
    ],
    migrations: [
      'dist/database/migrations/*.js',
    ],
    subscribers: [
      'dist/observers/subscribers/*.subscriber.js',
    ],
    cli: {
      entitiesDir: 'src/components/**/entity',
      migrationsDir: 'src/database/migrations',
      subscribersDir: 'src/observers/subscribers',
    },
  };
}