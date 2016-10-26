Engine.Behaviors.$Register('$transform', function (x, y, z, r) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.r = r || 0;

});