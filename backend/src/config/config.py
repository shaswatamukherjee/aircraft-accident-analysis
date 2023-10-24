config = {
    'cdkTags': {
        'resourceContact': 'shaswata.mukherjee@hotmail.com',
        'resourcePurpose': 'Aircraft accident analysis'
    },
    'env': {
        'appName': 'aircraft-accident-analysis',
        'apiGateway': {
            'id': 'accidentAnalysisGateway',
            'name': 'accidentAnalysisGatewayCDK'
        },
        'logTableName': 'accidentAnalysisLogs',
        's3BucketNameDatasheet': 'accident-analysis-datasheet',
        's3AssetNameDatasheet': 'accident-analysis-datasheet-asset'
    }
}