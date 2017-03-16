API Defintions for Space Time
=============================

A basic explination of how each network payload is implemented

Objects
-------

### Space

For now, we will have one space per server. If I eventually want 
scaliblity, this will have to be parsed out.

### User

```
//User JSON 
{
	GUID:$(User GUID),
	DisplayName:$(String),
	//todo figure out user tokens needed for OAuth2
	//Do I need user stalking? probably not. If I do, it 
}
```

### Topic

```javascript
//Topic JSON
{
	GUID:$(Topic GUID),
	Body:$(Title or URL of post),
	Owner:$(GUID of owner)
	Created:$(Epoch created),
	Updated:$(Created or last comment date),
	Comments:[]//array of comments 
}
```

### Comments

```javascript
//Comment JSON
{
	GUID:$(Comment GUID),
	Owner:{ 
		GUID:$(User GUID),
		DisplayName:$(String)
	},
	Text:$(Contence of text)
	Created:$(Epoch created)
	//for DB reasons, it might make sense to doublely link this; 
	//ie put a GUID of the parrent. Maybe not. we'll see 
}
```

Messages
--------
### GetTopicList

Gets json list of topic titles or links


```javascript
//URL=/API/GetTopicList
//GET
//Returns:
[
	{
		GUID:$(Topic GUID),
		Body:$(Title or URL of post),
		Owner:$(GUID of owner)
		Created:$(Epoch created),
		Updated:$(Created or last comment date),
	},
	//.. more, array
]
```
### GetTopicPage

Same as GetTopicList, but returns 10 (?) at a time.

```javascript
//URL=/API/GetTopicPage/$(PAGE)
//Same format as /API/GetTopicList, but shorter 
```

### GetTopic

gets json list of given topic's messages

```javascript
//URL=/API/GetTopic/$(Topic_GUID)
//GET
//Returns:
{
	GUID:$(Topic GUID),
	Body:$(Title or URL of post),
	Owner:$(GUID of owner)
	Created:$(Epoch created),
	Updated:$(Created or last comment date),
	Comments:[
	{
		GUID:$(Comment GUID),
		Owner:{ 
			GUID:$(User GUID),
			DisplayName:$(String)
		},
		Text:$(Contence of text)
		Created:$(Epoch created)
	},
	//more, array, 
	//maybe this should be transposed for network saving?
	]
	//array of comments 
}
```

### PutTopic

create new topic, either with a title or link, content in body

```javascript
//URL=/API/PutTopic
//PUT
//Put Body:
{
	OwnerGUID:$(User GUID)//TODO replace with tokens!
	Body:$(Some user-input text; link or message or both)
}
```

Note: On Body Error, return error


### PutComment

post comment. content in body

```javascript
//URL=/API/PutComment/$(TopicGUID)
//PUT
//Put Body:
{
	OwnerGUID:$(User GUID)//TODO replace with tokens!
	Body:$(Some user-input text; link or message or both)
}
```

Note: On Body Error, return error


### Poll Space

Returns when new topic is created or comment is added.

```javascript
//URL=/API/PollSpace
//GET
//Returns:
$(Epoch of last content?)
```

### Poll Topic

Returns when comment posted. Client should only subscribe after grabbing
full comment list.

```javascript
//URL=/API/PollTopic/$(Topic_GUID)/$(Epoch of last comment)
//GET
//Returns same as /API/GetTopic/$(Topic_GUID) after put
//If Epoch of last comment != URL input, return immedeately
```
