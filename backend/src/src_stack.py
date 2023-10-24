from os import path, system
from aws_cdk import Stack
from constructs import Construct
from frontend.index import FrontendStack
from index import BackendStack

class SrcStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        frontend_stack = FrontendStack(self, 'FrontendApp')
        backend_stack = BackendStack(self, 'BackendApp', frontend_cdn=frontend_stack.cloudfront_distribution)

    # def generateAgularApp(props):
    #     configLocation = join(props['angularFolder'], 'angular.json')
    #     with open(configLocation, 'r') as f:
    #         config = json.load(f)
    #     buildCommand = props.get('buildCommand', 'build')
    #     outputPath = config['projects']['angular-app']['architect'][buildCommand]['options']['outputPath']
    #     if outputPath:
    #         output = subprocess.run(['yarn', 'ng', 'build', '--base-href', f"{props['basePath']}/"], cwd=props['angularFolder'], capture_output=True, text=True)
    #         if output.returncode == 0:
    #             return join(props['angularFolder'], outputPath)
    #         raise Exception('Error executing angular build')
    #     else:
    #         raise Exception('Invalid angular config')
