var copyright = "Copyright 2017 Canon Portugal";
var version = "1.1";

function promisify(action) {
    var args = arguments;
    return new Promise(function (resolve, reject) {
        var callback = function (result) {
            if (result.status == "failed") {
                reject(new Error(result.error));
            } else {
                resolve(result);
            }
        };

        var params = [];
        if (args[1]) {
            params = Array.prototype.slice.call(args[1]);
        }
        params.push(callback);

        action.apply(this, params);
    });
}
;

var getCurrentObjectInfoAsync = function () {
    return promisify(Therefore.context.viewer.getCurrentObjectInfo);
};

var callRequestAsync = function () {
    return promisify(Therefore.context.xmlWebService.callRequest, arguments);
};

function SignDocument(args) {

    getCurrentObjectInfoAsync()
            .then(function (result) {
                if (result.docno == '' && result.caseno == '' && result.taskno == '' && result.instanceno == '')
                    return Promise.reject(new Error("current object info missing"));

                if (result.docno == '')
                    return Promise.reject(new Error("document number is empty"));

                var doc = result.docno;
                var docNo = doc.split(".")[0];

                deployJava.launchWebStartApplication("http://172.24.135.20:8080/thereforesigner/index.jsp?docno=" + docNo);

            });
}
;

function ShowAbout() {
    window.alert(copyright + "\nVersão: " + version);
}