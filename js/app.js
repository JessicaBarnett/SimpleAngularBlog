// (function(){

//"use strict";  //what's an octal literal?

//Module
var blogApp = angular.module('blogApp', []);


//factory for blog post data
blogApp.factory('BlogData', function(){
	var blogData = {};
	blogData.posts = [{
		"title": "It's Cheesey, but It'll Make You Feel Grate!",
		"author": "Emmental",
		"date": new Date(2014, 09, 23),
		"tags": ["Kitchen Utensils", "Cheese"],
		"body": "\tI love cheese, especially croque monsieur ricotta. Queso monterey jack everyone loves cottage cheese cheese and wine cheese triangles emmental mascarpone. Ricotta cheese and wine queso cauliflower cheese cheesy grin cow cheeseburger stinking bishop. \n\t Gouda st. agur blue cheese swiss st. agur blue cheese taleggio mascarpone smelly cheese blue castello. Fromage frais pepper jack cream cheese paneer rubber cheese cheese and wine mozzarella cauliflower cheese. \n\tCroque monsieur cheddar parmesan mascarpone port-salut gouda cow swiss. Pepper jack dolcelatte stinking bishop cheese and wine fondue fondue.",
		"comments": [{
			"author": "Ricotta",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "I love Cheese Jokes!!" 
		}, 
		{
			"author": "Limburgher",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "This article is stupid."
		},
		{
			"author": "Swiss",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "Stop Gratin' Limburgher!  You stink!"
		}]
	},{
		"title": "Everything's Gouda, but it Could Always be Cheddar!",
		"author": "Gouda",
		"date": new Date(2014, 10, 01),
		"tags": ["Gouda", "Cheddar", "Cheese"],
		"body": "\tI love cheese, especially croque monsieur ricotta. Queso monterey jack everyone loves cottage cheese cheese and wine cheese triangles emmental mascarpone. Ricotta cheese and wine queso cauliflower cheese cheesy grin cow cheeseburger stinking bishop. \n\t Gouda st. agur blue cheese swiss st. agur blue cheese taleggio mascarpone smelly cheese blue castello. Fromage frais pepper jack cream cheese paneer rubber cheese cheese and wine mozzarella cauliflower cheese. \n\tCroque monsieur cheddar parmesan mascarpone port-salut gouda cow swiss. Pepper jack dolcelatte stinking bishop cheese and wine fondue fondue.",
		"comments": 
		[{
			"author": "Mozzarella",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "Oh Que... So?"
		}, 
		{
			"author": "Pepper Jack",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "This Blog Roqueforts!"
		},
		{
			"author": "Montery Jack",
			"email": "cheese@please.com",
			"website": "",
			"body": "Holy Macaroni!!"
		}]
	},{
		"title": "The Last Slice: Forever Provolone",
		"author": "Brie",
		"date": new Date(2014, 10, 12),
		"tags": ["Provolone", "Cheese"],
		"body": "\tI love cheese, especially croque monsieur ricotta. Queso monterey jack everyone loves cottage cheese cheese and wine cheese triangles emmental mascarpone. Ricotta cheese and wine queso cauliflower cheese cheesy grin cow cheeseburger stinking bishop. \n\t Gouda st. agur blue cheese swiss st. agur blue cheese taleggio mascarpone smelly cheese blue castello. Fromage frais pepper jack cream cheese paneer rubber cheese cheese and wine mozzarella cauliflower cheese. \n\tCroque monsieur cheddar parmesan mascarpone port-salut gouda cow swiss. Pepper jack dolcelatte stinking bishop cheese and wine fondue fondue.",
		"comments": 
		[{
			"author": "Stilton",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "Oh, don't be so blue, cheese!"
		}, 
		{
			"author": "Gruyere",
			"email": "cheese@please.com",
			"website": "http://google.com",
			"body": "When in doubt, pray to Cheesus." 
		},
		{
			"author": "Roquefort",
			"email": "cheese@please.com",
			"website": "",
			"body": "We have to take care of our babybels Caerphilly!"
		}]
	}];
	return blogData;
});

blogApp.filter('date', function($filter){
	return function(dateObject){
		var retVal = (dateObject.getMonth()+1)+"/"+dateObject.getDate()+"/"+dateObject.getFullYear();
		console.log(retVal);
		return (dateObject.getMonth()+1)+"/"+dateObject.getDate()+"/"+dateObject.getFullYear();
	};
});

//main controller
blogApp.controller("BlogCtrl", function($scope, BlogData){
	$scope.blogData = BlogData;
	$scope.testDate = new Date(1987, 10, 30);
	console.log($scope.blogData); //controller def has blogData!!
});

//post directive
blogApp.directive("post", function(){
	return {
		restrict: "E",
		templateUrl: 'post-template.html',
		scope: { //isolate scope
			post: "="
		},
		link: function(scope, element, attrs){
			console.dir(scope)
		}
	}
});


// })();