function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
    }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

function unsetCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function generateQRCodeBase64(text) {
    // Create a QRCode instance
    var qrcode = new QRCode(document.createElement("div"), {
        text: text,
        width: 128,
        height: 128
    });

    // Create a canvas element
    var canvas = document.createElement("canvas");
    canvas.width = qrcode._el.firstChild.width;
    canvas.height = qrcode._el.firstChild.height;

    // Get the canvas 2d context
    var context = canvas.getContext("2d");

    // Draw the QR code on the canvas
    context.drawImage(qrcode._el.firstChild, 0, 0);

    // Convert the canvas content to a base64-encoded image
    var base64Image = canvas.toDataURL("image/png");

    return base64Image;
}
