let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
var uuid = require('uuid');
exports.handler = function (event, context, callback) {

	console.log('Request to create a product with: ' + JSON.stringify(event));
	let product = ddb.put({
		TableName: 'products_table',
		Item: { 
			'id': uuid.v1(), 
			'name': event.name, 
			'price': event.price 
		},
		ReturnValues: ALL_NEW
	}, function (err, data) {
		if (err) {
			console.log('Error creating a product' + err);
			callback(null, 'Error creating product ' + err);
		} else {
			console.log('Successfully created a product entry with id : ' + product.id);
			callback(null, JSON.stringify(product));
		}
	});

	callback(null, 'Successfully executed');
}