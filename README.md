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

ionic build

ionic cap copy

ionic cap sync

ionic cap open android //one time run
ionic cap run android -l --external //live