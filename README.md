# examensarbete-restaurant-webapp
This application turns to the owners of a restaurant.
The idea is that it's going to be fully managble through 
a administration interface with all recipes, ingredients, 
toppings, drinks and so on. And the webpage should represent 
the content that the restaurant owner puts in the interface.
It also handles payments through Stripe and all the succeeded 
orders shown in the administration interface.

So for simplicity I've divided the projekt into:
Client (public webpage) | Admin(admin interface) | Server(API)

## Build and start the project
Add a .env file in the server root file.
What it has to include:
MONGODB_CONNECTION_STRING
STRIPE_SECRET_KEY

### Admin
To start and run Adminpanel start server within terminal.

Server:
$ cd server
$ npm install
$ npm start

Admin Interface:
$ cd admin
$ npm install
$ npm run dev

### Client
To start "public" client website

Server:
$ cd server
$ npm install
$ npm install

Client Webpage:
$ cd client
$ npm install
$ npm run dev