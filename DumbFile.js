var fs = require('fs');

module.exports = function(FileArgs){
	
	var output;
	
	try{ //TODO: this is the smae code as in topics, but I don't want to genericize it cuz DB is coming some day
		output = require(FileArgs.saveFile);//data/topics.json
	}catch(err){
		console.error(FileArgs.saveFile + " Not Found!!, Creating new file.");
		output = [];
	}//redudant. DB will be handling this. AccountArgs.DB will be DB access info!
	
	setInterval(function(){
		if(FileArgs.modified){
			console.log("WRITING FILE!:" , FileArgs.saveFile )
			fs.writeFile(FileArgs.saveFile, JSON.stringify(output));
			FileArgs.modified = false;
		}
	},FileArgs.saveInterval)
	return output;
}
