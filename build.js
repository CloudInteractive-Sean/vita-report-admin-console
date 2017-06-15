"use strict";

(function () {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MyClass = function () {
    function MyClass(myName) {
      classCallCheck(this, MyClass);

      this.myName = myName;
    }

    createClass(MyClass, [{
      key: 'logMyName',
      value: function logMyName() {
        console.info(this.myName);
      }
    }]);
    return MyClass;
  }();

  var myClass = new MyClass('Sean');
  myClass.logMyName();
})();