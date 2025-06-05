This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


HOW IT WORKS? 

The website uses App Router so that means by default all calls are SSR, except those when we use "use client"
with that in mind lets proceed.

HOME PAGE
1-load the page and the page.tsx makes a call to the NewsApi to get the news from BBC, using SSR.
2-news are stored into "news = data.articles" 
3-we use a .map to list all the news inside the "news array".

DETAILS VIEW
1-When you click on the "Read More" button it redirects to "SingleNew" component using the "url" prop of the item
    as reference because news doesn't have id or category. (Thanks Api)
2-On this page also loads all the news from BBC so then it can compare which new has the same "url prop"
    to print its data.
    Note: Because we are using SSR on this view it is not possible to use a Hook or context to send the data
    easily between components. 

FILTERS / CATEGORIES
This component is basically a list with links, each link sends its name/value.

1-Each time a link/ctegory is clicked the context is updated (we use "use client" on this
    component so its managed on client side in order to user Context API) 
Note: it has a button to clear filters/context it is visible if there is a context selected.
2-At the same time the Service is called which redirects to the api folder in order to complete
    the URL / endpoint to make the call to the external API from NewsApi.
3-Because of structure of App Router and because it is SSR it is not possible to read data
    from .env file unless it is on a SSR file, so we use it inside the api/news/route.js file
    to make it safe. 
4-we receive and print the data inside CategoryList component which is called inside the "home"

DETAILS OF A FILTERED NEW

Each filetered new has a "Read More link, once you click on it calls to
"SingleNewFiltered" Component which works as a service and calls directly the API using
our api/news/route.js to properly create the URL and load all the news of the selected
category. 

Note, we need to go to api/news/route because in order to get the selected category to send
into the URL we need to use "use client" on "SingleNewFiltered" component to use the context 
and get the selectedCategory.

Then, on the api folder we make the call and get all the news, after that we compare
which new has the same "url prop" and print its data. 


