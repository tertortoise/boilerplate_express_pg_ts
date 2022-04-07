import {Pool, PoolClient, PoolConfig, QueryResult} from 'pg';

const defaultDbCfg = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number.parseInt(process.env.PGPORT ?? '5432', 10),
}

interface Callback {
  (err: null | Error, res?: QueryResult): void | Error | QueryResult
}

export default class PGPool {
  pool: Pool;
  
  constructor(dbCfgProps?: PoolConfig) {
    const dbCfg = dbCfgProps ?? defaultDbCfg;
    
    this.pool = new Pool(dbCfg);
    
    this.pool.on('error', function (err: Error, _client: any) {
      console.log(`Idle-Client Error:\n${err.message}\n${err.stack ? err.stack : err.message}`)
    })
  }
  
  query(sqlText: string, params: any[] = [], callback: Callback) {
    this.pool.connect(function (err: Error, client: PoolClient, done: (release?: any) => void) {
      if (err) {
        return callback(err);
      }
      client.query(sqlText, params, function (errQuery: Error, res?: QueryResult<any>) {
        done();
        if (errQuery) {
          return callback(errQuery);
        }
        return callback(null, res);
      })
    })
  }
  
  async aquery(sqlText: string, params: any[] = []): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sqlText, params);
      return result;
      // eslint-disable-next-line
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }
  
  async connect(): Promise<PoolClient> {
    const client = await this.pool.connect();
    return client;
  }
}
