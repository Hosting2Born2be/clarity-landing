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

## Environment Variables

This project uses Google Sheets API for storing contact form submissions. You need to set up the following:

1. Copy `env.example` to `.env.local`
2. Set up Google Cloud Project and enable Google Sheets API
3. Create a Service Account and download the JSON key file
4. Share your Google Sheet with the service account email
5. Update the following variables in `.env.local`:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Your service account email
   - `GOOGLE_PRIVATE_KEY`: Your service account private key (with \n for line breaks)

### Google Sheets Setup:

1. **Create Google Cloud Project**: Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable Google Sheets API**: In APIs & Services > Library, search for "Google Sheets API" and enable it
3. **Create Service Account**: In IAM & Admin > Service Accounts, create a new service account
4. **Download Key**: Download the JSON key file and extract the email and private key
5. **Share Sheet**: Share your Google Sheet (`1K7ov5VZ4bQlxyGM25jf12Bq_vkHO1kF8uoQxDYCdxmE`) with the service account email
6. **Set Permissions**: Give the service account "Editor" access to the sheet

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
