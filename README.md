1. Run command "yarn" to install all packages.
2. Modify line `9` in `ormconfig.json` to "src/**/*.entity.ts" and then run command "yarn db:seed".
3. After run seed success, revert `ormconfig.json` file.
4. Run "yarn start:dev" to start the application.

`Note`: I intent to make a dockerfile to package the backend source and postgresql database into one but the deadline doesn't allow me to do it. So, please make sure that you already installed postgresql on your local machine before starting the backend application.