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

#Next Steps:
* Real Login: Firebase or other oauth log in system
* Deletes: Admin or Poster can delete their stuff //maybe. Considering a IRC model
* Material: this CSS sucks!
* Card based layout
* Rework comments: needs GUID? Maybe? Deletes need accounting
* Better Update Sys: see below!
* LINK PARSING!: holy damn, I need link parsing bad...
* NO MORE ALERT BOXES!: is stupid...
* Sort: Options? Or just sort by recant comment?

#Update Page System:
I need to write a system for better managing updates. At the moment, I 
request a page every secound and update my page when that text is changed.

That sucks. It's slow, requires lots of additional connection, and uses
undreds of times more bandwidth than it needs to.

There are several new ways I could do this. Websockets may be the 
easiest, but they are also probably the least standard. Its not 
supported by ExpressJS without extra plugins. I could just leave the 
connection open and then just push changed content to cleint on request.
That could result in lots of extra unneeded connections.

I'm going to ask Reddit and work on something else for now.

#Network Stuffs
See API.MD


#Layout
todo: talk about layouts? CSS is hard... Bootstrap and Angular will probably be involved.


