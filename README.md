# webproject


When cloning structure from main, for yourself, remove all "remove.txt" files and make your own branch.
Remember dont push things to main when you work, make your own branches.

so far we have installed:
- express
- bcryptjs
- jsonwebtoken
- mongoose


notes for the package.json:
"type": "module" added this because we want to be using ES module

for this part:
"scripts":
    "start": "node server",
    "dev": "node --watch --env-file=.env server"
--watch makes sure the server reloads everytime a change in the code is made so we dont have to manually do it ouselves everythime we make a change. the --env-file=.env makes sure that the .env file is read, we could also install dotenv and do it this way, but i like this way for now. server at the end, makes sure thaat the file that is being run is the file with name server, this means it is our server.js file that is being run.

also i had some trouble when running the script, 'npm run dev', in the terminal, this is because i had to change the path like this:
    "start": "node backend/server",
    "dev": "node --watch --env-file=.env backend/server"
backend/server instead of only server..