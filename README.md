# Reelify - A Reels Web App

Reelify is a modern web application that allows users to post and share reels of themselves. Built with Next.js, it features authentication via NextAuth and uses MongoDB as the database.

## 🚀 Features
- User authentication using **NextAuth**
- Secure password handling with **bcryptjs**
- Reels posting and management
- Responsive UI with **TailwindCSS & DaisyUI**
- Media storage and optimization using **ImageKit**
- Database integration with **MongoDB & Mongoose**

## 🛠 Tech Stack
- **Frontend:** Next.js, React, TailwindCSS, DaisyUI, Lucide-React
- **Backend:** Next.js API routes, Mongoose, MongoDB
- **Authentication:** NextAuth.js
- **Media Storage:** ImageKit
- **Other Libraries:** React Hook Form, ESLint, TypeScript

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/reelify.git
   cd reelify
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```sh
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=mongodb+srv://your_mongo_db_url
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## 🔧 Scripts
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Start:** `npm run start`
- **Lint:** `npm run lint`

## 📌 Live Demo
[Reelify Live](https://reelify-ivory.vercel.app/)

## Images
![image](https://github.com/user-attachments/assets/e8b9ea6a-8511-40f7-8368-fb3093f66098)
![image](https://github.com/user-attachments/assets/f0982d48-90fa-4ff9-8373-738bf219b729)


