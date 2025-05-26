<p align="center">
  <img src="src/app/_images/Logo.svg">
</p>

# Doces da Sunny
> In English, "Sunny's Sweets" 

A webapp I created for my little sister Sunny, who loves to bake all sorts of cakes, cookies, and more! 🍰

I got this idea watching her write down all her recipes in a Notion page. I thought to myself, why not give her a place that is designed specifically with her use case in mind? That way she can filter recipes by ingredients, share them with her friends easily through an url, have a cutesy-bakery-inspired-UI, and me as a slave to implement any new feature she might desire :D

## Technicalities

This project was created with the [T3 Stack](https://create.t3.gg/) and is hosted in Vercel.

### Quick Start
```
npm install
./start-database.sh
npx prisma migrate dev
```

Whenever making changes to the prisma.schema, also run `npx prisma migrate dev` to generate the needed migration(s).

### Authentication
This app uses [Auth.js](https://authjs.dev/) for authentication, with the Google Provider. Regular users can only search, filter, and view recipes. Then there's a whitelist of users who can login using their Google accounts - those also have permissions to edit and delete recipes.
