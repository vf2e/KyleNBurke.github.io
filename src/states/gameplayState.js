function GameplayState(gameManager) {
	UpdatableState.call(this, gameManager);
}

GameplayState.prototype = Object.create(UpdatableState.prototype);
GameplayState.prototype.constructor = UpdatableState;

GameplayState.prototype.onEnter = function() {
	var ambientLight = new THREE.AmbientLight(0x404040, 1);
	this.gameManager.scene.add(ambientLight);
	var pointLight = new THREE.PointLight(0x404040, 1.5);
	pointLight.position.set(32, 16, 32);
	var pointLight2 = new THREE.PointLight(0x404040, 1.5);
	pointLight2.position.set(-32, 16, -32);
	this.gameManager.scene.add(pointLight2);
	
	this.stage = new Stage(this.gameManager.scene);
	this.stage.load("res/stages/stage3.obj");
	this.player = new Player(this.gameManager.scene, this.gameManager.camera, this.stage);
	
	this.debugController = new DebugController(this.gameManager, this.stage, this.player, this.gameManager.camera);
	var that = this;

	document.addEventListener("pointerlockchange", onPointerLockChange);

	pause();

	var shouldPause = false;
	function onPointerLockChange() {
		if(shouldPause)
			pause();

		shouldPause = !shouldPause;
	}

	function pause() {
		that.gameManager.addState(new PauseMenuState(that.gameManager));
	}
}

GameplayState.prototype.onExit = function() {
}

GameplayState.prototype.onPause = function() {
	UpdatableState.prototype.onPause.call(this);
}

GameplayState.prototype.onUnpause = function() {
	UpdatableState.prototype.onUnpause.call(this);
	this.gameManager.canvas.requestPointerLock();
}

GameplayState.prototype.update = function(timeStep) {
	this.player.update(timeStep);
	this.stage.update();
	this.debugController.update(timeStep);
}