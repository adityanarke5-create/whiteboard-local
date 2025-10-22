# CollabBoard Frontend

This is the frontend application for the CollabBoard collaborative whiteboard.

## Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── board/        # Board page
│   │   ├── dashboard/    # Dashboard page
│   │   └── ...           # Other pages
│   ├── components/       # Reusable React components
│   └── ...
└── ...
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## Features

- **Real-time Collaboration**: Multiple users can work on the same whiteboard simultaneously
- **Drawing Tools**: Pen, shapes, text, and eraser tools
- **Export Options**: Export boards as PNG, JPG, SVG, or JSON
- **User Authentication**: Secure authentication with AWS Cognito
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Board Management**: Create, view, and manage multiple boards

## Authentication

The frontend uses AWS Cognito for user authentication. For development purposes, authentication state is stored in localStorage.

## Real-time Collaboration

Real-time collaboration is implemented using Socket.io. The frontend connects to the WebSocket server to receive real-time updates from other users.

## Components

### Whiteboard
The main canvas component that uses Fabric.js for drawing capabilities.

### Toolbar
Provides drawing tools, color selection, and export options.

### Authentication Pages
Sign-in and sign-up pages for user authentication.

### Dashboard
Displays a grid of user boards and allows creation of new boards.

### Board Page
The main whiteboard interface where users can collaborate in real-time.