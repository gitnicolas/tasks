var isMobile = function () {
	return /iPad|iPhone|iPod|Android|Linux arm|BlackBerry|WinCE|Pocket/i.test(navigator.platform);
};

var tapEventName = isMobile() ? 'touchstart' : 'click';

var isInternetExplorer = function () {
	return /MSIE|Trident/.test(navigator.userAgent);
};

var utf8ToBase64 = function (string) {
	return btoa(encodeURI(string));
};

var base64ToUTF8 = function (string) {
	return decodeURI(atob(string));
};

var utf8LengthInBytes = function (string) {
	try {
		return (new Blob([string], {type: 'application/json'})).size;
	} catch (error) {
		var length = string.length;
		for (var i = string.length - 1; i >= 0; i--) {
			var code = string.charCodeAt(i);
			if (code > 0x7f && code <= 0x7ff) length++;
			else if (code > 0x7ff && code <= 0xffff) length += 2;
			if (code >= 0xDC00 && code <= 0xDFFF) i--;
		}
		return length;
	}
};
