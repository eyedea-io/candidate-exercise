# Eyedea.io - exercise app
## What's this?

This is the exercise app. Your goal is to create a simple app with authorization and your own basic data store.

## What do you have:

- A simple React app with the single component view (App.tsx)
- Three components (Header, Sidebar, Content) that represent certain areas of the app
- A simple node.js-based API service that is capable of:
  - Registering new user (POST /register)
  - Logging in existing user (POST /login)
  - Retrieving some super-secret data available only for registered users (GET /secret-data)

## What do you need to do: 

1. Create super-simple register and login view (both features can be on a single screen).
  - Main view (`App.tsx`) should not be available for unauthorized users.
  - You can set up another route (`/login`) for this form.
  - Simple validation: e-mail need to be an e-mail, password need to be set and have at least 5 characters and at lest one large letter.
  - Logging out need to be invoked by the button in the top-right corner of the app (in the `<Header />` component). After logout, user should be redirected to the login form again.
2. Create a "store" object/class that will be responsible for keeping the application's internal data globally. The backbone for this is already coded (`src/store/store.ts`).
  - The store would work just like in redux or mobx libraries - it's an object where the data resides in.
  - In this particular case, the store is for keeping authenticated user data and the "secret" data fetched from the API.
  - We want to have a reaction system - if something changed in the store, then the interested components will know about the change and reflect this by rerendering.
3. In the `<Content />` component, there is a "click here" button that should fetch "secret" data from the API - but only for registered users (see API docs below).
  - After fetching secret data, it should be saved in the store.
  - After the secret data is saved in the store, `<Header />` and `<Sidebar />` should know about it and render the data inside themselves (there's a yellow placeholder for that).

## Where's the catch?

- As you can see, you need to invent your own simple data management system. No redux, no mobx - you're on your own. Make use of established coding design patterns and whatever react is providing out of the box.
- Speaking of authentication - there is no library as well. No passport.js, no other thing. Just fiddle with payloads and headers and you will be fine.

## API docs

Running the API:

```sh
npm run start-api
# OR
yarn start-api
```

This API runs on `localhost:4000` by default.
You can read the API's code by yourself, but there's also docs here:

### POST `/register`

```ts
// Payload:
{
  email: "email@address.com",
  password: "this is a password"
}
```

Possible outcomes: 
- HTTP 200: OK
- HTTP 400: Bad request

### POST `/login`

```ts
// Payload:
{
  email: "email@address.com",
  password: "this is a new password"
}

```

Possible outcomes: 
- HTTP 200: Login successful, there's a `token` field in the response JSON with the JWT token.
- HTTP 400: Bad request (probably user already exists).
- HTTP 401: Credentials are bad.

### GET `/secret-data`

You need to pass `Authorization` header with value ` Bearer <VALID_TOKEN_HERE>` in order to get the data.

Possible outcomes: 
- HTTP 200: OK, there's a `secretInfo` field in the response JSON with the secret information
- HTTP 401: Credentials are bad


## Good luck!
