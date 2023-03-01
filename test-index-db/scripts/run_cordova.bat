call npm run-script buildMob 2<&1 || exit /b 1
ECHO Continuing...

cd "../../cordova/mobclient"

REM if exist "www" DEL /F /Q "www"

mkdir www
robocopy /s "../../test-index-db/public/build" "www"

IF 1==1 (
cordova clean
cordova build
cordova run

cd %~dp0
)
pause