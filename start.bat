@echo off
echo Starting HR Caller Application...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed or not in PATH. Please install Python 3.8+ and try again.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or not in PATH. Please install Node.js 16+ and try again.
    pause
    exit /b 1
)

REM Start backend
echo Starting backend server...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat
pip install -r requirements.txt >nul 2>&1

echo Starting FastAPI server on http://localhost:8000
start "Backend Server" cmd /k "uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo Starting frontend server...
cd ..\frontend

REM Install dependencies
npm install >nul 2>&1

echo Starting React development server on http://localhost:3000
start "Frontend Server" cmd /k "npm start"

echo.
echo HR Caller is starting up...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Both servers are now running in separate windows.
echo Close the windows to stop the services.
pause 