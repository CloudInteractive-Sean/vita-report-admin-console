'use strict';

var MyClass = function () {
    function MyClass(myName) {
        babelHelpers.classCallCheck(this, MyClass);

        this.myName = myName;
    }

    babelHelpers.createClass(MyClass, [{
        key: 'logMyName',
        value: function logMyName() {
            console.info(this.myName);
        }
    }]);
    return MyClass;
}();

var myClass = new MyClass('Sean');
myClass.logMyName();