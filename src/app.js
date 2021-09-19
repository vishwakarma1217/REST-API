const express = require('express');
const config = require('config');
const cors = require('cors');
const logger = require('./logger');
const port = config.get('port');
const host = config.get('host');
const app = express();
const connect = require('./db/connect');
const apiRouter = require("./routes/index");
const apiResponse = require('./helpers/apiResponse');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

app.listen(port, ()=>{
    logger.info(`Server Started at http://${host}:${port}`);
    connect();
});