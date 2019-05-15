node {

    //Define all variables
    def environment = "${env.BRANCH_NAME}"

    //Checkout Code from Git
    checkout scm

    //Stage 1 : Build the docker image.
    stage('Build image') {
        sh("docker build -t omicsdi-frontend:${environment} -f Dockerfile.static --build-arg configuration=\"${environment}\" .")
        sh("docker build -t omicsdi-ssr:${environment} -f Dockerfile.ssr --build-arg configuration=\"${environment}\" .")
    }

    //Stage 2 : Deploy Application
    stage('Deploy Application') {
        sh("kubectl get ns ${environment} || kubectl create ns ${environment}")
        sh("sed 's/imageTag/${environment}/g' k8s/*.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/ssr.deployment.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/ssr.service.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/frontend.deployment.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/frontend.service.yaml")
    }
}