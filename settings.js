module.exports = {
	port:9101,
	//saveInterval:60*1000,
	saveInterval:60,
	sslCertLoc:"",
	TopicsArgs:{
		saveFile:"./data/Topics.json",//replace with DB!
		saveInterval:60,
	},
	UsersArgs:{
		saveFile:"./data/Accounts.json",//replace with DB!
		saveInterval:60,
	}
};

