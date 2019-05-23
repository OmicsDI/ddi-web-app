node {

    //Define all variables
    def environment = "${env.BRANCH_NAME}"
    if (environment == "master") {
        environment = "prod"
    }
    def imgTag = "omicsdi.${environment}.${env.BUILD_NUMBER}"

    //Checkout Code from Git
    checkout scm

    //Stage 1 : Build the docker image.
    stage('Build image') {
        sh("docker build -t omicsdi/omicsdi-frontend:${imgTag} -f Dockerfile.static --build-arg configuration=\"${environment}\" .")
        sh("docker build -t omicsdi/omicsdi-ssr:${imgTag} -f Dockerfile.ssr --build-arg configuration=\"${environment}\" .")
    }

    //Stage 2 : Push the image to docker registry
    stage('Push image to registry') {
        sh """
            docker login -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD}          
            docker push omicsdi/omicsdi-frontend:${imgTag}
            docker push omicsdi/omicsdi-ssr:${imgTag}
        """
    }

    //Stage 3 : Deploy Application
    stage('Deploy Application') {
        sh("kubectl get ns ${environment} || kubectl create ns ${environment}")
        sh("sed 's/omicsdi.dev.01/${imgTag}/g' k8s/*.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/ssr.deployment.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/ssr.service.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/frontend.deployment.yaml")
        sh("kubectl --namespace=${environment} apply -f k8s/frontend.service.yaml")
    }
}