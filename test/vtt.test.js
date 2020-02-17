import QUnit from 'qunit';
import sinon from 'sinon';

import VttText from '../src/vtt';

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
});

QUnit.module('vtt', {});

QUnit.test('Text is created', function(assert) {
  const v = new VttText();

  assert.strictEqual(v.text, 'WEBVTT\n', 'constructor adds a header to the file');
});

QUnit.test('Times are converted', function(assert) {
  const v = new VttText();

  v.addCue(0, 6666.6, 'ABC');

  const text = v.text;

  assert.ok(text.includes('00:00:00.000 --> 01:51:06.600'), 'time is converted');
});

