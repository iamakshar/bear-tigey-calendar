# Bear & Tigey Calendar

## Deploy (one time, ~2 min)

1. Install Vercel CLI if you don't have it:
   npm i -g vercel

2. From this folder, run:
   vercel

   - Log in with your Vercel account (GitHub/email)
   - When asked "Set up and deploy?" -> Yes
   - Project name: bear-tigey-calendar (or whatever)
   - Link to existing project? No
   - Accept defaults for everything else

3. After it deploys, run:
   vercel --prod

4. You'll get a URL like https://bear-tigey-calendar.vercel.app
   That's your shared calendar link. Bookmark it on both phones
   (Add to Home Screen for app-like feel).

## Storage setup (also one time)

The first deploy needs a Blob store connected so data can be saved:

1. Go to vercel.com -> your project -> Storage tab
2. Click "Create Database" -> choose "Blob"
3. Connect it to this project (it auto-adds BLOB_READ_WRITE_TOKEN)
4. Redeploy: vercel --prod

That's it. From then on, anything either of you taps saves instantly
and shows up for both of you.
