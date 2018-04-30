let AWS = require('aws-sdk');
var uuid = require('uuid');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log('Request to create a product with: ' + JSON.stringify(event));
	let product = {
		'id': uuid.v1(),
		'name': event.name,
		'price': event.price
	};

	ddb.put({
		TableName: 'products_table',
		Item: product
	}, function (err, data) {
		if (err) {
			console.log('Error creating a product' + err);
			callback(null, 'Error creating product ' + err);
		} else {
			console.log('Successfully created a product entry with id : ' +product.id);
			callback(null, JSON.stringify(product));
		}
	});


	callback(null, 'Successfully executed');
}