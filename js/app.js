// (function(){

//before this was added, I was getting 404 errors for the templates when the site was pushed to gh-pages
//because it was looking in http://jessicabarnett.github.io/templates, not http://jessicabarnett.github.io/SimpleAngularBlog/templates
var directory;

function setURL() {
	if (document.URL.indexOf("http://jessicabarnett.github.io/SimpleAngularBlog/") != -1)
		directory = "http://jessicabarnett.github.io/SimpleAngularBlog";
	else
		directory = "";
}

setURL();

var blogApp = angular.module('blogApp', []);

//factory to generate blog post data
blogApp.factory('BlogData', function($http){
	var blogData = {};

	// blogData.externalPosts = $http('get', [{'url': 'blogData.json'}]);
	// blogData.externalPosts.success(function(response) {
	// 	console.log("totally worked!");
	// 	console.dir(response);
 //    	// return response.data;
	// });
	// blogData.externalPosts.failure =function(response){
	// 	console.log("failed to load omg noooo!!");
	// 	console.log(response);
	// };
	// console.log(blogData.externalPosts);

	blogData.posts = [{
		"title": "It's Cheesey, but It'll Make You Feel Grate!",
		"author": "Emmental",
		"date": new Date(2014, 09, 23),
		"tags": ["Kitchen Utensils", "Cheese"],
		"body": "\tFondue manchego stilton. Babybel roquefort the big cheese queso croque monsieur rubber cheese pecorino feta. Gouda queso pecorino cheese and biscuits cottage cheese who moved my cheese danish fontina emmental. Edam goat paneer boursin cheesy grin taleggio cauliflower cheese stinking bishop. Gouda.\n\tThe big cheese chalk and cheese everyone loves. Dolcelatte cottage cheese babybel cheese slices macaroni cheese cheddar everyone loves airedale. Bocconcini cow red leicester fromage cheese on toast cauliflower cheese halloumi emmental. Everyone loves the big cheese.\n\tCroque monsieur taleggio cheese strings. Cheesy feet cheesecake parmesan caerphilly cheesy grin say cheese cheese triangles rubber cheese. Feta fondue fromage swiss mascarpone rubber cheese caerphilly stilton. Mascarpone cauliflower cheese fondue cottage cheese red leicester dolcelatte jarlsberg babybel. Chalk and cheese st. agur blue cheese.\n\tFeta red leicester mascarpone. Fondue cut the cheese cheese slices cheese strings ricotta say cheese mascarpone cheesecake. Hard cheese stinking bishop mozzarella emmental mozzarella cheese and wine camembert de normandie who moved my cheese. Smelly cheese goat stilton cream cheese.\n\tDanish fontina ricotta port-salut. Ricotta cheeseburger smelly cheese swiss cheesy grin fromage parmesan red leicester. Pecorino say cheese danish fontina pecorino mascarpone fromage frais cheese slices cow. Port-salut cheese and wine pecorino say cheese fondue danish fontina when the cheese comes out everybody's happy paneer. Bavarian bergkase cheese and wine everyone loves cheese slices.",
		"comments": [{
			"author": "Ricotta",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=ricotta",
			"body": "I love Cheese Jokes!!",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		}, 
		{
			"author": "Limburgher",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=limburgher",
			"body": "This article is stupid.",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		},
		{
			"author": "Swiss",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=swiss",
			"body": "Stop Gratin' Limburgher!  You stink!",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		}]
	},{
		"title": "Everything's Gouda, but it Could Always be Cheddar!",
		"author": "Gouda",
		"date": new Date(2014, 10, 01),
		"tags": ["Gouda", "Cheddar", "Cheese"],
		"body": "\tCauliflower cheese when the cheese comes out everybody's happy feta. Cheesecake fromage frais caerphilly monterey jack port-salut camembert de normandie danish fontina babybel. Halloumi swiss cheese and wine emmental stilton smelly cheese chalk and cheese gouda. Halloumi swiss cheeseburger the big cheese.\n\tMonterey jack ricotta halloumi. Parmesan danish fontina gouda emmental say cheese smelly cheese cheese strings goat. Cow croque monsieur jarlsberg macaroni cheese airedale swiss cheese slices croque monsieur. Boursin monterey jack camembert de normandie paneer the big cheese.\n\tSay cheese caerphilly squirty cheese. Stinking bishop say cheese cheesecake cheesy grin the big cheese cheesy feet fromage frais caerphilly. Chalk and cheese who moved my cheese cheese on toast fondue pecorino cheese triangles say cheese when the cheese comes out everybody's happy. Danish fontina parmesan pecorino taleggio danish fontina jarlsberg edam paneer. Bocconcini taleggio.\n\tGoat blue castello port-salut. Everyone loves goat cheese and biscuits cheese slices macaroni cheese roquefort goat goat. Danish fontina chalk and cheese cheese strings melted cheese pepper jack blue castello queso gouda. Cheesecake port-salut cheese and wine pecorino stinking bishop squirty cheese caerphilly who moved my cheese. Pepper jack mascarpone cheese on toast hard cheese.\n\tHard cheese bocconcini cottage cheese. Mascarpone fondue taleggio dolcelatte cheeseburger cow cheese and wine bocconcini. Edam cow taleggio cheese and biscuits port-salut mozzarella macaroni cheese edam. Hard cheese cheese on toast cheesy grin.",
		"comments": 
		[{
			"author": "Mozzarella",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=mozzarella",
			"body": "Oh Que... So?",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		}, 
		{
			"author": "Pepper Jack",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=pepper%20jack",
			"body": "This Blog Roqueforts!",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		},
		{
			"author": "Montery Jack",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=montery%20jack",
			"body": "Halloumi to bid you fondue.",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		}]
	},{
		"title": "The Last Slice: Forever Provolone",
		"author": "Brie",
		"date": new Date(2014, 10, 12),
		"tags": ["Provolone", "Cheese"],
		"body": "\tRoquefort smelly cheese fromage. Babybel cut the cheese fromage cottage cheese bocconcini edam hard cheese say cheese. Stilton emmental dolcelatte cheese and biscuits jarlsberg gouda port-salut pepper jack. Brie cheesy grin feta lancashire cheesy grin edam taleggio cow. Cheese strings.\n\tCheesecake paneer ricotta. Camembert de normandie jarlsberg manchego cheesecake queso lancashire roquefort fromage frais. Parmesan chalk and cheese cheesy feet smelly cheese monterey jack smelly cheese caerphilly mascarpone. Cheesecake pecorino port-salut paneer camembert de normandie cottage cheese parmesan.\n\tFromage caerphilly feta. Edam babybel st. agur blue cheese cut the cheese cheese slices edam cheesecake cut the cheese. Feta port-salut fondue cheese triangles chalk and cheese brie pecorino cheese strings. Fromage frais fondue stinking bishop manchego cheese and wine cheesecake.\n\tDanish fontina cauliflower cheese cheese slices. Who moved my cheese cheesy feet cheese and biscuits roquefort bavarian bergkase swiss fondue cheesecake. Cheesy feet manchego blue castello camembert de normandie edam parmesan edam paneer. When the cheese comes out everybody's happy cheese triangles roquefort dolcelatte brie pecorino croque monsieur stilton. Macaroni cheese lancashire stinking bishop chalk and cheese.\n\tSay cheese paneer gouda. Fromage cheese slices cheesecake croque monsieur cheese triangles who moved my cheese parmesan babybel. Pecorino macaroni cheese croque monsieur ricotta dolcelatte roquefort babybel cheese slices. Red leicester rubber cheese cheesy grin croque monsieur.",
		"comments": 
		[{
			"author": "Stilton",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=stilton",
			"body": "Oh, don't be so bleu!  Just always drive caerphilly.",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 10, 12)
		},
		{
			"author": "Manchengo",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=roquefort",
			"body": "Don't be a babybel!  Cheese the day!!  Brie all you can brie!!",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 11, 12)
		}, 
		{
			"author": "Gruyere",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=gruyere",
			"body": "Boo!  There's a Meunster under your bed!!  Feta run! LOL!!", 
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 14, 12)
		},
		{
			"author": "Gorgonzola",
			"email": "cheese@please.com",
			"website": "https://www.google.com/search?q=gorgonzola",
			"body": "Whenever I'm paneer Meunsters, I edam up!  Rawr!!",
			"image": "../images/cheese_icon.svg",
			"date": new Date(2014, 17, 12)
		}]

	}];

	return blogData;
});

