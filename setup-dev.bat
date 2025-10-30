@echo off
echo Setting up development environment...

echo.
echo Installing root dependencies...
call npm install

echo.
echo Installing backend dependencies...
cd backend
call npm install

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install

echo.
echo Running database migration...
cd ..\backend
call npx prisma migrate dev

echo.
echo Generating Prisma client...
call npx prisma generate

echo.
echo Setup complete! You can now run:
echo   npm run dev (from root directory)
echo   or
echo   dev.bat

cd ..
pause