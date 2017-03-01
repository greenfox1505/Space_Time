#Space Time
A chat application that maintains a single group while allowing multipule conversations at once.

Inspired by Google Space.

#Things that will not be in the proof of concept:
* Extra Space: one "Space" per host
* User Auth: asks for user name on login. doesn't care who that name is
* https: can be implemented via apache proxypass
* DB: for now data will be stored in a variable that dumps to a flat file occationally
* Post Deletes: I'll probably just delete lines from JSON by hand for now.
* Admin Powers: at some point, I'd like to have admin level features
* Push Notifications: high priority, but hard to implement... we'll see
* App: web exclusive due to limited project scope and workers
* Business Model: lol
* BelowTheFold: someday, will will have too much data for one page load; we'll cross that bridge later

#This this proof of concept WILL have:
* LogIn: ask for user name. That's stored locally.
* Posting: everyone can post.
* Viewing: everyone can veiw a list of all posts and comment
* PostTimes: every interaction will be timestamped (mostly writen here so I don't forget to do this
* Reload: server will preserve data on reboot by dumping to flat JSON file

#Layout
todo: talk about layouts? CSS is hard... Bootstrap and Angular will probably be involved.

#Network Messages
A basic explination of how each network payload is implemented

##GetTopicList
URL=/API/GetTopicList
gets json list of topic titles or links

##PutTopic
URL=/API/PutTopic
create new topic, either with a title or link, content in body

##GetTopic
URL=/API/GetTopic/$(Topic_UUID)
gets json list of given topic's messages

##PutComment
URL=/API/PutComment
post comment. content in body


#Host
Basic host. Takes messages, adds it to fat var. Posts status on request. Hosts static pages.


#Client
Angular. Bootstrap. Nothing exciting. 


