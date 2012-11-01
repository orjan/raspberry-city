var gpio = require("gpio");

var setPin = function(pinNumber, status) {
	console.log("Set pin", pinNumber, status);
	// Calling export with a pin number will export that header and return a gpio header instance
	var gpio4 = gpio.export(4, {
	   // When you export a pin, the default direction is out. This allows you to set
	   // the pin value to either LOW or HIGH (3.3V) from your program.
	   direction: 'out',

	   // Due to the asynchronous nature of exporting a header, you may not be able to
	   // read or write to the header right away. Place your logic in this ready
	   // function to guarantee everything will get fired properly
	   ready: function() {
		  gpio4.set(status);                // sets pin to low (can also call gpio4.reset()
		  console.log(gpio4.value);    // should log 0
		  gpio4.unexport();            // all done
	   }
	});
};

exports.on = function (pinNumber) {
	setPin(pinNumber, 1);
};

exports.off = function (pinNumber) {
	setPin(pinNumber, 1);
};