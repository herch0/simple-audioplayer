function SAudioPlayer(config) {
  //assume required parameters are specified
  this.container = config.container;
  this.insertAudioElement();
  this.createUI();
}

SAudioPlayer.prototype.insertAudioElement = function() {
  var audio = document.createElement('audio');
  var divContainer = document.getElementById(this.container);
  var audioSrc = divContainer.dataset.src;
  audio.setAttribute('src', audioSrc);
  divContainer.appendChild(audio);
  this.divContainer = divContainer;
};

SAudioPlayer.prototype.createUI = function() {
  var divUI = document.createElement('div');
  divUI.className = 'player-ui';
  this.divContainer.appendChild(divUI);
};

