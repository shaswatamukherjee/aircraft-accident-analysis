#!/usr/bin/env python3
import os

import aws_cdk as cdk

from src_stack import SrcStack
from config.config import config


app = cdk.App()
SrcStack(app, config["env"]["appName"])

app.synth()
