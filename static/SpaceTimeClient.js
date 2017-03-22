var app = angular.module('Space_Time', ['ngSanitize']);
app.controller('main', ['$scope', '$http','$interval', '$sce',function($scope, $http,$interval,$sce) {
	$scope.now = Date.now();
	$scope.Math = Math;
	$scope.string = function(input){ return JSON.stringify(input, null, 2)};
	$scope.GetDate = function(epoch){
		return new Date(epoch).toString();
	};
	

	UserGUID = "TempID"; //todo user auth!
	
	$scope.GetTopicList = function(){
		return $http.get("/API/GetTopicList").then(function(res){
			$scope.Topics = res.data;
			return res;
		});
	}
	$scope.GetTopicList();
	
	$scope.GetTopic = function(GUID){
		return $http.get("/API/GetTopic?GUID=" + GUID);
	}
	$scope.PutComment = function(TopicGUID,Body){
		return $http.put("/API/PutComment?GUID="+TopicGUID,{
			OwnerGUID:UserGUID,//TODO make everything UserGUID or OwnerGUID... maybe
			Body:Body
			})
	}
	$scope.PutTopic = function(Body){
		return $http.put("/API/PutTopic",{
			Body:Body, 
		})
	};
	
	$scope.Subscribe = function(){
		$http.get("/API/Subscribe").
		then(function(res){
			$scope.Subscribe();
			$scope.UpdateFromSub(res.data);
		}).catch(function(){
			console.log("Subscription Error!");
		})
	};$scope.Subscribe();//TODO on error server outage message; ask for refresh!
	
	$scope.UpdateFromSub = function(msg){
		console.log(msg);
		if(msg.msg == "NewTopic"){
			$scope.Topics.unshift(msg.Topic);
		}
		if(msg.msg == "NewComment"){
			//shift topic updated time and add comment to topic
			for( i in $scope.Topics)
			{
				if( $scope.Topics[i].GUID == msg.TopicGUID){
					$scope.Topics[i].Comments.push(msg.Comment);
					$scope.Topics[i].Updated = msg.Comment.Created;
				}
			}
		}
	}
	
	
}])
