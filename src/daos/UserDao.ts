import PGPool from "./pg_pool";

export class UserDao {
  public async getAllUsers(): Promise<any> {
    const sql = `SELECT id, name as user_name, email
			FROM users`;
    
    const pool = new PGPool();
    const query_results = await pool.aquery(sql);
    
    return {
      success: true,
      data: query_results,
    }
  }
}
