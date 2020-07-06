# brightcove-chapter-cues

Plugin for the Brightcove Player to create a chapters track from cue points set in Video Cloud.

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

Add the plugin script to the player configuration. The name is `chapterCues`. The script may be delivered from a CDN such as

> https://cdn.jsdelivr.net/npm/@misterben/brightcove-chapter-cues/dist/brightcove-chapter-cues.min.js

### Options

#### cueName

Chapters are generated only from cue points with this _name_.
Default `chapter`.

## Usage

- Add the plugin to a player.
- Add cue points to a video in Video Cloud - [see Brightcove documentation](bc-add-cues).
  - The time should be the chapter's start time. The end time is inferred as the next chapter cue or the end of the video.
  - The name must be `chapter`, or the value you set for the `cueName` option.
  - The metadata should be the text label for the chapter.
- There must be at least two chapters for the chapters menu to show.

## License

MIT. Copyright (c) mister-ben &lt;git@misterben.me&gt;

[videojs]: http://videojs.com/
[bc-add-cues]: https://studio.support.brightcove.com/media/working-cue-points-media-module.html
