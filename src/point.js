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
    this.__angle();
    this.axis();
    this.canvas();
}

point.prototype = {
    angle: function() {
        //与y轴所成角(面yx)
        this.sinX = this.x / Math.sqrt(this.x * this.x + this.y * this.y);
        this.cosX = this.y / Math.sqrt(this.x * this.x + this.y * this.y);
        //与z轴所成角(面yz)
        // this.cosY = this.z / this.w;
        // this.sinY = (this.y / Math.abs(this.y)) * Math.sqrt(this.x * this.x + this.y * this.y) / this.w;
        this.sinY = this.y / Math.sqrt(this.z * this.z + this.y * this.y);
        this.cosY = this.z / Math.sqrt(this.z * this.z + this.y * this.y);
    },
    _angle: function() {
        this._sinX = this.sinX;
        this._cosX = this.cosX;
        this._sinY = this.sinY;
        this._cosY = this.cosY;
    },
    __angle: function() {
        //到原点的直线与z轴缩成角
        this._cos = (this._cosY / Math.abs(this._cosY)) * Math.sqrt(this._cosX * this._cosX * this._cosY * this._cosY / (this._sinX * this._sinX * this._sinY * this._sinY + this._cosX * this._cosX));
        this._sin = (this._cosX / Math.abs(this._cosX)) * Math.sqrt(1 - this._cos * this._cos);
    },
    __aAngleY: function() {
        var signX = Math.ceil(this._cos) > 0 ? Math.ceil(this._cos) : -1;
        var signY = Math.ceil(this._cosX) > 0 ? Math.ceil(this._cosX) : -1;

        this._cosY = signX * Math.sqrt(this._cos * this._cos / (this._cosX * this._cosX + this._sinX * this._sinX * this._cos * this._cos));
        this._sinY = signY * Math.sqrt(1 - this._cosY * this._cosY);
    },
    axis: function() {
        this._x = Math.abs(this.w * this._sin) * this._sinX;
        this._y = Math.abs(this.w * this._sin) * this._cosX;

        this._z = this.w * this._cos; //??
        // console.log(this.x, this.y, this.z);
        // console.log(this._x, this._y, this._z);
    },
    canvas: function() {
        this.canvasX = this._x * (1000 + this._y) / 1000;
        this.canvasY = -this._z * (1000 + this._y) / 1000;
    }
}