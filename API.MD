API Defintions for Space Time
=============================

A basic explination of how each network payload is implemented

Objects
-------

###Space

For now, we will have one space per server. If I eventually want 
scaliblity, this will have to be parsed out.

###User

```
//User JSON 
{
	UUID:$(User UUID),
	UserName:$(String),
	//todo figure out user tokens needed for OAuth2
}

###Topic

```javascript
//Topic JSON
{
	GUID:$(Topic GUID),
	Title:$(Title or URL of post),
	Created:$(Epoch created),
	Updated:$(Created or last comment date),
	Comments:[]//array of comments
}
```

###Comments

```javascript
//Comment JSON
{

}
```

Messages
--------
###GetTopicList

gets json list of topic titles or links


```javascript
//URL=/API/GetTopicList
//GET
//Return Body:
[
	{
		GUID:$(GUID),
		Updated:$(Creation time or last comment time)
	},
	//.. more, array
]
```

###PutTopic

create new topic, either with a title or link, content in body

```javascript
//URL=/API/PutTopic
//PUT
//Put Body:
{
	userToken:$(userToken)
	body:$(Some user-input text; link or message or both)
}
```

Note: On Body Error, return error

###GetTopic

gets json list of given topic's messages

```javascript
//URL=/API/GetTopic/$(Topic_GUID)

```

###PutComment

//URL=/API/PutComment
post comment. content in body

###Polling

Long Polling! When a post occur

```javascript
//URL=/API/Poll
//GET


```
