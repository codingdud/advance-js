@echo off
echo ================================
echo Setting up TypeScript + Jest
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo [OK] NPM version:
npm --version
echo.

echo Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================
    echo Setup completed successfully!
    echo ================================
    echo.
    echo Available commands:
    echo   npm test              - Run all tests
    echo   npm run test:watch    - Run tests in watch mode
    echo   npm run test:coverage - Run tests with coverage report
    echo   npm run test:verbose  - Run tests with verbose output
    echo.
    echo Quick start: npm test
    echo.
) else (
    echo.
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

pause
