'use strict';

var async = require('async');
var request = require('request');

var teams = [
  'slickage', 'temporal-team', '1999land', 'zassou', 'wafis', 'rosarinos', 'node-busters', 'cough-wheeze-hackers', 'annabanana', 'kitten-bubbles', 'nodesmash', 'tokyo-tigers', 'jsninja', 'counterpoint', 'nodex', 'nick-frost', 'macaco-frito', 'nodemx', 'fhqwhgads', 'bonobos', 'heapinghelpings', 'dumplings', 'mj2b', 'chennainerd', 'tbdevelopment', 'axiom-zen', 'iosalli', 'apis-and-node', 'newdevs', 'nodedenver', 'warriordoq', 'an-ode-to-node', 'streamsters-local-61', 'the-shadowdoms', 'usb-in-barcelona', 'kaw', 'native-code', 'slimdevs', 'reactive', 'lolstack', 'hicapacity', 'teamwebscale', 'the-kipcast', 'full-chort', 'destructive-internet', 'wai-wai', 'foliotek', 'put-a-bird-on-it', 'hola', 'codeboys', 'bits-und-d-ner', 'supernova', 'steel-horses', 'mustardamus', 'imperial-clan', 'barcelonajs', 'mountain-dew-crew', 'pistacho-team', 'farhadi', 'hatch'
];

var teamIframeUrls = teams.map(
  function(team) {
    return 'http://www.nodeknockout.com/iframe/' + team;
  }
);

var fetchPage = function(file, cb) {
  request.get(file, function(err, response, body) {
    if (err) {
      cb(err);
    } else {
      cb(null, body); // First param indicates error, null=> no error
    }
  });
};

async.map(teamIframeUrls, fetchPage, function(err, results) {
  if (err) {
    console.error(err);
  } else {
    var counts = [];
    var countRegex = /<span id="count">(.*)<\/span>/;
    results.forEach(function(result, i) {
      counts.push({
        team: teams[i],
        votes: countRegex.exec(results[i])[1]
      });
    });
    counts.sort(function(a, b) {
      return b.votes - a.votes;
    })
    console.log(counts);
  }
});
