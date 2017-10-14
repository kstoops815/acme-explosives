"use strict";

var productsAll = [];
var catAndType = [];

const allProducts = () =>{
	return new Promise((resolve, reject) => {
		$.ajax("./db/products.json").done((prodData) =>{
			resolve(prodData.products);
		}).fail((errorP) => {
			reject(errorP);
		}); 
	});
};

const allTypes = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/types.json").done((typeData) => {
			resolve(typeData.types);
		}).fail((errorT) => {
			reject(errorT);
		});
	});
};

const allCategories = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/categories.json").done((categoryData) => {
			resolve(categoryData.categories);
		}).fail((errorC) => {
			reject(errorC);
		});
	});
};

const getItAll = () => {
	allCategories().then((resultsC) => {
		resultsC.forEach((prodz) => {
			productsAll.push(prodz);
			
		});
		console.log("results c", resultsC);
		return allTypes();
	}).then((resultsT) => {
		console.log("resultst", resultsT);
		resultsT.forEach((type) => {
			//console.log("type", type);
			productsAll.forEach((cat) =>{
				//console.log("cat", cat);
				let info = {};
				if(type.category === cat.id) {
					info.catName = cat.name;
					info.catId = cat.id;
					info.typeName = type.name;
					info.typeId = type.id;
					console.log("info", info);
				}
				
			});
		});
		return allProducts();
	}).then((resultsP) => {
		resultsP.forEach((prodz) => {
			productsAll.push(prodz);
		});
		console.log("in get all", productsAll);
	});
};







// 	allProducts().then((resultsP) => {
// 		resultsP.forEach((stuff) => {
// 			productsAll.push(stuff);
// 			console.log("get it all", productsAll);
// 		});
// 		return allTypes();
// 	}).then((resultsT) => {
// 		stuff.typeId = [];
// 		stuff.id.forEach((typeId) => {
// 			resultsP.forEach((newResult) => {
// 				if(typeId.type === id){
// 					stuff.id.push(newResult);
// 				}
// 			});
// 			productsAll.push(stuff);
// 			console.log("after if", productsAll);
// 		});
// 	// 	return allCategories();
// 	// }).then((resultsC) => {
// 	// 	resultsC.forEach((stuff) => {
// 	// 		products.push(stuff);
// 	// 		console.log("in resultsC", products);
// 	// 	});
// 	 });
// };







var initializer = () => {
	console.log("inside initializer");
};

module.exports = {initializer, getItAll};