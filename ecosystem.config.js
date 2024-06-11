module.exports = {
   apps : [
     {
       name: 'gateway',
       script: 'gateway/dist/main.js',
       instances: 'max',
       exec_mode: 'cluster',
       env_production: {
         NODE_ENV: 'production',
         JWT_SECRET: process.env.JWT_SECRET,
         FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
         COMMENTS_HOST: process.env.COMMENTS_HOST,
         COMMENTS_PORT: process.env.COMMENTS_PORT,
         USERS_HOST: process.env.USERS_HOST,
         USERS_PORT: process.env.USERS_PORT,
       }
     },
     {
       name: 'users',
       script: 'users/dist/main.js',
       instances: 'max',
       exec_mode: 'cluster',
       env_production: {
         NODE_ENV: 'production',
         DATABASE_HOST: 'postgreSQL',
         DATABASE_PORT: process.env.POSTGRES_PORT,
         DATABASE_USERNAME: process.env.DATABASE_USERS_USER,
         DATABASE_PASSWORD: process.env.DATABASE_USERS_PASSWORS,
         DATABASE: process.env.DATABASE_USERS,
         JWT_SECRET: process.env.JWT_SECRET,
         ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
         USERS_HOST: process.env.USERS_HOST,
         USERS_PORT: process.env.USERS_PORT,
       }
     },
     {
      name: 'comments',
      script: 'comments/dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        DATABASE_HOST: 'postgreSQL',
        DATABASE_PORT: process.env.POSTGRES_PORT,
        DATABASE_USERNAME: process.env.DATABASE_COMMENTS_USER,
        DATABASE_PASSWORD: process.env.DATABASE_COMMENTS_PASSWORS,
        DATABASE: process.env.DATABASE_COMMENTS,
        COMMENTS_HOST: process.env.COMMENTS_HOST,
        COMMENTS_PORT: process.env.COMMENTS_PORT,
      },
    }
   ]
 };