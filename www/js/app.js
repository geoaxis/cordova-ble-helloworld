// JavaScript code for the BLE Scan example app.

// Application object.
var app = {};

// Device list.
app.devices = {};

// UI methods.
app.ui = {};

app.initialize = function()
{
	document.addEventListener('deviceready', this.onDeviceReady, false);
	
	// Important to stop scanning when page reloads/closes!
	window.addEventListener('beforeunload', function(e)
	{
		app.stopScan();
	});

};



app.onDeviceReady = function()
{
	// Not used.
	// Here you can update the UI to say that
	// the device (the phone/tablet) is ready
	// to use BLE and other Cordova functions.
};

// Start the scan. Call the callback function when a device is found.
// Format:
//   callbackFun(deviceInfo, errorCode)
//   deviceInfo: address, rssi, name
//   errorCode: String
app.startScan = function(callbackFun)
{
	app.stopScan();
	console.log("starting");
	evothings.ble.startScan(
		function(device)
		{
			// Report success.
			callbackFun(device, null);
		},
		function(errorCode)
		{
			// Report error.
			callbackFun(null, errorCode);
		}
	);
};

// Stop scanning for devices.
app.stopScan = function()
{
	evothings.ble.stopScan();
};

// Called when Start Scan button is selected.
app.ui.onStartScanButton = function()
{
	app.startScan(app.ui.deviceFound);
	app.ui.displayStatus('Scanning...');
};

// Called when Stop Scan button is selected.
app.ui.onStopScanButton = function()
{
	app.stopScan();
	app.devices = {};
	app.ui.displayStatus('Scanning turned off');
	app.ui.displayDeviceList();
};

// Called when a device is found.
app.ui.deviceFound = function(device, errorCode)
{
	if (device)
	{
		// Insert the device into table of found devices.
		app.devices[device.address] = device;

		// Display device in UI.
		app.ui.displayDeviceList();
	}
	else if (errorCode)
	{
		app.ui.displayStatus('Scan Error: ' + errorCode);
	}
};

// Display the device list.
app.ui.displayDeviceList = function()
{
	// Clear device list.
	$('#found-devices').empty();

	var i = 1;
	$.each(app.devices, function(key, device)
	{
		// Set background color for this item.

		// Create a div tag to display sensor data.
		var element = $(
			'<li class="topcoat-list__item">'
			+	'<b>' + device.name + '</b><br/>'
			+	device.address + '<br/>'
			+	device.rssi + '<br/>'
			+ '</li>'
		);

		$('#found-devices').append(element);
	});
};

// Display a status message
app.ui.displayStatus = function(message)
{
	$('#scan-status').html(message);
};



app.initialize();






