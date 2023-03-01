call npm run-script buildMob 2<&1 || exit /b 1
ECHO Continuing...

cd "../../cordova/mobclient"

if exist "www" DEL /F /Q "www"

mkdir www
robocopy /s "../../test-index-db/public/build" "www"

IF 1==1 (
cordova clean
cordova build android --release

cd %~dp0
cd "../../cordova/mobclient/platforms/android/app/build/outputs/apk/release"
ren app-release.apk mob_index_db.apk
cd %~dp0
)
pause