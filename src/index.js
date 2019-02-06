'use strict';

const Timer = require('easytimer');

/** @const */
const appOpts = {
	dom: {
		body: document.querySelector('body'),
		left: document.querySelector('#left'),
		right: document.querySelector('#right'),
		leftTimer: document.querySelector('#left-timer'),
		rightTimer: document.querySelector('#right-timer'),
	},
	watchId: null,
	wakeLock: null
};

const startWakeLock = () => {
	try {
		navigator.getWakeLock("screen").then((wakeLock) => {
			appOpts.wakeLock = wakeLock.createRequest();
		});
	} catch(error) {
		// no experimental wake lock api build
	}
}

const startServiceWorker = () => {
	navigator.serviceWorker.register('service-worker.js', {
		scope: './'
	});
}

const startTimers = () => {
	createTimer(60, appOpts.dom.leftTimer);
	createTimer(30, appOpts.dom.rightTimer);
}

const createTimer = (seconds, el) => {
	var timer = new Timer();
	timer.start({countdown: true, startValues: {seconds: seconds}});
	timer.addEventListener('secondsUpdated', function(e) {
		el.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    });
    timer.addEventListener('targetAchieved', function(e) {
		timer.stop();
		createTimer(seconds, el);
	});
}

startServiceWorker();
startWakeLock();
startTimers();


/*"dist": "yarn clean && yarn copy && yarn build:js && yarn build:sw && yarn build:inline:css && yarn build:inline:js && yarn build:minify && yarn build:smaller",*/