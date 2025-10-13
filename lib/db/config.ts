import "dotenv/config";

/**
 * Centralized database configuration
 * Manages connection strings, timeouts, and pools across different environments
 */

// Export database connection configuration
export const dbConfig = {
  /**
   * Get the appropriate connection string for the current environment
   * Follows a priority order of environment variables
   */
  getConnectionString(): string {
    // Development, test, or production?
    const environment = process.env.NODE_ENV || 'development';
    const isCloud = process.env.USE_CLOUD_DB === 'true';
    
    // Local database connection string (for local development)
    const localDbUrl = 'postgresql://postgres:postgres@localhost:5432/building_bridges_dev';
    
    // Return the appropriate connection string based on environment and configuration
    if (environment === 'development' && !isCloud) {
      // Local development - use local PostgreSQL
      return process.env.LOCAL_DATABASE_URL || localDbUrl;
    } else {
      // Cloud database in any environment, prioritize DATABASE_URL, then POSTGRES_URL
      const rawUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
      if (rawUrl) {
        // Ensure SSL is enforced for remote databases (e.g., Neon)
        try {
          const url = new URL(rawUrl);
          // Append sslmode=require if not already present
          const hasSslMode = url.searchParams.has('sslmode');
          if (!hasSslMode) {
            url.searchParams.set('sslmode', 'require');
          }
          return url.toString();
        } catch {
          // If URL parsing fails, fall back to raw value
          return rawUrl;
        }
      }
    }
    
    // If no valid connection string is found, fall back to local development
    console.warn('No database connection string found in environment. Using local development database.');
    return localDbUrl;
  },
  
  /**
   * Get connection options for postgres client
   */
  getConnectionOptions() {
    // Enable SSL for non-local (cloud) connections
    const environment = process.env.NODE_ENV || 'development';
    const isCloud = process.env.USE_CLOUD_DB === 'true' || environment !== 'development';
    return {
      max: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE, 10) : 10,
      prepare: true, // Enables prepared statements for better security
      idle_timeout: process.env.DB_IDLE_TIMEOUT ? parseInt(process.env.DB_IDLE_TIMEOUT, 10) : 30, // seconds
      connect_timeout: process.env.DB_CONNECT_TIMEOUT ? parseInt(process.env.DB_CONNECT_TIMEOUT, 10) : 30, // seconds
      // postgres.js accepts ssl: 'require' to enforce TLS
      ...(isCloud ? { ssl: 'require' as const } : {}),
    };
  },
  
  /**
   * Get database schema for migrations and seeds
   */
  getSchema() {
    return process.env.DB_SCHEMA || 'public';
  },
  
  /**
   * Log the current database connection information
   */
  logConnectionInfo() {
    const connectionString = this.getConnectionString();
    const url = new URL(connectionString);
    const host = url.hostname;
    const database = url.pathname.replace('/', '');
    
    console.log(`Connecting to database: ${host}/${database}`);
  }
};

// Export a singleton instance
export default dbConfig; 