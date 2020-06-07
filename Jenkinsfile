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
                bat "set PATH=C:/Users/sumit/AppData/Roaming/npm"
                bat "ionic cap add ${PLATFORM}"
            }
        }
        stage("Platform Build") {
            steps {
                bat "ionic cap build ${PLATFORM} ${BUILD_PARAM}"
            }
        }
        stage('APK KeyGen') {
            steps {
                bat "keytool -genkey -v -keystore ${KEY_FILE} -alias ${APP_NAME} -keyalg RSA -keysize 2048 -validity 10000"
            }
        }
        stage('APK Sign') {
            steps {
                bat "jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${KEY_FILE} ${APP_NAME}-release-unsigned.apk ${APP_NAME}"
            }
        }
        stage('APK Align') {
            steps {
                bat 'set PATH=C:/Users/sumit/AppData/Local/Android/Sdk/build-tools/28.0.3'
                bat "zipalign -v 4 ${APP_NAME}-release-unsigned.apk ${APP_NAME}.apk"
            }
        }
    }
}
