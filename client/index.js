/* Create an instance of CSInterface. */
var csInterface = new CSInterface();

/* Load your server extension */
csInterface.requestOpenExtension("com.my.localserver", "");

/* Make a reference to your HTML button and add a click handler. */
var openButton = document.querySelector("#import-button");
openButton.addEventListener("click", importDoc);


if (typeof(require) !== 'undefined') {
    alert("Node.js is enabled");
} else {
    alert("Node.js is disabled");
}

/* Get the path for your panel */
var extensionDirectory = csInterface.getSystemPath("extension");

function importDoc() {
    /* Make sure to include the full URL */
    //https://www.countryflags.io/be/flat/64.png //Test url, this one returns a success, but doesn't execute server code?
    console.log("Function: importDoc()");
    console.log("extensiondirectory = " + extensionDirectory);
    var url = "http://localhost:3200/import"; //Port 8088 atleast returns "Not Found"-error instead of nothing, but that might be becuase of the .debug port.

    console.log("communicating with server");
    /* Use ajax to communicate with your server */
    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "directory": extensionDirectory
        },
        success: response => {
            /* Use the ExtendScript function to display the downloaded file */
            console.log("SUCCESS IN RESPONSE");
            csInterface.evalScript(`openDocument("${response}")`);
        },
        error: (jqXHR, textStatus, errorThrown) => { 
            console.log(jqXHR);
            console.log(" ///textstatus= " + textStatus);
            console.log(" /// errorthrown= " + errorThrown);
            alert(errorThrown, jqXHR.responseJSON);
        }
    })

}