//USERS_API.MD

var GUID = require("./GUID.js");

module.exports = function(UsersArgs){
	
	var output = {};

	var DeviceCodes = {};
	
	var Users = require("./DumbFile.js")(UsersArgs);
	output.UserData = Users;

	output.GetUser = function(GUID){
		for(i in Users){
			if ( Users[i].Public.GUID == GUID ){
				return Users[i].Public;
			}
		}
		throw "USER DOESN'T EXIST!"
	}
	
	output.CheckUser = function(check){
		for( i in Users){
			console.log("checking user",Users[i].Private.GUID,check.PrivateGUID);
			if( Users[i].Private.GUID == check.PrivateGUID){
				var valid = Users[i].Public.GUID == check.PublicGUID
				console.log("FOUND!",Users[i].Public.GUID == check.PublicGUID);
				return valid;
			}
		}
		return false;
	}
	
	output.DeleteUser = function(input){
		throw "DELETE NOT YET SUPPORTED!";
	}
	
	output.NewUser = function(Name){
		if(!Name){
			throw "BAD NAME"
		}
		/* //KEEP THIS CODE DISABLED UNTIL DELETE IS HANDLED!
		for( i in Users){
			if (Users[i].Public.Name == Name ){
				throw "" + Name + " Already Exists!";
			}
		}
		 */
		var NewUser =  {
			Public:{
				GUID:GUID(),
				Name:Name
			},
			Private:{
				GUID:GUID(),
			},
		};
		Users.push(NewUser);
		
		UsersArgs.modified = true;
		
		return NewUser;
	}
	
	
	return output;

}

