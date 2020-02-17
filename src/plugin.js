import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import VttText from './vtt.js';

// Default options for the plugin.
const defaults = {
  cueName: 'chapter'
};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-chapter-cues');

  let chapterTrack;

  player.on('loadedmetadata', () => {
    // debugger;
    if (chapterTrack) {
      player.removeRemoteTextTrack(chapterTrack);
    }

    const cues = player.mediainfo.cuePoints.filter(c => {
      return c.type === 'CODE' && c.name === options.cueName;
    });

    if (cues.length === 0) {
      chapterTrack = null;
      return;
    }

    const chapterVTT = new VttText();

    for (let i = 0; i < cues.length; i++) {
      chapterVTT.addCue(cues[i].startTime, cues[i].endTime, cues[i].metadata);
    }

    player.testVTT = chapterVTT;

    chapterTrack = player.addRemoteTextTrack({
      kind: 'chapters',
      srclang: player.language(),
      src: chapterVTT.url
    }, true);

  });
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function chapterCues
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const chapterCues = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.registerPlugin('chapterCues', chapterCues);

// Include the version number.
chapterCues.VERSION = VERSION;

export default chapterCues;
