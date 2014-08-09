(function () {
  'use strict';

  angular.module('durationalert.directives')
    .provider('durationAlertConfig', function () {
      var defaults = {
        thresholds: [
          { minValue: 0,   label: 'success' },
          { minValue: 30,  label: 'warning' },
          { minValue: 60,  label: 'danger'  },
          { minValue: 120, label: 'default' }
        ]
      };

      this.setDefaults = function (settings) {
        angular.extend(defaults, settings || {});
      };

      this.$get = [
        function () {
          return defaults;
        }
      ];
    })
    .directive('durationAlert', [ 'durationAlertConfig', function (durationAlertConfig) {
      return {
        restrict: 'E',

        template: '<span class="label">{{display}}</span>',

        scope: {
          age: '@age',
          displayExact: '@displayExact',
          displayThreshold: '@displayThreshold',
          appendText: '@appendText'
        },

        link: function (scope, element) {
          var thresholds = durationAlertConfig.thresholds, 
              selectedThresholdMinValue = 0,
              labelClass = '';

          scope.age = scope.age ? parseInt(scope.age, 10) : 0;
          scope.displayExact = scope.displayExact ? !!(scope.displayExact) : false;
          scope.displayThreshold = scope.displayThreshold ? !!(scope.displayThreshold) : false;

          thresholds.sort(function (a, b) {
            return b.minValue - a.minValue;
          });

          for (var threshold in thresholds) {
            if (scope.age >= thresholds[threshold].minValue) {
              selectedThresholdMinValue = thresholds[threshold].minValue;
              labelClass = 'label-' + thresholds[threshold].label;
              break;
            }
          }

          scope.appendText = (scope.appendText !== undefined) ? ' ' + scope.appendText : '';

          if (scope.displayExact) {
            scope.display = scope.age + scope.appendText;
          } else if (scope.displayThreshold) {
            scope.display = '> ' + selectedThresholdMinValue + scope.appendText;
          } else {
            scope.display = ' ';
          }

          element.addClass(labelClass);
        }
      };
    }]);
})();
