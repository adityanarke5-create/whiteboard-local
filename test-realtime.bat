@echo off
echo Testing real-time collaboration setup...

echo.
echo 1. Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo 2. Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo 3. Testing WebSocket connection...
node test-websocket.js

echo.
echo 4. Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Setup complete! 
echo - Backend: http://localhost:3001
echo - Frontend: http://localhost:3000
echo.
echo Open two browser tabs to test real-time collaboration.
pause