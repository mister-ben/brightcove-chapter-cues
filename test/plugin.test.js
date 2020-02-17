import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-chapter-cues', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video, {
      html5: {
        nativeTextTracks: false
      }
    });
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(2);

  assert.strictEqual(
    typeof Player.prototype.chapterCues,
    'function',
    'videojs-chapter-cues plugin was registered'
  );

  this.player.chapterCues();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(
    this.player.hasClass('vjs-chapter-cues'),
    'the plugin adds a class to the player'
  );
});

QUnit.test('creates track', function(assert) {
  this.player.mediainfo = {
    cuePoints: [
      {
        name: 'Pre-roll',
        type: 'AD',
        metadata: null,
        startTime: 0,
        endTime: 15
      },
      {
        name: 'chapter',
        type: 'CODE',
        metadata: 'Chapter 1',
        startTime: 0,
        endTime: 10
      },
      {
        name: 'chapter',
        type: 'CODE',
        metadata: 'Chapter 2',
        startTime: 10,
        endTime: 20.5
      },
      {
        name: 'other',
        type: 'CODE',
        metadata: 'Text',
        startTime: 5,
        endTime: 15
      }
    ]
  };

  this.player.chapterCues();

  this.clock.tick(1);

  this.player.trigger('loadstart');
  this.player.trigger('loadedmetadata');

  this.clock.tick(10);

  const chapterTracks = this.player.textTracks().tracks_.filter(t => {
    return t.kind === 'chapters';
  });

  assert.strictEqual(
    chapterTracks.length, 1,
    'the plugin adds a chapters track to the player'
  );

});

QUnit.test('no unnecessary chapter track present', function(assert) {
  this.player.mediainfo = {
    cuePoints: [
      {
        name: 'Pre-roll',
        type: 'AD',
        metadata: null,
        startTime: 0,
        endTime: 15
      },
      {
        name: 'other',
        type: 'CODE',
        metadata: 'Text',
        startTime: 5,
        endTime: 15
      }
    ]
  };

  this.player.chapterCues();

  this.clock.tick(10);

  this.player.trigger('loadedmetadata');

  this.clock.tick(10);

  const chapterTracks = this.player.textTracks().tracks_.filter(t => {
    return t.kind === 'chapters';
  });

  assert.strictEqual(
    chapterTracks.length, 0,
    'the plugin does not add a chapters track when not needed'
  );

});
