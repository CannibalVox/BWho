var async = require('async');
var model = {
	convertList: function(list, process) {
		var resultSet = [];
		for (var resultIndex in list) {
			var result = list[resultIndex];
			resultSet.push(process(result));
		}
		return resultSet;
	},
	cacheAndDatabaseList: function(cacheGet, databaseGet, dataProcess, cachePut, finalCallback) {
		async.waterfall([
			cacheGet,
			function(results, callback) {
				if (results != undefined) {
					if (results == null)
						callback(null, null);
					else
						async.map(results, dataProcess, callback);

					return;
				}

				async.waterfall([
					databaseGet,
					function(results, innerCallback) {
						if (results == null)
							innerCallback(null, null);
						else
							async.map(results, dataProcess, innerCallback);
					},
					function(results, innerCallback) {
						cachePut(results);
						innerCallback(null, results);
					}
				], callback);
			}
		], finalCallback);
	}
};

module.exports = model;