# videojs-chapter-cues

PLugin for the Brightcove Player to create a chapters track from cue points set in Video Cloud.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
  - [Option](#option)
    - [cueName](#cuename)
- [Usage](#usage)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Installation

Add the plugin script to the player configuration. The name is `chapterCues`. One option may be set, but is not required.

### Options

#### cueName

Chapters are generated with this _name_.
Default `chapter`.

## Usage

* Add the plugin to a player.
* Set cue points on a video in Video Cloud.
  * The time should be the chapter start time.
  * The name should be `chapter` or the value of the `cueName` option.
  * The metadata shuld be the text label for the chapter.

## License

MIT. Copyright (c) mister-ben &lt;git@misterben.me&gt;


[videojs]: http://videojs.com/
