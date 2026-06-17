pipeline {
  agent any

  environment {
    S3_BUCKET = 'andriod-apk11'
    APK_PATH = 'android/app/build/outputs/apk/release/app-release.apk'
    JAVA_HOME= '/usr/lib/jvm/java-1.17.0-openjdk-amd64'

  }

  stages {
    stage('1. Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/akshayshetty709/personal-finance-mobile.git'
      }
    }

    stage('2. npm install') {
      steps {
        sh "rm -rf node_modules"
        sh "npm ci"
      }
    }

    stage('3. prebuild') {
      steps {
        sh "npx expo install --fix"
        sh "npx expo prebuild"
      }
    }

    stage('4. build apk file') {
      steps {
        sh '''
          cd android &&
          chmod +x gradlew &&
          ./gradlew assembleRelease --stacktrace
        '''
      }
    }

    stage('5. Upload APK to S3') {
      steps {
          withCredentials([
                    aws(credentialsId: 'AWS-Cred', 
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
           sh """
                        aws s3 cp ${APK_PATH} s3://${S3_BUCKET}/releases/app-release-${BUILD_NUMBER}.apk
 
                        aws s3 cp ${APK_PATH} s3://${S3_BUCKET}/latest/app-release.apk
                    """
       }
      }
    }
  }
}
