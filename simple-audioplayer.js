function SAudioPlayer(config) {
  this.container = config.container;
  this.insertAudioElement();
  this.initUI();
  this.initUIEvents();
  this.initMediaEvents();
}

SAudioPlayer.prototype.insertAudioElement = function () {
  this.audioElement = document.createElement('audio');
  this.domContainer = document.getElementById(this.container);
  var audioSrc = this.domContainer.dataset.src;
  this.audioElement.setAttribute('src', audioSrc);
  this.audioElement.setAttribute('preload', 'metadata');
  this.domContainer.appendChild(this.audioElement);
};

SAudioPlayer.prototype.initControls = function () {
  this.playButton = document.createElement('button');
  this.playButton.classList.add('player-play');
  this.playButton.classList.add('player-control');
  this.pauseButton = document.createElement('button');
  this.pauseButton.classList.add('player-control');
  this.pauseButton.classList.add('player-pause');
  this.stopButton = document.createElement('button');
  this.stopButton.classList.add('player-stop');
  this.stopButton.classList.add('player-control');
  this.playerProgress = document.createElement('progress');
  this.playerProgress.classList.add('player-progress');
  this.playerProgress.classList.add('player-control');
  this.playerProgress.setAttribute('value', 0);
  this.playerProgress.setAttribute('max', 100);
  this.muteButton = document.createElement('button');
  this.muteButton.classList.add('player-mute');
  this.muteButton.classList.add('player-control');
  this.playerVolume = document.createElement('input');
  this.playerVolume.classList.add('player-volume');
  this.playerVolume.classList.add('player-control');
  this.playerVolume.setAttribute('type', 'range');
  this.playerVolume.setAttribute('min', 0);
  this.playerVolume.setAttribute('max', 100);
  this.playerVolume.value = 50;
};

SAudioPlayer.prototype.initUIEvents = function () {
  var player = this;
  this.playButton.addEventListener('click', function () {
    player.play()
  }, false);
  this.pauseButton.addEventListener('click', function () {
    player.pause()
  }, false);
  this.stopButton.addEventListener('click', function () {
    player.stop()
  }, false);
  this.muteButton.addEventListener('click', function () {
    player.toggleMuted();
  }, false);
  this.playerVolume.addEventListener('change', function () {
    player.setVolume(player.playerVolume.value);
  }, false);
}

SAudioPlayer.prototype.initMediaEvents = function () {
  var player = this;
  this.audioElement.addEventListener('timeupdate', function () {
    player.progress()
  }, false);
  this.audioElement.addEventListener('volumechange', function () {
    if (player.audioElement.muted || player.audioElement.volume == 0) {
      player.muteButton.classList.add('muted');
    } else if (player.muteButton.classList.contains('muted')) {
      player.muteButton.classList.remove('muted');
    }
  }, false);
  this.audioElement.addEventListener('ended', function () {
    player.pauseButton.style.display = 'none';
    player.playButton.style.display = 'inline';
    player.stopButton.disabled = true;
  }, false);
  this.audioElement.addEventListener('playing', function () {
    player.pauseButton.style.display = 'inline';
    player.playButton.style.display = 'none';
    player.stopButton.disabled = false;
  }, false);
  this.audioElement.addEventListener('pause', function () {
    player.pauseButton.style.display = 'none';
    player.playButton.style.display = 'inline';
    player.stopButton.disabled = true;
  }, false);
};

SAudioPlayer.prototype.initUI = function () {
  this.initControls();
  var divUI = document.createElement('div');
  divUI.className = 'player-ui';
  var divControls = document.createElement('div');
  divControls.className = 'player-controls-container';
  divControls.appendChild(this.playButton);
  divControls.appendChild(this.pauseButton);
  divControls.appendChild(this.stopButton);
  divControls.appendChild(this.playerProgress);
  divControls.appendChild(this.muteButton);
  divControls.appendChild(this.playerVolume);
  divUI.appendChild(divControls);
  this.domContainer.appendChild(divUI);
}

SAudioPlayer.prototype.play = function () {
  this.audioElement.play();
};

SAudioPlayer.prototype.pause = function () {
  this.audioElement.pause();
};

SAudioPlayer.prototype.stop = function () {
  this.audioElement.pause();
  this.audioElement.currentTime = 0;
};

SAudioPlayer.prototype.progress = function () {
  this.playerProgress.value = this.audioElement.currentTime * 100 / this.audioElement.duration;
};

SAudioPlayer.prototype.toggleMuted = function () {
  this.audioElement.muted = !this.audioElement.muted;
}

SAudioPlayer.prototype.setVolume = function (volume) {
  this.audioElement.volume = parseInt(volume, 10) / 100;
};

