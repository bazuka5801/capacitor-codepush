var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedDeviceReady();
    },
    // Update DOM on a Received Event
    receivedDeviceReady: function () {
        document.getElementById("deviceready").innerText = "Device is ready (scenario - update sync)";
        console.log('Received Event: deviceready');
        app.sendTestMessage("DEVICE_READY_AFTER_UPDATE");
        /* invoke sync with UI options such that the update will not be installed */
        window.codePush.sync(function (status) {
            app.sendTestMessage("SYNC_STATUS", [status]);
        }, { installMode: InstallMode.IMMEDIATE, updateDialog: true });
        
        // Revert timeout is 5000. Wait for 6000 here to make sure the application was not reverted.
        setTimeout(function () {
            app.sendTestMessage("APPLICATION_NOT_REVERTED");
        }, 6000);
    },
    sendTestMessage: function (message, args) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "CODE_PUSH_SERVER_URL/reportTestMessage", false);
        var body = JSON.stringify({ message: message, args: args });
        console.log("Sending test message body: " + body);

        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(body);
    }
};

app.initialize();