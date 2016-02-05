'use strict';

angular.module('helloApp').directive('footer', [
  function () {
    return {
      templateUrl: 'views/footer.html',
      controller: 'FooterCtrl',
      restrict: 'ACE'
    };
  }]);
