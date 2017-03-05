var UUID = require("./UUID.js");

var fs = require('fs');

module.exports = function(TopicArgs){
	var modified = false;
	var output = {};
	
	var Topics = require(TopicArgs.saveFile)
	
	setInterval(function(){
		if(modified){
			console.log("saving!");
			modified = false;
			fs.writeFile(TopicArgs.saveFile,JSON.stringify(Topics),function(){
					console.log(Topics);
				})
		}
	},TopicArgs.saveInterval);
	//todo: dump to TopicsFile on interval!
	
	output.getTopicList = function(){
		var list = []
		for( i in Topics ){
			list.push(Topics[i].key);
		}
		return list;
	}
	output.getTopicData = function(TopicKey){
		for( i in Topics ){
			if(Topics[i].key==TopicKey){
				return Topics[i];
			}
		}
		return null;
	}
	
	output.putTopic = function(TopicData){
		modified = true;
		/*TopicData expected:
		 * nanme: name or link of topic
		 * owner: poster of topic
		 * time: epoch of create time
		 */
		 var newTopic = {
			 key:UUID(),//random at post
			 name:TopicData.title,
			 owner:TopicData.owner,
			 time:TopicData.time,
			 comments:[] //filled by users!
		 }
		 Topics.push(newTopic);
		 return newTopic.key;
	}
	output.putComment = function(TopicKey,Comment){
		modified = true;
		var newComment = {
			owner:Comment.owner,
			time:Comment.time,
			text:Comment.text
		}
		for( i in Topics){
			if(Topics[i].key==TopicKey){
				Topics[i].comments.push(newComment);
				return 0;
			}
		}
		return "ERROR, NO SUCH TOPIC";
	}
	
	output.DUMP = function(){
		console.log(JSON.stringify(Topics,null,2));
	}
	
	return output;
	
}

