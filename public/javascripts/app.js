var $scope = {};
angular.module('comment', [])
.controller('MainCtrl', [
	'$scope', '$http',
  	function($scope, $http){
		$scope.comments = [];
		$scope.addComment = function() {
			if($scope.formContent === '') { return; }
			$scope.create({
				title: $scope.formContent,
				upvotes: 0,
      			});
			$scope.formContent = '';
		};
		$scope.incrementUpvotes = function(comment) {
			$scope.upvote(comment);
		};
		$scope.getAll = function() {
			return $http.get('/comments').success(function(data){
				angular.copy(data, $scope.comments);
			});
		};
		$scope.getAll();
		$scope.create = function(comment) {
    			return $http.post('/comments', comment).success(function(data){
				$scope.comments.push(data);
			});
		};
		$scope.upvote = function(comment) {
			return $http.put('/comments/' + comment._id + '/upvote')
        		.success(function(data){
				comment.upvotes += 1;
			});
		};
		$scope.remove = function(comment) {
			return $http.delete('/comments/' + comment._id)
			.success(function(data) {
				$scope.comments.splice($scope.comments.indexOf(comment), 1);
			});
		}
	}
]);

