# Account API

The account system works off two numbers, an private and public number
(this is not  public/private key encryption, maybe it should be?). When
you create an account, you're given both public and private numbers. The
public number is used to identify who created what content on the server
and every user can read it. The private number is used to post.

If you want to use an account on a new device, you **must** have a 
working device. Using the private number, the account requests an 
expiring "new device" code. The user enters the number on the new 
device, and the server give them all account information on the new 
device (both public and private keys).

## For this release

* there is no account recovery. 
* There is no password.  
* There is no safety net. 

(Unless you have access to an admin to manually recover or remove you)

## Users Object

```javascript
[
	{
		Public:{
			GUID:GUID(),
			Name:Name,
			//someday, user icons? email? idk
		}
		Private:{
			GUID:GUID() //effectively the password? maybe should be hashed?
			//na this should be a per-device Private GUID?
		}
	},//repeat as needed, array
]
``` 


## /API/Account/NewAccount

Creates new account. A man only needs a name.

```javascript
//Request
{
	Name:"SomeName"
}
//Responce
{
	Public:{
		GUID:GUID(),
		Name:"SomeName",
	}
	Private:{
		GUID:GUID()
	}
}
```

## /API/Account/GetAccount/GUID

Gets account from PublicID.

```javascript
//Request
//URL encoded request, /API/Account/GetAccount/$GUID

//Responce
{
	GUID:GUID
	Name:"SomeName"
}
```

## /API/Account/ReqestDeviceCode

```javascript
//Request
{
	PublicID:GUID,
	PrivateID:GUID
}
//Responce
{
	DeviceCode:"DEAD.BEEF",//8 digit hex? prob good enough....?
	Experation:1234//Epoch this number is invalid, 60sec?
}
```


## /API/Account/AccountFromCode

```javascript
//Request
{
	DeviceCode:"DEAD.BEEF"//see /API/Account/ReqestDeviceCode for comment
}
//Responce
{
	PublicID:GUID,
    PrivateID:GUID
    Name:"SomeName"
}
```
