duration-alert
==============

Visual Duration Alert Angular Directive

#Usage
1. Set custom thresholds in your app modules config method
```javascript
angular.module('durationalert', [])
  .provider([ 'durationAlertConfigProvider', function (durationAlertConfigProvider) {
    durationAlertConfigProvider.setDefaults({
      thresholds: [
        { minValue: 0,   label: 'success' },
        { minValue: 30,  label: 'warning' },
        { minValue: 60,  label: 'danger'  },
        { minValue: 120, label: 'default' }
      ]
    });
  });
```

2. Call the directive in your views
```html
<duration-alert 
  age="20"
  display-exact="true"
  display-threshold="false"
  append-text="Days">
</duration-alert>
```

#Options
|Key|Values|Description|
|---|------|-----------|
|age|int|Duration passed|
|display-exact|bool|Flag to display exact duration passed|
|display-threshold|bool|Flag to display threshold min value|
|append-text|string|Text to append to end of display value. If display-threshold is true, an '>' is prepended to the beginning of the value. If both display flags are set to false, an empty colored box is displayed|
