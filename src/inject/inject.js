chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			const library = {};

			new class {
				constructor() {
					this.inputs = this.getInputElems();
					this.word = '';
					this.words = [];
					for (var x = 0, max = this.inputs.length; x < max; x++) {
						const input = this.inputs[x];
						input.addEventListener('keyup', (event) => {
							this.listener(event);
						});
					}
				}

				listener(event) {
					const specialEvents = [32, 8];
					if (
						event.key.length === 1 &&
						specialEvents.indexOf(event.keyCode) === -1 &&
						(event.key.match(/[a-z]/i) || parseInt(event.key) >= 0)
					) {
						this.word += event.key;
					} else if (event.key === 8) {
						this.word = this.word.slice(0, this.word.length - 1);
					} else if (event.key === 32) {
						if (
							!this.words[this.word] &&
							this.word !== '' &&
							this.words[this.word] !== 0
						) {
							this.words[this.word] = 0;
						} else if (this.word !== '') {
							this.words[this.word]++;
						}
						if (library[this.word]) {
							const elem = event.path[0];
							if (elem.value === ' ') {
								elem.value = elem.value.slice(0, elem.value.length - (this.word.length + 1));
								elem.value += library[this.word] + ' ';
							}
						}
						this.word = '';
					}
				}

				getInputElems() {
					return document.querySelectorAll('input, textarea');
				}
			}

		}
	}, 10);
});