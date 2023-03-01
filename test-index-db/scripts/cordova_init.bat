cd "../../cordova/mobclient"

IF 1==1 (
cordova platform remove android
cordova platform add android@10.1.2
cordova clean
cordova build

cd %~dp0
)