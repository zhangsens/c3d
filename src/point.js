function point(x, y, z, far) {

    this.x = x;
    this.y = y;
    this.z = z;
    this.far = far;

    this.w = Math.sqrt(x * x + y * y + z * z);
    this.pi = Math.PI;

    this.angle();

    if (!this.sinX && !this.cosX) {
        this.sinX = 1;
        this.cosX = 0;
    } else if (!this.sinY && !this.cosY) {
        this.sinY = 1;
        this.cosY = 0;
    }

    this.axis();
    this.canvas();
}

point.prototype = {
    angle: function() {
        //与y轴所成角(面yx)
        this.sinX = this.x / Math.sqrt(this.x * this.x + this.y * this.y);
        this.cosX = this.y / Math.sqrt(this.x * this.x + this.y * this.y);

        //与z轴所成角(面yz)
        this.sinY = this.y / Math.sqrt(this.z * this.z + this.y * this.y);
        this.cosY = this.z / Math.sqrt(this.z * this.z + this.y * this.y);
    },
    _angle: function() {
        this._sinX = this.sinX;
        this._cosX = this.cosX;
        this._sinY = this.sinY;
        this._cosY = this.cosY;
    },
    axis: function() {
        this._x = this.x;
        this._y = this.y;
        this._z = this.z;
    },
    canvas: function() {
        this.canvasX = this._x * (this.far + this._y) / this.far;
        this.canvasY = -this._z * (this.far + this._y) / this.far;
    }
}