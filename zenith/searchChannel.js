const {findBestMatch, validate} = require("../apogee/Util.js");

/**
 * Search channel asset.
 * @param {*} message {Message} https://discord.js.org/#/docs/main/stable/class/Message
 * @param {*} query {string} Valid: channel ID, channel name
 * @param {*} production {boolean} Skip package validation.
 */

const searchChannel = async (message, query, production = false) => {
  if (!message) throw new Error("[DJS-S] Unknown First Parameter (message)");
  if (!query || query.length === 0) throw new Error("[DJS-S] Unknown Query [string]");
  if (typeof production !== "boolean") throw new Error("[DJS-S] Unknown Boolean [production]");

  // Production mode {boolean}, skip package validation.
  if (!production) await validate();

  var final;
  let cache = message.guild.channels.cache;

  // Discord ID
  if (query.match(/\d{16,22}$/gi)) {
    let result = await cache.get(query);
    final = result;
  }

  // Query only
  else if (query.match(/^.{1,100}$/gi)) {
    let mappingChannel = await cache.map(x => x.name).filter(function(x) {return x != null});
    let similarFound = findBestMatch(query, mappingChannel).bestMatch.target;
    let finale = await cache.find(x => x.name === similarFound);
    final = finale;
  }
  
  // Unknown
  else if (!final) {
    console.log(`[DJS-S] Channel not found.`);
    return undefined;
  }

  // Final
  return final;
};

module.exports = searchChannel;