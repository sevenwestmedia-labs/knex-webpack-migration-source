import Knex from 'knex'

// Hack to support require.context in tests
if (process.env.NODE_ENV === 'test' && typeof require.context === 'undefined') {
    const fs = require('fs')
    const path = require('path')

    const requireContext = (
        base = '.',
        scanSubDirectories = false,
        regularExpression = /\.js$/
    ) => {
        const files: { [fullPath: string]: true } = {}

        function readDirectory(directory: string) {
            fs.readdirSync(directory).forEach((file: string) => {
                const fullPath = path.resolve(directory, file)

                if (fs.statSync(fullPath).isDirectory()) {
                    if (scanSubDirectories) readDirectory(fullPath)
                    return
                }

                if (!regularExpression.test(fullPath)) return

                files[fullPath] = true
            })
        }

        readDirectory(path.resolve(__dirname, base))

        function Module(file: string) {
            return require(file)
        }
        ;(Module as any).keys = () => Object.keys(files)

        return Module
    }

    require.context = requireContext as any
}

// Todo: make match interface
export class WebpackMigrationSource  {
    constructor(
        private migrationContext: __WebpackModuleApi.RequireContext,
        private shouldRunScript: (script: string) => boolean = () => true
    ) {}

    /**
     * Gets the migration names
     * @returns Promise<string[]>
     */
    getMigrations() {
        const migrations = this.migrationContext
            .keys()
            .filter(this.shouldRunScript)
            .sort()

        return Promise.resolve(migrations)
    }

    getMigrationName(migration: string) {
        // Existing migrations were .js files, need to change name to match
        // what is in the database, otherwise we get a corrupted migration
        // error
        return `${migration.substring(2, migration.length - 3)}.js`
    }

    getMigration(name: string) {
        return this.migrationContext(name)
    }
}
