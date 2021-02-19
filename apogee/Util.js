// Check validation.
module.exports.validate = async function validate() {
  // This package require: discord.js
  try {
    require.resolve("discord.js");
  } catch (error) {
    throw new Error("[DJS-S] Not found (discord.js)");
  };

  // Check Node.js version.
  let checkNodeJSVersion = require("semver").satisfies(process.version, ">=14");
  if (!checkNodeJSVersion) {
    throw new Error("[DJS-S] Need latest Node.js (>=14) version.");
  }

  // Check Discord.js version.
  let checkDiscordJSVersion = require("semver").satisfies(require(require.resolve('discord.js').replace('src/index.js', 'package.json')).version, ">=12.3.1");
  if (!checkDiscordJSVersion) {
    throw new Error("[DJS-S] Need latest Discord.js (>=12.3.1) version.");
  };
};

// Best match.
module.exports.findBestMatch = function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	return { ratings: ratings, bestMatch: ratings[bestMatchIndex], bestMatchIndex: bestMatchIndex };
}

// Valid args.
function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
};

// Compare two strings.
function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
};