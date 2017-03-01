var UUID = require("./UUID.js");

module.exports = function(TopicsFile){
	var output = {};
	
	var Topics = require("./topics.json")
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
		/*TopicData expected:
		 * name: name or link of topic
		 * owner: poster of topic
		 * time: epoch of create time
		 */
		 var newTopic = {
			 key:UUID(),//random at post
			 name:TopicData.name,
			 owner:TopicData.owner,
			 time:TopicData.time,
			 comments:[] //filled by users!
		 }
		 Topics.push(newTopic);
		 return newTopic.key;
	}
	output.putComment = function(TopicKey,Comment){
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

