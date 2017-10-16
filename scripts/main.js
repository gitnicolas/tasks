var finalTaskStatus = 'Closed';

var isMobile = /iPad|iPhone|iPod|Android|Linux arm|BlackBerry|WinCE|Pocket/i.test(navigator.platform);

var isInternetExplorer = /MSIE|Trident/.test(navigator.userAgent);

var tapEventName = isMobile ? 'touchstart' : 'click';

if (!HTMLElement.prototype.requestFullscreen) Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', {
	value: HTMLElement.prototype.webkitRequestFullscreen || HTMLElement.prototype.webkitRequestFullScreen || HTMLElement.prototype.mozRequestFullScreen || HTMLElement.prototype.msRequestFullscreen
});

if (!HTMLDocument.prototype.exitFullscreen) Object.defineProperty(HTMLDocument.prototype, 'exitFullscreen', {
	value: HTMLDocument.prototype.webkitExitFullscreen || HTMLDocument.prototype.webkitCancelFullScreen || HTMLDocument.prototype.mozCancelFullScreen || HTMLDocument.prototype.msExitFullscreen
});

if (!HTMLDocument.prototype.getFullscreenElement) Object.defineProperty(HTMLDocument.prototype, 'getFullscreenElement', {
	value: function () {
		if (this.fullscreenElement !== undefined) return this.fullscreenElement;
		if (this.webkitFullscreenElement !== undefined) return this.webkitFullscreenElement;
		if (this.mozFullScreenElement !== undefined) return this.mozFullScreenElement;
		if (this.msFullscreenElement !== undefined) return this.msFullscreenElement;
	}
});

var findIndex = function (array, testFunction) {
	if (Array.prototype.findIndex) return array.findIndex(testFunction);
	var length = array.length;
	for (var i = 0; i < length; i++) if (testFunction(array[i])) return i;
	return -1;
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
