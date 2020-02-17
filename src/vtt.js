import window from 'global/window';

/**
 * Adds leading space to a number
 *
 * @param {number} num number to pad
 * @param {number} places number of places to pad
 *
 * @return {string} padded number
 */
const pad = (num, places) => {
  return ('0'.repeat(places) + num).substr(0 - places);
};

/**
 * Formats seconds to VTT time format
 *
 * @function formatTime
 * @param    {number} s
 *           Number of seconds
 *
 * @return  {string}
 *           VTT string time representation.
 */
const formatTime = s => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - (hours * 3600)) / 60);
  const seconds = Math.floor(s) - (hours * 3600) - (minutes * 60);
  const milli = Math.round((s % 1) * 1000);

  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milli, 3)}`;
};

/**
 * Class to build VTT
 */
class VttText {
  /**
   * Init with header
   */
  constructor() {
    this._lines = [
      'WEBVTT',
      ''
    ];
  }
  /**
   * Add a cue
   *
   * @param {number} start - Start time
   * @param {number} end - End time
   * @param {string} text - The cue text
   */
  addCue(start, end, text) {
    this._lines.push(`${formatTime(start)} --> ${formatTime(end)}`, text, '');
  }
  /**
   * Return text string with new lines
   */
  get text() {
    return this._lines.join('\n');
  }
  /**
   * Return blob URL
   */
  get url() {
    return URL.createObjectURL(new window.Blob([this.text], {type: 'text/vtt'}));
  }
}

export default VttText;
