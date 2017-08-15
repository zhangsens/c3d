function point(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.w = Math.sqrt(x * x + y * y + z * z);
    this.pi = Math.PI;
    //与y轴所成角(面yx)
    this.sinX = this.x / Math.sqrt(this.x * this.x + this.y * this.y);
    this.cosX = this.y / Math.sqrt(this.x * this.x + this.y * this.y);
    //与z轴所成角(面yz)
    this.sinY = Math.sqrt(this.x * this.x + this.y * this.y) / this.w;
    this.cosY = this.z / this.w;

    if (!this.sinX && !this.cosX) {
        this._x = 0;
        this._y = 0;
        this._z = this.w * this.cosY;
    } else if (!this.sinY && !this.cosY) {
        this._x = this.w * this.sinX;
        this._y = 0;
        this._z = 0;
    } else {
        this._x = this.w * this.sinY * this.sinX;
        this._y = this.w * this.sinY * this.cosX;
        this._z = this.w * this.cosY;
    }

    this.canvasX = this._x * (1000 + this._y) / 1000;
    this.canvasY = -this._z * (1000 + this._y) / 1000;
}