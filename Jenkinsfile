pipeline {
  agent any
  tools {
    nodejs "node"
  }
  stages {
      stage('checkout') {
        steps {
          scmSkip(deleteBuild: true, skipPattern:'.*\\[ci skip\\].*')
        }
      }

    stage('build') {
      steps {
        sh 'npm install'
        
        withCredentials([usernamePassword(credentialsId: 'github-token-dmytrozuyenko', passwordVariable: 'github_token', usernameVariable: 'github_user')]) {
          sh 'git checkout develop'
          sh 'npm version patch -no-git-tag-version --force'
          sh 'git add package.json'
          sh 'git commit -m "[ci skip]"'
          sh 'git push https://${github_token}@github.com/${github_user}/home-ui.git --force'
        }
        
        script {
          packagejson = readJSON file: './package.json'
        }
        
         sh 'echo "/*\n!dist/*" > .npmignore'
        sh 'npm run build'
      }
    }
    
    stage('parallel') {
      parallel {
        stage('test:unit') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              sh 'npm run test:unit -- --testPathIgnorePatterns src/components/__tests__/EditCooperationForm.spec.ts src/components/__tests__/AddHouseForm.spec.ts src/components/__tests__/AddApartmentForm.spec.ts src/views/__tests__/RegisterCooperation.spec.ts src/views/__tests__/CooperationInfo.spec.ts src/views/__tests__/CooperationPolls.spec.ts'
            }
          }
        }
        stage('test:coverage') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              sh 'npm run test:coverage'
            }
          }
        }
        stage('test:lint') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              sh 'npm run lint'
            }
          }
        }
      }
    }
    
    stage('sonarqube') {
      steps {
        script {
          def scannerHome = tool 'sonarqube';
          withSonarQubeEnv('sonarqube') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=home-ui -Dsonar.projectVersion=${packagejson.version} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
          }
        }
      }
    }
    
    stage("Quality gate") {
      steps {
        waitForQualityGate abortPipeline: false
      }
    }  
  
    stage('publish') { 
      steps {
        withCredentials([string(credentialsId: 'nexus-token', variable: 'nexus_token')]) {
          sh 'echo \"registry=http://35.225.255.93:8081/repository/home-ui/\n_authToken=${nexus_token}" > .npmrc'
        }
        sh 'npm install -g npm-cli-login'
        withCredentials([usernamePassword(credentialsId: 'nexus-user', passwordVariable: 'nexus_pass', usernameVariable: 'nexus_user')]) {
          sh "npm-cli-login -r http://35.225.255.93:8081/repository/home-ui/ -u ${nexus_user} -p ${nexus_pass} -e dmytrozuyenko@gmail.com"
          sh "npm publish --registry http://35.225.255.93:8081/repository/home-ui/"
        }
      }
    }

    stage('deploy') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'nexus-user', passwordVariable: 'nexus_pass', usernameVariable: 'nexus_user')]) {
          sh "wget -O /var/lib/jenkins/userContent/home-${packagejson.version}.tgz --user ${nexus_user} --password ${nexus_pass} http://35.225.255.93:8081/repository/home-ui/home/-/home-${packagejson.version}.tgz"
          sh "tar zxvf /var/lib/jenkins/userContent/home-${packagejson.version}.tgz -C /var/lib/jenkins/userContent/home-latest"
        }
        build job: 'home-ui_infra/main'
//        sh "rm /var/lib/jenkins/userContent/home-${packagejson.version}.tgz"
//        sh "rm -rf /var/lib/jenkins/userContent/home-latest"
      }    
    }
  }
  
  post {
    success {            
      withCredentials([string(credentialsId: 'telegram-token-home-ui', variable: 'telegram_token'), string(credentialsId: 'telegram-chatid-home-ui', variable: 'telegram_chatid')]) {
        sh  ("""
          curl -s -X POST https://api.telegram.org/bot${telegram_token}/sendMessage -d chat_id=${telegram_chatid} -d parse_mode=markdown -d text='*${env.JOB_NAME}* : POC *Branch*: ${env.GIT_BRANCH} *Build* : OK *Published* = YES'
        """)
      }
    }	   
    aborted {             
      withCredentials([string(credentialsId: 'telegram-token-home-ui', variable: 'telegram_token'), string(credentialsId: 'telegram-chatid-home-ui', variable: 'telegram_chatid')]) {
        sh  ("""
          curl -s -X POST https://api.telegram.org/bot${telegram_token}/sendMessage -d chat_id=${telegram_chatid} -d parse_mode=markdown -d text='*${env.JOB_NAME}* : POC *Branch*: ${env.GIT_BRANCH} *Build* : `Aborted` *Published* = `Aborted`'
        """)
      }
    }
    failure {
      withCredentials([string(credentialsId: 'telegram-token-home-ui', variable: 'telegram_token'), string(credentialsId: 'telegram-chatid-home-ui', variable: 'telegram_chatid')]) {
        sh  ("""
          curl -s -X POST https://api.telegram.org/bot${telegram_token}/sendMessage -d chat_id=${telegram_chatid} -d parse_mode=markdown -d text='*${env.JOB_NAME}* : POC *Branch*: ${env.GIT_BRANCH} *Build* : `not OK` *Published* = `no`'
        """)
      }
    }
    always {
    deleteDir()
    }	    
  }
}
