# Local Development API Server
## Usage
#### Get Restaurants
```
curl "http://localhost:1337/restaurants"
```
#### Get Restaurants by id
````
curl "http://localhost:1337/restaurants/{3}"
````

## Architecture

### Local server

- Node.js
- Sails.js

### App

- Vue.js (Frontend Framework)
- Webpack

## Contributors

- [Brandy Lee Camacho - Technical Project Manager](mailto:brandy.camacho@udacity.com)
- [David Harris - Web Services Lead](mailto:david.harris@udacity.com)
- [Omar Albeik - Frontend engineer](mailto:omaralbeik@gmail.com)

## Getting Started

### Development local API Server

_Location of server = /server_
Server depends on [node.js LTS Version: v8+ ](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm), and [sails.js](http://sailsjs.com/)
Please make sure you have these installed before proceeding forward.

Great, you are ready to proceed forward; awesome!

Let's start with running commands in your terminal, known as command line interface (CLI)

#### Install project dependancies

```Install project dependancies
# npm i
```

#### Build Project Assets

```Build Assets
# npm run build:prod
```

##### Install Sails.js globally

```Install sails global
# npm i sails -g
```

###### Start the server

```Start server
# npm start
```

### You should now have access to your API server environment

debug: Environment : development
debug: Port        : 1337

## Endpoints

### GET Endpoints

#### Get all restaurants

```
http://localhost:1337/restaurants/
```

#### Get favorite restaurants

```
http://localhost:1337/restaurants/?is_favorite=true
```

#### Get a restaurant by id

```
http://localhost:1337/restaurants/<restaurant_id>
```

#### Get all reviews for a restaurant

```
http://localhost:1337/reviews/?restaurant_id=<restaurant_id>
```

#### Get all restaurant reviews

```
http://localhost:1337/reviews/
```

#### Get a restaurant review by id

```
http://localhost:1337/reviews/<review_id>
```

#### Get all reviews for a restaurant

```
http://localhost:1337/reviews/?restaurant_id=<restaurant_id>
```


### POST Endpoints

#### Create a new restaurant review

```
http://localhost:1337/reviews/
```

###### Parameters

```
{
    "restaurant_id": <restaurant_id>,
    "name": <reviewer_name>,
    "rating": <rating>,
    "comments": <comment_text>
}
```


### PUT Endpoints

#### Favorite a restaurant

```
http://localhost:1337/restaurants/<restaurant_id>/?is_favorite=true
```

#### Unfavorite a restaurant

```
http://localhost:1337/restaurants/<restaurant_id>/?is_favorite=false
```

#### Update a restaurant review

```
http://localhost:1337/reviews/<review_id>
```

###### Parameters

```
{
    "name": <reviewer_name>,
    "rating": <rating>,
    "comments": <comment_text>
}
```


### DELETE Endpoints

#### Delete a restaurant review

```
http://localhost:1337/reviews/<review_id>
```

### Credits

- Favicon are from [Baianat's Blob Icon free project](https://www.baianat.com/resources/blobs/).