//custom date fiter
blogApp.filter('date', function($filter){
	return function(dateObject){
		return (dateObject.getMonth()+1)+"/"+dateObject.getDate()+"/"+dateObject.getFullYear();
	};
});

//convert a month number to a month name
blogApp.filter('getMonthName', function($filter){
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return function(monthNumber){
		return months[monthNumber];
	};
});

//filter to convert post titles into url strings
blogApp.filter('toUrl', function($filter){
	return function(postTitle){
		postTitle = postTitle.replace(/ /g, "_").replace(/[\.,-\/#!$%\^&\*;:{}=\-`~()']/g, "");
		return postTitle.toLowerCase();
	};
});

//main controller
blogApp.controller("BlogCtrl", function($scope, $http){
	$scope.blogDataLoaded = function(){
		return $scope.blogData === null ? false : true;
	};
	$scope.blogData = null;
	$scope.blogDataRequest = $http.get('blogData.json')
		.success(function(data, status, headers, config) {
			console.log("data from $http request: ")
            console.dir(data);

            //converts all dates in the base json, both at the post and comment level,
            //from "mm/dd/yyyy" strings to date objects 
            data.forEach(function(post, index, array){
	            	post.date = new Date(post.date);
	            	post.comments.forEach(function(comment, index, array){
	            		comment.date = new Date(comment.date);
	            	});
	           	});
            $scope.blogDataLoaded = true;
            $scope.blogData = data;

         }).error(function(data, status, headers, config) {
            console.log("blogDataRequest not working");
        });
});


/******  Title Directive *******/


blogApp.directive("pageTitle", function(){
	return {
		restrict: "A",
		templateUrl: directory.concat('/templates/pageTitle-template.html'),
		scope: {
			path: "@"
		},
		link: function(scope, element, attrs){
			console.log("pageTitle directive scope: ")
			console.dir(scope);
		}
	}
});


/******* Post Listing and full-page Post *******/


//post list directive
blogApp.directive("post", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/post-snippet-template.html'),
		scope: { //isolate scope
			post: "=",
			blogData: "="
		},
		link: function(scope, element, attrs){
			console.log("post directive scope: ");
			console.dir(scope);
		}
	}
});

