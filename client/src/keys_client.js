require("dotenv").config();

module.exports = {
  CLIENT_ID: (process.env.NODE_ENV === "production" ? process.env.PROD_CLIENT_ID : process.env.DEV_CLIENT_ID ),
  SECRET_ID: (process.env.NODE_ENV === "production" ? process.env.PROD_CLIENT_SECRET :process.env.DEV_CLIENT_SECRET ),
  APP_DOMAIN: (process.env.NODE_ENV === "production" ? "" : "http://localhost:3001"),  
  CLIENT_HOME_PAGE_URL : (process.env.NODE_ENV === "production" ? "https://codemarks-app.herokuapp.com" : "http://localhost:3000"), 
};