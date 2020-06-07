/**
* Capacitor Jenkinsfile
*/

APP_NAME = "A-COP"
KEY_FILE = "${APP_NAME}.keystore"
PLATFORM = "android"
BUILD_PARAM = "--prod --release"

pipeline {
    agent any
    stages {
        stage('NPM Setup') {
            steps {
                bat "npm install"
            }
        }
        stage('Add Platform') {
            steps {
                bat "rmdir /S /Q ${PLATFORM}"
                bat "C:/Users/sumit/AppData/Roaming/npm/ionic build"
                bat "C:/Users/sumit/AppData/Roaming/npm/ionic cap add ${PLATFORM}"
                bat "C:/Users/sumit/AppData/Roaming/npm/ionic cap copy"
                bat "C:/Users/sumit/AppData/Roaming/npm/ionic cap sync"
            }
        }
        stage("Platform Build") {
            steps {
                bat "C:/Users/sumit/AppData/Roaming/npm/ionic cap build ${PLATFORM} ${BUILD_PARAM}"
            }
        }
        stage('APK KeyGen') {
            steps {
                bat "C:/Program Files/Java/jdk1.8.0_251/bin/keytool -genkey -v -keystore ${KEY_FILE} -alias ${APP_NAME} -keyalg RSA -keysize 2048 -validity 10000"
            }
        }
        stage('APK Sign') {
            steps {
                bat "C:/Program Files/Java/jdk1.8.0_251/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${KEY_FILE} ${APP_NAME}-release-unsigned.apk ${APP_NAME}"
            }
        }
        stage('APK Align') {
            steps {
                bat "C:/Users/sumit/AppData/Local/Android/Sdk/build-tools/28.0.3/zipalign -v 4 ${APP_NAME}-release-unsigned.apk ${APP_NAME}.apk"
            }
        }
    }
}
