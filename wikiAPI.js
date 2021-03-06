

var wikipedia = require("node-wikipedia");

module.exports = (queryItem) => new Promise((res) => {
	wikipedia.page.data(queryItem, { content: true }, function(response) {
		if (response === undefined) {
			console.log('misc');
			res('misc');
			return;
		}
		let buy = 0, read = 0, watch = 0, eat = 0;
		let catObj = {
			buy: {
				cat: 'buy',
				val: 0
			},
			read: {
				cat: 'read',
				val: 0
			},
			watch: {
				cat: 'watch',
				val: 0
			},
			eat: {
				cat: 'eat',
				val: 0
			}
		}
		response['categories'].forEach((item) => {
			let compare = item['*']

			if (compare.includes('novel') || compare.includes('book') || compare.includes('literature')) {
				catObj.read.val += 1;
			} else if (compare.includes('film') || compare.includes('television')) {
				catObj.watch.val += 1;
			} else if (compare.includes('clothing') || compare.includes('fruit') ||
			compare.includes('bread') || compare.includes('fashion')) {
				catObj.buy.val += 1;

			} else if (compare.includes('restaurant')) {
				catObj.eat.val += 1;
			}
		})
		console.log(catObj)
		let winner = 0;
		let winnerCat;
		for (cat in catObj) {
			if (catObj[cat].val > winner) {
				console.log(catObj[cat].val)
				winner = catObj[cat].val
				winnerCat = catObj[cat].cat
			}
		}
		if (winner > 0) {
			console.log(winnerCat, winner);
		} else {
			winnerCat = 'misc';
			console.log(winnerCat, winner);
		}
		res(winnerCat);
	});
});
