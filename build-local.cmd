@echo off
setlocal enabledelayedexpansion

REM Local Windows build wrapper.
REM
REM Why this exists: on this machine, Node 24.x crashes natively
REM (exit code -1073740791 / 0xC0000409, STATUS_STACK_BUFFER_OVERRUN)
REM inside Astro's client-script bundling step, regardless of bundler
REM (reproduced on both Vite 8/rolldown and Vite 6/rollup). Node 20 LTS
REM does not crash. Cloudflare Pages builds with NODE_VERSION=20, so
REM this wrapper just matches that locally without touching the
REM machine's global Node version.

set "NODE20=%LOCALAPPDATA%\nvm\v20.20.2\node.exe"

if not exist "%NODE20%" (
  echo [build-local] Node 20.20.2 not found at "%NODE20%".
  echo [build-local] Install it with: nvm install 20.20.2
  echo [build-local] ^(requires nvm-windows; see https://github.com/coreybutler/nvm-windows^)
  exit /b 1
)

echo [build-local] Using Node 20:
"%NODE20%" --version
if errorlevel 1 exit /b 1

echo [build-local] Running astro build...
"%NODE20%" node_modules\astro\astro.js build
if errorlevel 1 (
  echo [build-local] astro build failed.
  exit /b 1
)

echo [build-local] Resolving pagefind CLI entry...
set "PAGEFIND_BIN="
set "PF_TMP=%TEMP%\build-local-pagefind-bin.txt"
"%NODE20%" -p "require('./node_modules/pagefind/package.json').bin" > "%PF_TMP%"
if errorlevel 1 (
  echo [build-local] Failed to read node_modules\pagefind\package.json.
  del "%PF_TMP%" >nul 2>&1
  exit /b 1
)
set /p PAGEFIND_BIN=<"%PF_TMP%"
del "%PF_TMP%" >nul 2>&1

if "%PAGEFIND_BIN%"=="" (
  echo [build-local] Could not resolve pagefind bin path from node_modules\pagefind\package.json.
  exit /b 1
)

echo [build-local] Running pagefind (node_modules\pagefind\%PAGEFIND_BIN%)...
"%NODE20%" "node_modules\pagefind\%PAGEFIND_BIN%" --site dist
if errorlevel 1 (
  echo [build-local] pagefind failed.
  exit /b 1
)

echo [build-local] Build complete.
exit /b 0
