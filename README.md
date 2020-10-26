# CyberCard

# API Server

This repo is the server side backend for the CyberCard applicaion.

## Deployment

Live deployment of this API server running at <https://dry-scrubland-36737.herokuapp.com>

Live demo client running on <https://cybercard.vercel.app/>

## API ENDPOINTS:

**/api/auth**

> POST /login
>
> > Retreives user from db and compares user_name/password sent from client request to values in db. If credentials match, a jwt token is created and the response returns the jwt authToken, the user role, and the user unique id

**/api/cards**

> GET /
>
> > Returns cards from db. If ‘deckid’ is not provided in query string, all cards are returned. If ‘deckid” is provided, only cards in the specified deck are returned

**/api/decks**

> GET /
>
> > Returns decks from db. If ‘userid’ is not provided in query string, all decks are returned. If ‘userid’ is provided, only decks linked to the specified user are returned

> POST /
>
> > Deck is created using specified ‘deck_name’ string from request body, and id of newly created deck is used to add specified ‘cards’ to deck and to link students with access to the ‘deck’ (‘cards’ and ‘students’ are entity id arrays from the request body and rows are added to the the appropriapirate link tables. Returns new deck id

**/api/users**

> GET /students
>
> > Returns all users with a role of ‘Student’

## Tech

This backend server API potion of the application utilizes Node and Express and stores/accesses data in a PostgreSQL database.
