module.exports = {
   apps : [
     {
       name: 'gateway',
       script: 'gateway/dist/main.js',
       instances: 1,
       exec_mode: 'cluster',
       env_production: {
         NODE_ENV: 'production',
       }
     },
     {
       name: 'users',
       script: 'users/dist/main.js',
       instances: 1,
       exec_mode: 'cluster',
       env_production: {
         NODE_ENV: 'production',
       }
     },
     {
      name: 'comments',
      script: 'comments/dist/main.js',
      instances: 1,
       exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    }
   ]
 };