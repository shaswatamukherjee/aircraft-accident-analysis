FROM public.ecr.aws/lambda/python:3.8

COPY requirements.txt  .

RUN yum update -y && \
  yum install -y git && \
  yum install -y curl && \
  rm -Rf /var/cache/yum

RUN  pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Copy function code
COPY index.py ${LAMBDA_TASK_ROOT}/index.py

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
# ENTRYPOINT [ "/usr/local/bin/python3", "/var/task/index.py" ]
CMD [ "index.lambda_handler" ] 
