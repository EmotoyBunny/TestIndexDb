export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
        {
            store: 'methods',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'nameMethod', keypath: 'name', options: { unique: false } },
                { name: 'parameters', keypath: 'param', options: { unique: false } }
            ]
        }
    ]
};