# brightcove-chapter-cues

This is a plugin for the Brightcove Player that allows you to set up chapters using the cue point editor in Video Cloud's Media Module instead of uplaoding a vtt file. The chapters button will displayed whenever there are chapters present.

<img width="241" alt="chapters" src="https://user-images.githubusercontent.com/1676039/171051272-286974de-a024-482d-b503-00f50aa01db1.png">


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

Just add the plugin script to the player configuration.

* **Plugin name**: `chapterCues`.
* **Javascript URL***: https://cdn.jsdelivr.net/npm/@misterben/brightcove-chapter-cues/dist/brightcove-chapter-cues.min.js (or a self hosted version)

### Options

#### `cueName`

Chapters are generated only from cue points with this _name_ so as not to conflict with cues added for any other reason.
The default is `chapter`. 
## Usage

- Add the plugin to a player.
- Add cue points to a video in Video Cloud - [see Brightcove documentation][bc-add-cues].
  - The time should be the chapter's start time. The end time is inferred as the next chapter cue or the end of the video.
  - The name must be `chapter`, or the value you set for the `cueName` option.
  - The metadata should be the text label for the chapter.
- There must be at least two chapters for the chapters menu to show.

<img width="1095" alt="image" src="https://user-images.githubusercontent.com/1676039/129568176-a65bfc56-d55c-4bef-b1ae-4dbec43ddebd.png">

## License

MIT. Copyright (c) mister-ben &lt;git@misterben.me&gt;

[videojs]: http://videojs.com/
[bc-add-cues]: https://studio.support.brightcove.com/media/working-cue-points-media-module.html
