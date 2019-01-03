// import Knex from 'knex'

// declare module 'knex' {
//     declare namespace Knex {
//         /**
//      * Custom migration sources can be used to provide the migrations
//      * from any custom source, for example out of a webpack bundle
//      * By default uses a FsMigrationSource to read migrations from the file system
//      */
//         interface MigrationSource<T = string> {
//             /**
//          * Gets the list of migrations
//          */
//             getMigrations(loadExtensions: string[]): PromiseLike<T[]>
//             /**
//          * Gets the migration name for a migration info
//          * @param migration The migration
//          */
//             getMigrationName(migration: T): string
//             /**
//          * Returns the knex migration, with the up/down functions
//          *
//          * @param migration The migration
//          * @returns the knex migration object
//          */
//             getMigration(migration: T): { up: Function; down: Function }
//         }

//         interface MigratorConfig {
//             migrationSource?: MigrationSource
//         }
//     }

//     export = Knex
// }
