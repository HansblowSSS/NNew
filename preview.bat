@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   LI TIANLE - Portfolio  ·  Local Preview
echo ============================================
echo.

REM Stop any existing process on 5173
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
  echo [cleanup] stopping existing process on port 5173 (PID %%P)
  taskkill /F /PID %%P >nul 2>&1
)

echo.
echo [start] launching Vite dev server...
echo.

REM Start Vite (this is foreground; close the window to stop)
call npx vite --host 0.0.0.0 --port 5173

endlocal
