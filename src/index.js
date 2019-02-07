'use strict';

const T = require('easytimer');

/** @const */
const appOpts = {
	dom: {
		body: document.querySelector('body'),
		left: document.querySelector('#left'),
		right: document.querySelector('#right'),
		leftTimer: document.querySelector('#left-timer'),
		rightTimer: document.querySelector('#right-timer'),
	},
	timers: {
		left: false,
		right: false
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
	createTimer(60, appOpts.dom.leftTimer, appOpts.dom.left);
	createTimer(30, appOpts.dom.rightTimer, appOpts.dom.right);
}
const toggleTimerBackground = (el) => {
	//true = show red background
	//false = show white background

	if (el === appOpts.dom.left) {
		appOpts.timers.left = !appOpts.timers.left;
		console.log('left timer: ' + appOpts.timers.left);
	}

	if (el === appOpts.dom.right) {
		appOpts.timers.right = !appOpts.timers.right;
		console.log('right timer: ' + appOpts.timers.right);
	}

	el.classList.toggle('off');
}

const createTimer = (seconds, el, parent) => {
	toggleTimerBackground(parent);
	
	var timer = new T();
	timer.start({countdown: true, startValues: {seconds: seconds}});
	timer.addEventListener('secondsUpdated', function(e) {
		el.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    });
    timer.addEventListener('targetAchieved', function(e) {
		timer.stop();
		//timer = null; //needed?
		createTimer(seconds, el, parent);
	});
}

startServiceWorker();
startWakeLock();
startTimers();