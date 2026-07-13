@echo off
setlocal enabledelayedexpansion

echo.
echo [94m^(^)^(^) Tajikistan Learning App[0m
echo [94m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [93mWARNING: Node.js is not installed. Please install Node.js 16+ from https://nodejs.org[0m
    exit /b 1
)

echo [92mOK[0m Node.js version:
node -v
echo [92mOK[0m npm version:
npm -v
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo [94mInstalling dependencies...[0m
    call npm install
    if !ERRORLEVEL! NEQ 0 (
        echo [93mWARNING: npm install failed[0m
        exit /b 1
    )
    echo [92mOK[0m Dependencies installed
    echo.
) else (
    echo [92mOK[0m Dependencies already installed
    echo.
)

REM Check for .env.local
if not exist ".env.local" (
    echo [93mWARNING: .env.local not found[0m
    echo [94mSetting up environment variables...[0m
    echo.
    copy .env.example .env.local
    echo [93mPlease edit .env.local and add your OpenAI API key:[0m
    echo    VITE_OPENAI_KEY=sk-...
    echo.
    echo [94mThen run this script again.[0m
    echo.
    exit /b 1
) else (
    echo [92mOK[0m .env.local configured
    echo.
)

REM Start the dev server
echo [94mStarting development server...[0m
echo.
echo [92mThe app will be available at:[0m
echo [94m   http://localhost:5173[0m
echo.
echo [93mPress Ctrl+C to stop the server[0m
echo.

call npm run dev
