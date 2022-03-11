# [ PIR APP ] (╯°□°）╯︵ ┻━┻

![img](https://www.fundacionmapfre.org/media/blog/padel-1194x585-1.jpg)

[![usesFastify](/static/badges/uses-fastify.svg)](https://www.fastify.io)
[![usesMongoDB](/static/badges/uses-mongodb.svg)](https://www.mongodb.com/es)
[![usesReact](/static/badges/uses-react.svg)](https://es.reactjs.org)
[![usesNext.js](/static/badges/uses-next.js.svg)](https://nextjs.org)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://www.typescriptlang.org)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

# Project & Motivation 🐱‍🏍✨

## What is PIR?

**PIR** stands for **Padel Indoor Rubi** and it's meant to be a Web Application _(with posibilites of going to mobile version in the future...)_ that enables regular and non-regular users of the Padel Indoor Rubi installations an easy way to **look** and **book** paddle tracks.

## What else can PIR do?
- Keep updated the user with the latest news about the center, championships, tournaments...
- Propose open games so random people can join you to play!
- Give the user the opportunity to contact with the center.
- And, under discussion, there'll be a section to publish your offers as a personal trainer and the users would be able to contact you.


## Why am I doing it?
Actually, already exists a [web](https://www.padelindoorrubi.com/#1) but a few days ago I wanted to book a track to play with a friend and I found myself like:

![WTF](https://videohive.img.customer.envatousercontent.com/files/f0f6c61d-4a46-4f23-8e18-5c57cf7200e9/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=1234af1e409732026deae86b88e255f7)

Ok, I recognize it. I looked kinda boomer... but it took me a while to understand how the web works and get the booking done. 

So, I decided to try and create a better looknig and way more intuitive than the current web app...

# Project Structure 🌳🐱‍💻
Currently it's a monorepo project build like:
```
[ pir root folder ]
    ├── static
    │
    ├── packages
    │    ├── front
    │    │    ├── ...
    │    │    └── package.json
    │    │
    │    └── back
    │         ├── ...
    │         └── package.json
    │
    ├── .eslintrc
    ├── .gitignore
    ├── package.json
    ├── lerna.json
    └── README.md
```
- Backend build with Fastify

    - **Once the server is running** you can check the API documentation at: 
    [http://127.0.0.1:5000/api/doc](http://127.0.0.1:5000/api/doc)

- Frontend build with Nextjs

- Security build with Auth0

## Database
![db](/packages/back/db/db-img.PNG)

## Models
```yaml
- User
    - authID: String
    - skillLevel: String

- Track
    - _id: ObjectID
    - trackNum: Number
    - trackType: String

- Bookings
    - _id: String
    - trackID: ITrack['_id']
    - userID: IUser['authID']
    - bName: String
    - bEmail: String
    - bDate: String
    - initTime: String
    - duration: Number
    - openGame: Boolean
    - host: String
    - players: Array<String>
    - minSkill: String
    - maxSkill: String
    - stillJoinable: Boolean

- News
    - _id: String
    - createdAt: Timestamp
    - updatedAt: Timestamp
    - title: String
    - body: String
    - author: IUser['authID']
```
# Contribute 🚀💥

### Clone the project into your machine 
```bash
git clone https://github.com/RealNarukyn/pir.git
```

### Move into the cloned repo
```bash
cd pir
```

### Install all the dependencies with lerna using the command install
```bash
npm run install
```

### To run both [ server & front ] at the same time, execute
```bash
npm run dev
```