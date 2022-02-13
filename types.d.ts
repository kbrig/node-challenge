interface ConfigDefinition {
    host: string
    port: number
    https: {
        enabled: boolean
        key?: string
        cert?: string
    }
    db: {
        host: string
        port: number
        database: string
    }
    debug: {
        stackSize: number
    }
    shutdown: {
        appKill: number
        serverClose: number
    },
    auth: {
        jwtSecret: string
    },
    api_version: {
        user: number,
        expense: number
    }
}

export interface User {
    id: string
    first_name: string
    last_name: string
    company_name: string
    ssn: string
}

declare module 'config' {
    const config: ConfigDefinition; // eslint-disable-line vars-on-top
    export default config;
}
