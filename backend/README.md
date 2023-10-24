
# Welcome to your Backend Python project!

This is a project with Python to create resources that would help to analyze the data.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

This project is set up like a standard Python project.  The initialization
process also creates a virtualenv within this project, stored under the `.venv`
directory.  To create the virtualenv it assumes that there is a `python3`
(or `python` for Windows) executable in your path with access to the `venv`
package. If for any reason the automatic creation of the virtualenv fails,
you can create the virtualenv manually.

To manually create a virtualenv on MacOS and Linux:

```
$ python3 -m venv .venv
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
$ source .venv/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
% .venv\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```
$ pip install -r requirements.txt
```

At this point you can now synthesize the CloudFormation template for this code.

```
$ cdk synth
```

To add additional dependencies, for example other CDK libraries, just add
them to your `setup.py` file and rerun the `pip install -r requirements.txt`
command.

## Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

## Solution Design of Infrastructure as a Code

### Project setup

```
backend -> container for the CDK Project
backend/src -> source code for the CDK Stack
backend/src/app.py -> main code for initializing the CDK App
backend/src/index.py -> cdk code for defining the Backend CDK Stack
backend/src/src_stack.py -> cdk code for initializing the Frontend and Backend CDK Stack
backend/src/config/** -> configuration items for CDK 
backend/src/frontend/** -> index.py creates the infrastructure of the frontend using the distribution created by building the angular app
backend/src/lambda/** -> container for all the lambdas that needs to be created
backend/src/lambda/query -> lambda handler with dependency definition for query lambda
backend/src/lambda/years -> lambda handler with dependency definition for years lambda
backend/src/lambda/local -> lambda handler for local testing

```

### Deepdive into the frontend IaaC

The frontend infrastructure comprises of the following:

- website bucket -> S3 bucket to store frontend app
- Distribution Network -> The website bucket is then hosted via the cloudfront CDN which is linked to the origin source of the S3 bucket
- Role/Policies -> The bucket is publically not accessible, but can only be accessed via the CDN

### Deepdive into the backend IaaC

The backend infrastructure comprises of the following:

- asset bucket -> The datasheet is stored in the S3 bucket, which makes it easier to be managed and handled.
- docker image of the lambda codes -> In order to make the codes portable and easy to manage, the lambda code are retrieved from the docker image
- API -> There is an API integration layer created with two resources /query and /years which are connected to two lambdas defined in backend/src/lambda/query and backend/src/lambda/years. The APIs are further enhanced with Usage plans to prevent DDoS by adding throttling and burse rate control. There is also API Keys implemented which will prevent unauthorized access to the API.
- Roles/Policies -> All resources has been built with least priviledge strategy.

