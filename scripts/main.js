var isMobile = function () {
	return /iPad|iPhone|iPod|Android|Linux arm|BlackBerry|WinCE|Pocket/i.test(navigator.platform);
};

var tapEventName = isMobile() ? 'touchstart' : 'click';

var utf8ToBase64 = function (string) {
	return btoa(encodeURI(string));
};

var base64ToUTF8 = function (string) {
	return decodeURI(atob(string));
};

var toggleStyle = function (element, style, event) {
	if (event) event.stopPropagation();
	var elements = document.getElementsByClassName(element);
	var length;
	if (elements && (length = elements.length)) {
		for (var i = 0; i < length; i++) {
			var classes = elements[i].classList;
			if (classes.contains(style)) classes.remove(style);
			else classes.add(style);
		}
	}
};

var toggleNavigation = function (event) {
	toggleStyle('page', 'expanded', event);
};

var toggleMenu = function (event) {
	toggleStyle('menu', 'hidden', event);
};

var toggleLeftPane = function (event) {
	toggleStyle('left-pane', 'collapsed', event);
};

var init = function () {
	var burger = document.getElementById('burger');
	if (burger) burger.addEventListener(tapEventName, toggleNavigation);

	var action = document.getElementById('action');
	if (action) action.addEventListener(tapEventName, toggleMenu);

	var leftPane = document.getElementById('left-pane');
	if (leftPane) leftPane.addEventListener(tapEventName, toggleLeftPane);
};
