var AWS = require('aws-sdk');
var async = require('async');

AWS.config.update({
    accessKeyId: 'accessKey1',
    secretAccessKey: 'verySecretKey1',
    sslEnabled: false,
    endpoint: 'http://127.0.0.1',
    signatureVersion: 'v4',
    signatureCache: false,
    debug: true,
    s3ForcePathStyle: true,
});



var s3 = new AWS.S3();
var Bucket = 'search10m';


var params = {
    Bucket,
    Key: 0,
    Metadata: {},
    Body: '',
}


async.timesLimit(10000000, 50, function(n, next) {
    var keyName = n+6690155
    params.Key = `${keyName}`;
    params.Metadata.color = 'blue';
    params.Metadata.someOtherKey = `someOtherMetadata${keyName}`;
    params.Tagging = "tagzzz1=value1&tagzzz2=value2"
    s3.putObject(params, (err, data) => {
        console.log('createdKey# ', params.Key);
        next(err);
    });
}, function(err) {
   if(err) {
	return console.log("err!", err)
}
    console.log('done putting objects')
});

