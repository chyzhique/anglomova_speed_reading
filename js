//
// Variables
//

// Elements
var settings = document.querySelector('#settings');
var text = document.querySelector('#text');
var wpm = document.querySelector('#wpm');
var reader = document.querySelector('#reader');

// Placeholders for words, speed, current word, and interval
var words, speed, current, interval;


//
// Methods
//

/**
 * Clear the interval
 */
var end = function () {
	clearInterval(interval);
};

/**
 * Stop the reader
 * @param  {Event} event The event object
 */
var stop = function (event) {

	// Only run on #stop button
	if (event.target.id !== 'stop') return;

	// End the interval
	end();

};

/**
 * Start the interval
 */
var run = function () {

	// Close settings
	settings.removeAttribute('open');

	// Run the reader
	interval = setInterval(function () {

		// If there are no more words, stop
		if (!words[current]) {
			end();
			return;
		}

		// Show the word
		reader.textContent = words[current];

		// Go to the next word
		current++;

	}, speed);

};

/**
 * Start the reader
 * @param  {Event} event The event object
 */
var start = function (event) {

	// Only run on #start button
	if (event.target.id !== 'start') return;

	// If there's no text to read, do nothing
	if (!text.value.length) return;

	// Get the words
	words = text.value.split(' ').filter(function (word) {
		return word.length;
	});

	// Get the words-per-minute
	speed = (60 / parseInt(wpm.value, 10)) * 1000;

	// Set the current item to the first word
	current = 0;

	// Run the reader
	run();

};

/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {
	start(event);
	stop(event);
};


//
// Event Listeners
//

document.addEventListener('click', clickHandler);
