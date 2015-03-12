function SAudioPlayer(config) {
  //assume required parameters are specified
  this.container = config.container;
  this.insertAudioElement();
  this.initUI();
  this.initEvents();
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
  this.playerProgress.setAttribute('value', 0)
  this.playerVolume = document.createElement('input');
  this.playerVolume.classList.add('player-volume');
  this.playerVolume.classList.add('player-control');
  this.playerVolume.setAttribute('type', 'range');
  this.playerVolume.setAttribute('min', 0);
  this.playerVolume.setAttribute('max', 100);
};

SAudioPlayer.prototype.initEvents = function () {
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
  this.audioElement.addEventListener('timeupdate', function () {
    player.progress()
  }, false);
  this.audioElement.addEventListener('ended', function () {
    player.pauseButton.style.display = 'none';
    player.playButton.style.display = 'inline';
  }, false);
}

SAudioPlayer.prototype.initUI = function () {
  this.initControls();
  var divUI = document.createElement('div');
  divUI.className = 'player-ui';
  var divCredits = document.createElement('div');
  divCredits.className = 'player-credits';
  var divTrackTitle = document.createElement('div');
  divTrackTitle.className = 'player-track-title';
  var divControls = document.createElement('div');
  divControls.className = 'player-controls-container';
  divControls.appendChild(this.playButton);
  divControls.appendChild(this.pauseButton);
  divControls.appendChild(this.stopButton);
  divControls.appendChild(this.playerProgress);
  divControls.appendChild(this.playerVolume);
  divUI.appendChild(divCredits);
  divUI.appendChild(divControls);
  divUI.appendChild(divTrackTitle);
  this.domContainer.appendChild(divUI);
}

SAudioPlayer.prototype.play = function () {
  if (!isNaN(this.audioElement.duration)) {
    this.playerProgress.max = this.audioElement.duration;
  }
  this.audioElement.play();
  this.playButton.style.display = 'none';
  this.pauseButton.style.display = 'inline';
};

SAudioPlayer.prototype.pause = function () {
  this.audioElement.pause();
  this.pauseButton.style.display = 'none';
  this.playButton.style.display = 'inline';
};

SAudioPlayer.prototype.stop = function () {
  this.audioElement.pause();
  this.audioElement.currentTime = 0;
};

SAudioPlayer.prototype.progress = function () {
  this.playerProgress.value = this.audioElement.currentTime;
};

