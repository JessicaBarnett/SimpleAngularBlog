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

//Module
var blogApp = angular.module('blogApp', []);


//service to load blog data
blogApp.service('BlogDataModel', function($http, $q){
	var blogDataModel = this, //$this
		URLS = {
			FETCH: 'blogData.json'
		};

	blogDataModel.posts;
	blogDataModel.convertDatesToObjects = function(posts){
	    //converts all dates in the base json, both at the post and comment level from "mm/dd/yyyy" strings to date objects 
	    posts.forEach(function(post, index, array){
	        	post.date = new Date(post.date);
	        	post.comments.forEach(function(comment, index, array){
	        		comment.date = new Date(comment.date);
	        	});
	       	});
	    return posts;
	}

	blogDataModel.extractData = function(response){
		blogDataModel.posts = blogDataModel.convertDatesToObjects(response.data);
		console.log("in callback");
	}

	blogDataModel.get = function(){
		//$q sets it up so you're passing a promise to the caller, on which they can call .then, and do their rendering in
		return (blogDataModel.posts) ? $q.when(blogDataModel.posts) : $http.get(URLS.FETCH).then(blogDataModel.extractData);
	}
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
blogApp.controller("BlogCtrl", function($scope, BlogDataModel){
	$scope.blogData = BlogDataModel.get().then(function(response){
		return response.data;
	});
});

//*********  Note to self  **********//
// As of today, 12/13/2014, I'm having problems getting the directives to refresh after the data has been loaded.
// Using $q to pass my data as a promise now, so a .then can be used in the controller.  but directives still render too early.  
// abandonning project for the moment.
// helpful videos: 
// https://egghead.io/lessons/angularjs-http
// https://egghead.io/lessons/angularjs-angularjs-architecture-using-http-to-load-json-data
// https://egghead.io/lessons/angularjs-angularjs-architecture-control-your-promises-with-q


//title directive
blogApp.directive("pageTitle", function(){
	return {
		restrict: "A",
		templateUrl: directory.concat('/templates/pageTitle-template.html'),
		scope: {
			path: "@"
		},
		link: function(scope, element, attrs){
			//console.dir(scope);
		}
	}
});


/******* Post and full-page Post *******/


//post directive
blogApp.directive("post", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/post-snippet-template.html'),
		scope: { //isolate scope
			post: "=",
			blogData: "="
		},
		link: function(scope, element, attrs){
			// console.dir(scope)
		}
	}
});

//post directive
blogApp.directive("fullPost", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/post-page-template.html'),
		scope: { //isolate scope
			post: "=", 
			blogData: "="
		},
		link: function(scope, element, attrs){
			// console.dir(scope);
		}
	}
});



/******* Comments and Comment Form *******/


blogApp.controller("commentCtrl", function($scope, BlogDataModel){
	$scope.blogData = BlogDataModel.get().then(function(response){
		return response.data;
	});
	$scope.isCommentInProgress = function(){
		//returns true if there is an author, body, or image in the comment form
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
		}
	}
});

//comment directive
blogApp.directive("commentForm", function(){
	return {
		restrict: "E",
		templateUrl: directory.concat('/templates/comment-form-template.html'),
		link: function(scope, element, attrs){

		}
	}
});


/******* search page *******/
/*
	//ArchiveItem and Tag formats
	 
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

blogApp.controller("tagListCtrl", function($scope, BlogDataModel){
	$scope.blogData = BlogDataModel.get().then(function(response){
		return response.data;
	});
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

blogApp.controller("archiveListCtrl", function($scope, $filter, BlogDataModel){
	$scope.blogData = BlogDataModel.get().then(function(response){
		return response.data;
	});
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