//full-page post directive
blogApp.directive("fullPost", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/post-page-template.html'),
		scope: { //isolate scope
			post: "=",
			blogData: "="
		},
		link: function(scope, element, attrs){
			console.log("fullPost directive scope: ");
			console.dir(scope);
		}
	}
});



/******* Comments and Comment Form *******/


blogApp.controller("commentCtrl", function($scope, $http/* BlogData*/){
	// $scope.blogData = BlogData;
	$scope.isCommentInProgress = function(){
		//returns true if there is an author, body, or image in the comment form (min info needed to display comment)
		return ($scope.comment.author || $scope.comment.body || $scope.comment.image) ? true : false;
	};
	$scope.clearForm = function(){
		return {
			"author": "",
			"email": "",
			"website": "",
			"body": "",
			"image": "",
			"date": new Date
		}
	};
	$scope.submitComment = function(post){
		if ($scope.comment.image === ""){ //Add feature to check for a 404 event on image request?
			$scope.comment.image = "../images/cheese_icon.svg";
		}
		
		post.comments.push($scope.comment);
		$scope.comment = $scope.clearForm();
	};
	$scope.comment = $scope.clearForm();

});

//comment directive
blogApp.directive("comment", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/comment-template.html'),
		scope: { //isolate scope
			comment: "="
		},
		link: function(scope, element, attrs){
			console.log("comment directive scope: ")
			console.dir(scope);
		}
	}
});

//comment directive
blogApp.directive("commentForm", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/comment-form-template.html'),
		link: function(scope, element, attrs){
			console.log("commentForm directive scope: ")
			console.dir(scope);
		}
	}
});


///******* search page *******///


/*//ArchiveItem and Tag formats
	 
	//var tagList = [
	// {"name": "cheese", "posts" : []},
	// {"name": "Provolone", "posts" : []},
	// ]

	// var archiveList= [
	// 	{"year": 2014, "month": 8, "posts": []},
	// 	{"year": 2014, "month": 9, "posts": []},
	// 	{"year": 2014, "month": 10, "posts": []},
	// 	{"year": 2015, "month": 0, "posts": []}
	// ]
*/

//****** Tag List ******//

blogApp.controller("tagListCtrl", function($scope, BlogData){
	$scope.blogData = BlogData;
	$scope.getTagList = function(blogData){
		var tagList = [];
		blogData.posts.forEach(function(post, index, array){
			post.tags.forEach(function(tag, tagIndex, tagArray){
				var matchIndex = $scope.findIndexOfMatch(tagList, tag);
				if (!matchIndex){ //if there is no match
					tagList.push({"name" : tag, "posts": [post]});
				}
				else{
					tagList[matchIndex].number += 1;
					tagList[matchIndex].posts.push(post);
				}
			})
		})
		return tagList;
	};
	$scope.findIndexOfMatch = function(stringArray, compareString){
		for (var i = 0; i < stringArray.length; i++){
			if (stringArray[i].name.indexOf(compareString) != -1){
				return i;
			}
		}
		return null;
	};
	$scope.uniqueTags = $scope.getTagList($scope.blogData);
});

blogApp.directive("tagList", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/taglist-template.html')
		// link: function(scope, element, attrs){
		// 	console.dir(scope);
		// }
	}
});


//****** Archive List ******//

blogApp.controller("archiveListCtrl", function($scope, $filter, BlogData){
	$scope.blogData = BlogData;
	$scope.getArchiveList = function(blogData){
		var archiveList = []; 

		blogData.posts.forEach(function(post, index, array){
			var currentPost = $scope.createArchiveItem(post);

			//search for a the year and month in archiveList
			var matchIndex = $scope.getIndexOfMatch(archiveList, currentPost);
			if (matchIndex)//if month and year are already present
				archiveList[matchIndex].posts.push(post);
			else //add post to relevant objects "posts" prop
				archiveList.push(currentPost);
		})

		return archiveList;
	};
	$scope.createArchiveItem = function(post){
		return {"month" : post.date.getMonth(),
				"year" : post.date.getFullYear(),
				"posts" : [post] //use posts.length to get number
		}
	};
	$scope.getIndexOfMatch = function(archiveList, archiveItem){
		if (archiveList.length > 0){
			for (var i = 0; i < archiveList.length; i++){
				if (archiveList[i].year === archiveItem.year && archiveList[i].month === archiveItem.month){
					return i;
				}
			}
		}
		return null;
	};
	$scope.archiveList = $scope.getArchiveList($scope.blogData);
});

blogApp.directive("archiveList", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/archive-template.html'),
		link: function(scope, element, attrs){
			console.dir(scope);
		}
	}
});

// })();