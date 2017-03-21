var GUID = require("./GUID.js");

var fs = require('fs');


/* Should I save everything as a single array of GUIDs? Thne create the
 * Topcis object on load? Maybe. Seems ineffecant... we will decide this
 * when we upgrade to use a DB
 */
 

/* IMPORTANT!
 * This file is a stand-in for a DB. Once this object becomes too big,
 * We will use a DB!
 */ 

module.exports = function(TopicArgs){
	var modified = false;
	var output = {};

	var Topics = [];
	try{
		var Topics = require(TopicArgs.saveFile);//data/topics.json
	}catch(err){
		console.error("Save File Not Found!!, Creating new file.");
	}//redudant. DB will be handling this. TopicArgs.DB will be DB access info!
	
	setInterval(function(){
		if(modified){
			console.log("WRITING FILE!:" , TopicArgs.saveFile )
			fs.writeFile(TopicArgs.saveFile, JSON.stringify(Topics));
			modified = false;
		}
	},TopicArgs.saveInterval)
	
	//GetTopicsList
	output.GetTopicList = function(){
		//This get function is nessary. Eventually this will use a db, 
		//so direct data access with be impossible
		 return Topics;
	}
	
	//GetTopicsPage TODO: eh, later. during below-the-fold upgrade

	//GetTopic
	output.GetTopic = function(GUID){
		//todo: this is brute force. def needs cleanup!
		for(i in Topics){
			if(Topics[i].GUID == GUID){
				return Topics[i];
			}
		}
		return null;
	}
	
	//PutTopic
	output.PutTopic = function(newTopicData){
		//TODO decide if sanitization happens here or before... weather or not this is a DB interation will influance that
		/* newTopicData =
		 * {
		 * 	OwnerGUID:$(User GUID)
		 * 	Body:$(Some user-input text; link or message or both)
		 * }
		 */
		var newTopic = {
			GUID:GUID(),
			Body:newTopicData.Body,
			Owner:newTopicData.OwnerGUID,
			Created:Date.now(),
			Comments:[]
		}; newTopic.Updated = newTopic.Created;

		Topics.unshift(newTopic); //used unshift; profornace is bad, but will be replaced with DB
		modified = true;
		return newTopic;
	}

	//PutComment
	output.PutComment = function(newCommentData){
		/* newCommentData =
		 * {
		 *  TopicGUID:$(from req url)
		 * 	OwnerGUID:$(User GUID)
		 * 	Body:$(Some user-input text; link or message or both)
		 * }
		 */
		var ThisTopic;
		//Find matching GUID, throw error if none.
		for( i in Topics ){
			//TODO: this is brute force. Should be replaced with DB
			if(Topics[i].GUID == newCommentData.TopicGUID){
				ThisTopic = Topics[i];
			}
		}
		if(ThisTopic == null){
			throw ("Topic " + newCommentData.TopicGUID + " does not exist!");
		}
		else{
			var newComment = {
				GUID:GUID(),
				Owner:newCommentData.OwnerGUID,
				Body:newCommentData.Body,
				Created:Date.now(),
			};//TODO decide if doublelly linked
			ThisTopic.Updated = newComment.Created;
			ThisTopic.Comments.push(newComment); //unsift? eh
			modified = true;
			return newComment;
		}
	}

	//Subscriptions handled by run.js? probably...

	return output;

}

