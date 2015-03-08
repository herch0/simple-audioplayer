function SAudioPlayer(config) {
  //assume required parameters are specified
  this.container = config.container;
  this.insertAudioElement();
  this.createUI();
}

SAudioPlayer.prototype.insertAudioElement = function() {
  var audio = document.createElement('audio');
  var domContainer = document.getElementById(this.container);
  var audioSrc = domContainer.dataset.src;
  audio.setAttribute('src', audioSrc);
  domContainer.appendChild(audio);
  this.domContainer = domContainer;
};

SAudioPlayer.prototype.createUI = function() {
  var playButton = document.createElement('button');
  playButton.classList.add('player-play');
  playButton.classList.add('player-control');
  var pauseButton = document.createElement('button');
  pauseButton.classList.add('player-control');
  pauseButton.classList.add('player-pause');
  var stopButton = document.createElement('button');
  stopButton.classList.add('player-stop');
  stopButton.classList.add('player-control');
  var playerProgress = document.createElement('progress');
  playerProgress.classList.add('player-progress');
  playerProgress.classList.add('player-control');
  playerProgress.setAttribute('value', 0)
  var playerVolume = document.createElement('input');
  playerVolume.classList.add('player-volume');
  playerVolume.classList.add('player-control');
  playerVolume.setAttribute('type', 'range');
  playerVolume.setAttribute('min', 0);
  playerVolume.setAttribute('max', 100);
  var divUI = document.createElement('div');
  divUI.className = 'player-ui';
  var divCredits = document.createElement('div');
  divCredits.className = 'player-credits';
  var divTrackTitle = document.createElement('div');
  divTrackTitle.className = 'player-track-title';
  var divControls = document.createElement('div');
  divControls.className = 'player-controls-container';
  divControls.appendChild(playButton);
  divControls.appendChild(pauseButton);
  divControls.appendChild(stopButton);
  divControls.appendChild(playerProgress);
  divControls.appendChild(playerVolume);
  divUI.appendChild(divCredits);
  divUI.appendChild(divControls);
  divUI.appendChild(divTrackTitle);
  this.domContainer.appendChild(divUI);
};

