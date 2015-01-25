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


//********** Blog Data Load ***********//

//service to load blog data
blogApp.service('BlogDataModel', function($http, $q){

	var blogDataModel = this, //makes this available to functions called as callbacks

			convertDatesToObjects = function(posts){
			    //converts all dates in the base json, both at the post and comment level from "mm/dd/yyyy" strings to date objects
			    posts.forEach(function(post, index, array){
			        	post.date = new Date(post.date);
			        	post.comments.forEach(function(comment, index, array){
			        		comment.date = new Date(comment.date);
			        	});
			       	});
			    return posts;
			},

			makeRequest = function() {
				return $http({
									method: "get",
									url: "/angularBlog/data/blogData.json",
								});
			},

			handleSuccess = function(response) {
				console.log("success!");
				console.log(response.data);
				blogDataModel.posts = convertDatesToObjects(response.data);
				return blogDataModel.posts;
			},

			handleError = function(response) {
				return $q.reject(response.data.message)
			};

			blogDataModel.request = makeRequest();


	//returns promise.  data must be extracted searately by each controller...?
	//that's just how promises/async data work.
	blogDataModel.get = function(){
		console.log("bdm is currently: ", blogDataModel.posts);
		return( blogDataModel.request.then(handleSuccess, blogDataModel) );
	};

});


//********** Filters ***********//


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


//********** Main Controller ***********//

blogApp.controller("BlogCtrl", function($scope, BlogDataModel){
	$scope.blogData = {};

	var promise = BlogDataModel.get().then(function(response){
		$scope.blogData.posts = response;
	});

	setTimeout(function(){
		console.log($scope.blogData);
		}, 1000);
});

//*********  Title Directive  **********//

blogApp.directive("pageTitle", function(){
	return {
		restrict: "A",
		templateUrl: '/angularBlog/templates/pageTitle-template.html',
		// templateUrl: directory.concat('/templates/pageTitle-template.html'),
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
		templateUrl: '/angularBlog/templates/post-snippet-template.html',
		// templateUrl: directory.concat('/templates/post-snippet-template.html'),
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
		templateUrl: '/angularBlog/templates/post-page-template.html',
		// templateUrl: directory.concat('/templates/post-page-template.html'),
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

	$scope.blogData = {};

	var promise = BlogDataModel.get().then(function(response){
		$scope.blogData.posts = response;
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
		templateUrl: '/angularBlog/templates/comment-template.html',
		// templateUrl: directory.concat('/templates/comment-template.html'),
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
		templateUrl: '/angularBlog/templates/comment-form-template.html',
		// templateUrl: directory.concat('/templates/comment-form-template.html'),
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

	$scope.blogData = {};

	var promise = BlogDataModel.get().then(function(response){
		$scope.blogData.posts = response;
		$scope.uniqueTags = $scope.getTagList($scope.blogData);
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

});

blogApp.directive("tagList", function(){
	return {
		restrict: "E",
		templateUrl: '/angularBlog/templates/taglist-template.html',
		// templateUrl: directory.concat('/templates/taglist-template.html')
		link: function(scope, element, attrs){
			console.dir(scope);
		}
	}
});

//****** Archive List ******//

blogApp.controller("archiveListCtrl", function($scope, $filter, BlogDataModel){

	$scope.blogData = {};

	var promise = BlogDataModel.get().then(function(response){
		$scope.blogData.posts = response;
		$scope.archiveList = $scope.getArchiveList($scope.blogData);
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
});

blogApp.directive("archiveList", function(){
	return {
		restrict: "E",
		templateUrl: '/angularBlog/templates/archive-template.html',
		// templateUrl: directory.concat('/templates/archive-template.html'),
		link: function(scope, element, attrs){
			console.dir(scope);
		}
	}
});

// })();
