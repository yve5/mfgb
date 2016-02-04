'use strict';

angular.module('helloApp')
  .service('authService', function () {
    var isAuthenticated = 0;

    return {
      setAuth: function (prm_isAuthenticated) {
        isAuthenticated = prm_isAuthenticated;
      },
      isAuth: function () {
        return isAuthenticated;
      }
    };
  });
