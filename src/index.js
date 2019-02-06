'use strict';

const Timer = require('easytimer');
//window.$ = window.jQuery = require('jquery')

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
		//createTimer(seconds, el);
	});
}

startServiceWorker();
startWakeLock();
startTimers();


    /*"dist": "yarn clean && yarn copy && yarn build:js && yarn build:sw && yarn build:inline:css && yarn build:inline:js && yarn build:minify && yarn build:smaller",*/









// document.querySelector('#show-mph').addEventListener('click', (event) => {
//   appOpts.readoutUnit = readoutUnits.mph;
//   if (!appOpts.dom.showMph.classList.contains('selected')) {
//     toggleReadoutButtons();
//   }
// });

// document.querySelector('#show-kmh').addEventListener('click', (event) => {
//   appOpts.readoutUnit = readoutUnits.kmh;
//   if (!appOpts.dom.showKmh.classList.contains('selected')) {
//     toggleReadoutButtons();
//   }
// });

// document.querySelector('#start').addEventListener('click', (event) => {
//   if (appOpts.watchId) {
//     navigator.geolocation.clearWatch(appOpts.watchId);

//     if (appOpts.wakeLock) {
//       appOpts.wakeLock.cancel();
//     }

//     appOpts.watchId = null;
//     appOpts.dom.start.textContent = '🔑 Start';
//     appOpts.dom.start.classList.toggle('selected');
//   } else {
//     const options = {
//       enableHighAccuracy: true
//     };
//     appOpts.watchId = navigator.geolocation.watchPosition(parsePosition,
//       null, options);
//     startWakeLock();

//     appOpts.dom.start.textContent = '🛑 Stop';
//     appOpts.dom.start.classList.toggle('selected');
//   }
// });

// const toggleReadoutButtons = () => {
//   appOpts.dom.showKmh.classList.toggle('selected');
//   appOpts.dom.showMph.classList.toggle('selected');
// };

// const startAmbientSensor = () => {
//   if ('AmbientLightSensor' in window) {
//     navigator.permissions.query({ name: 'ambient-light-sensor' })
//       .then(result => {
//         if (result.state === 'denied') {
//           return;
//         }
//         const sensor = new AmbientLightSensor({frequency: 0.25});
//         sensor.addEventListener('reading', () => {
//           if (sensor['illuminance'] < 3 && !appOpts.dom.body.classList.contains('dark')) {
//             appOpts.dom.body.classList.toggle('dark');
//           } else if (sensor['illuminance'] > 3 && appOpts.dom.body.classList.contains('dark')) {
//             appOpts.dom.body.classList.toggle('dark');
//           };
//         });
//         sensor.start();
//     });
//   }
// }



// const parsePosition = (position) => {
//   appOpts.dom.readout.textContent = Math.round(
//     position.coords.speed * appOpts.readoutUnit);
// };
//startAmbientSensor();
