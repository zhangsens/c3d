function point(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.w = Math.sqrt(x * x + y * y + z * z);
    this.pi = Math.PI;

    this.angle();

    if (!this.sinX && !this.cosX) {
        // this._x = 0;
        // this._y = 0;
        // this._z = this.w * this.cosY;
        this.sinX = 1;
        this.cosX = 0;
    } else if (!this.sinY && !this.cosY) {
        // this._x = this.w * this.sinX;
        // this._y = 0;
        // this._z = 0;
        this.sinY = 1;
        this.cosY = 0;
    } else {
        // this._x = this.w * this.sinY * this.sinX;
        // this._y = this.w * this.sinY * this.cosX;
        // this._z = this.w * this.cosY;
    }

    this._angle();
    this.axis();
    this.canvas();
}

point.prototype = {
    angle: function() {
        //与y轴所成角(面yx)
        this.sinX = this.x / Math.sqrt(this.x * this.x + this.y * this.y);
        this.cosX = this.y / Math.sqrt(this.x * this.x + this.y * this.y);
        //与z轴所成角(面yz)
        this.cosY = this.z / this.w;
        this.sinY = (this.y / Math.abs(this.y)) * Math.sqrt(this.x * this.x + this.y * this.y) / this.w;
    },
    _angle: function() {
        this._sinX = this.sinX;
        this._cosX = this.cosX;
        this._sinY = this.sinY;
        this._cosY = this.cosY;
    },
    axis: function() {
        this._x = this.w * Math.abs(this._sinY) * this._sinX;
        this._y = this.w * Math.abs(this._sinY) * this._cosX;
        this._z = this.w * this._cosY;
        //console.log(this._x * this._x + this._y * this._y + this._z * this._z);
    },
    canvas: function() {
        this.canvasX = this._x * (1000 + this._y) / 1000;
        this.canvasY = -this._z * (1000 + this._y) / 1000;
    }
}