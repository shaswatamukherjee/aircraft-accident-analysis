# Welcome to the repository of Aircraft Accident Analysis

This is a monorepo comprising of both frontend and backend. For more details of the frontend and backend application, kindly check /angular-app/README.md and /backend/README.md

## Build of the project

You need to have docker installed and configured at your end. From the root of the project, run the following command:
```
docker build --no-cache -t cdk-app .
```

## Build of the project

You need to have docker installed and configured at your end. From the root of the project, run the following command:
```
docker run -e AWS_ACCESS_KEY_ID=<your-access-key> -e AWS_SECRET_ACCESS_KEY=<your-secret> -e AWS_DEFAULT_REGION=eu-west-1 -it --rm cdk-app
```