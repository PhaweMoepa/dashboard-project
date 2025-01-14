/*=========================================================================================
    File Name: ext-component-media-player.js
    Description: Media Plyr Extenstion
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Moepathutsi Consulting
    Author URL: http://www.themeforest.net/user/Moepathutsi Consulting
==========================================================================================*/

$(function () {
  'use strict';

  // video player  define
  if ($('.video-player')) {
    var player = new Plyr('.video-player', {
      tooltips: {
        controls: true
      }
    });
  }

  // audio player define
  if ($('.audio-player')) {
    var player1 = new Plyr('.audio-player');
  }
});
