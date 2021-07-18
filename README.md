## Rusiru Abhisheak Portfolio - API
### Backend API for my new portfolio site.

#### Production Link - <https://ravb-portfolio-prd.herokuapp.com/>
#### Development Link - <https://ravb-portfolio-dev.herokuapp.com/>

This is backend API for my portfokio site. Technology that I am using to implement this application is **Typescript**, **Node JS**, **Express**, **MongoDB** and **Firebase**.

The source code of this applications is publically available. So, you can also add modifications to this code to create your own portfolio site.

### How to things get start
1. Fork or clone the application by using this URL :fork_and_knife: <https://github.com/rusiruavb/portfolio-api.git>
2. Open the project using a code editor (VS Code, Web Storm)
3. Create your own database in MongoDB Atlas
4. Get the connection string
5. Go to the `config` folder and paste the connection string to the `dbUri`
6. Type this command to install the application dependencies
> `npm install` or `npm i`
7. Run this command to start the application
> `npm run dev` This will start the backend server on PORT 9098 and connect to the database.

### To See more documentation
> Go to the `documentation` folder inside the project structure.

## Run the application using Docker container
#### How to set up and run the application
1. Install **Docker** into your local computer.
2. Pull the docker image using **docker pull rusiruavb/conference-api-docker:latest**
3. Run **docker run -p 8045:9094 rusiruavb/portfolio-api:latest** command to create the docker container and run.
4. Then the application will be exposed on port 8045.
5. Navigate to your browser and copy/paste this link **http://localhost:8045/**
