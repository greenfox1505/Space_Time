//index.html
var app = angular.module('Space_Time', ['ngSanitize']);
app.controller('main', ['$scope', '$http','$interval', '$sce',function($scope, $http,$interval,$sce) {
	$scope.now = Date.now();
	$scope.Math = Math;
	$scope.string = function(input){ return JSON.stringify(input, null, 2)};
	$scope.GetDate = function(epoch){
		return new Date(epoch).toString();
	};
	
	$scope.NewTopicBody = "TEMP";
	
	
	$scope.UserData = JSON.parse(localStorage.getItem("UserData"));
	if($scope.UserData == null){
		window.location.href = "./Account.html"
	}
	console.log($scope.UserData);
	//todo check account exists, on faile, trash local storage and redir to account.html
	$http.get("/Account?GUID=" + $scope.UserData.Public.GUID).
	then(function(){}).
	catch(function(){
		localStorage.setItem("UserData",null);
		window.location.href = "./Account.html"
	})

	$scope.UserList = {};
	$scope.GetUser = function(GUID){
		if($scope.UserList[GUID] == null)
		{
			$scope.UserList[GUID] = {};
			$http.get("./Account?GUID=" + GUID)
			.then(function(res){
				$scope.UserList[GUID] = res.data.Name;
			});
		}
		else{
			return $scope.UserList[GUID];
		}
	}
	
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
		console.log(TopicGUID,Body);
		return $http.put("/API/PutComment?GUID="+TopicGUID,{
			PublicGUID:$scope.UserData.Public.GUID,
			PrivateGUID:$scope.UserData.Private.GUID,
			Body:Body
			})
	}
	$scope.PutTopic = function(Body){
		return $http.put("/API/PutTopic",{
			Body:Body,
			PublicGUID:$scope.UserData.Public.GUID,
			PrivateGUID:$scope.UserData.Private.GUID
		})
	};
	
	$scope.Subscribe = function(callback){
		$http.get("/API/Subscribe").
		then(function(res){
			$scope.Subscribe(callback);
			callback(res.data);
		}).catch(function(){
			//debugger;
			console.log("Subscription Error!");//TODO on error server outage message; ask for refresh!
		})
	};
	
	$scope.Subscribe(function(msg){
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
	});
	
	
}])
