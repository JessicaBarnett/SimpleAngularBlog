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
		$http.get('blogData.json')
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

	            $scope.blogData = data;
	            return true;

	         }).error(function(data, status, headers, config) {
	            console.log("blogDataRequest not working");
	            return false; 
	        });

	     return false;
	}
	// $scope.blogDataRequest = $http.get('blogData.json')
	// 	.success(function(data, status, headers, config) {
	// 		console.log("data from $http request: ")
 //            console.dir(data);

 //            //converts all dates in the base json, both at the post and comment level,
 //            //from "mm/dd/yyyy" strings to date objects 
 //            data.forEach(function(post, index, array){
	//             	post.date = new Date(post.date);
	//             	post.comments.forEach(function(comment, index, array){
	//             		comment.date = new Date(comment.date);
	//             	});
	//            	});

 //            $scope.blogData = data;
 //            $scope.blogDataLoaded = true;

 //         }).error(function(data, status, headers, config) {
 //            console.log("blogDataRequest not working");
 //        });
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