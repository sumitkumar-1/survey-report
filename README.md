# Ionic App 

Ionic Application for Android and IOS, generate site survey report using this application.

# Version Info
Node Version: v10.16.0

npm Version: 6.9.0

Ionic Version: 6.6.0

# Capicator support commands
ionic integrations enable capacitor

ionic build

ionic cap add ios

ionic cap add android

ionic cap copy

ionic cap sync

ionic cap open ios => (requires IOS)

ionic cap open android

# DataBase Support
npm install @ionic-native/sqlite

ionic cordova plugin add cordova-sqlite-storage

npm install @ionic-native/sqlite-porter

ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter

# Android Permission Support
npm install cordova-plugin-android-permissions
npm install @ionic-native/android-permissions
ionic cap sync

# Debug Support
ionic build

ionic cap copy

ionic cap sync

ionic cap open android //one time run
ionic cap run android -l --external //live

# ADB Register Device
goto c:/adb/platform_tool
run cmd
    adb devices // (Allow in phone)

# ADB to run emulator as root
$ > adb shell
generic_x86:/ $
generic_x86:/ $ exit
$ > adb root
restarting adb as root
$ > adb shell
generic_x86:/ #

# ADB to run sqlite database
adb devices
adb -s emulator-xxxx shell
run-as <your-package-name> 
cd data/data/<your-package-name>/databases/
sqlite3 <your-db-name>.db
