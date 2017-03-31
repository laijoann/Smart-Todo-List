var wikipedia = require("node-wikipedia");


let queryItem = 'Moonrise Kingdom'

wikipedia.page.data(queryItem, { content: true }, function(response) {
	if (response == undefined) {
		console.log('misc');
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

		if (compare.includes('novel') || compare.includes('book')) {
			catObj.read.val += 1;
		} else if (compare.includes('film') || compare.includes('television')) {
			catObj.watch.val += 1;
		} else if (compare.includes('clothing') || compare.includes('fruit')) {
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

	return
});

// wikipedia.revisions.all("Miles_Davis", { comment: true }, function(response) {
// 	// info on each revision made to Miles Davis' page
// });
//
// wikipedia.categories.tree(
// 	"Philadelphia_Phillies",
// 	function(tree) {
// 		//nested data on the category page for all Phillies players
// 	}
// );
