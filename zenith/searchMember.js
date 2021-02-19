const {findBestMatch, validate} = require("../apogee/Util.js");

/**
 * Search member asset.
 * @param {*} message {Message} https://discord.js.org/#/docs/main/stable/class/Message
 * @param {*} query {string} Valid: user ID, username, nickname, user tag
 * @param {*} fetchUnused {boolean} https://github.com/discordjs/discord.js/blob/master/src/structures/GuildMember.js
 * @param {*} production {boolean} Skip package validation.
 */

const searchMember = async (message, query, fetchUnused = false, production = false) => {
  if (!message) throw new Error("[DJS-S] Unknown First Parameter (message)");
  if (!query || query.length === 0) throw new Error("[DJS-S] Unknown Query [string]");
  if (typeof fetchUnused !== "boolean") throw new Error("[DJS-S] Unknown Boolean [fetchUnused]");
  if (typeof production !== "boolean") throw new Error("[DJS-S] Unknown Boolean [production]");

  // Production mode {boolean}, skip package validation.
  if (!production) await validate();

  var final;
  let cache = message.guild.members.cache;

  // fetchUnused
  if (fetchUnused) await message.guild.members.fetch(true).catch(() => {throw new Error("[DJS-S] Failed to fetch all members")});

  // Discord ID
  if (query.match(/\d{16,22}$/gi)) {
    let result = await cache.get(query);
    final = result;
  }
  
  // Discord Tag
  else if (query.match(/^.{1,32}(#)+\d{4}$/gim)) {
    let finale = await cache.find(x => x.user.tag === query);
    final = finale;
  }

  // Username/Nickname
  else if (query.match(/^.{1,32}$/gi)) {
    let mappingNickname = await cache.map(x => x.nickname).filter(function(x) {return x != null});
    let mappingUsername = await cache.map(x => x.user.username).filter(function(x) {return x != null});
    let combineMapping = mappingNickname.length >= 1 ? mappingUsername.concat(mappingNickname) : mappingUsername;
    let similarFound = findBestMatch(query, combineMapping).bestMatch.target;
    let userRegex = new RegExp(similarFound, "i");
    let finale = await cache.find(x => userRegex.test(x.user.username) ? x.user.username === similarFound : x.nickname === similarFound);
    final = finale;
  }
  
  // Unknown
  else if (!final) {
    final = undefined;
    console.log(`[DJS-S] User not found.`);
    return undefined;
  }

  // Final
  return final;
};

module.exports = searchMember;