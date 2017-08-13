function point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pi = Math.PI;
    this.p = this.pi;
    this._x = this.x;
    this._y = this.y;
    this._z = this.z;
    this.angleX = 3 / 4 * this.pi;
    this.angleY = 3 / 4 * this.pi;
    this.canvasX = this._x * (1000 + this._y) / 1000; //this.x * Math.cos(this.angleX) - this.y * Math.sin(this.angleX);
    this.canvasY = this._z * (1000 + this._y) / 1000; //this.z * Math.cos(this.angleY) - this.y * Math.sin(this.angleY);
}

function axis(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pi = Math.PI;
    //转动X轴
    this.angleX = 1 / 4 * this.pi;
    //转动Y轴
    this.angleY = 1 / 2 * this.pi;
    //转动Z轴
    this.angleZ = 1 / 4 * this.pi;
}

function d3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._x = this.x;
    this._y = this.y;
    this._z = this.z;

    this.width = l(this.x, this.y, this.z);
    this.zy = l(this.z, this.y);
    this.xy = l(this.x, this.y);
    this.ax = Math.asin(this.y / l(this.z, this.y));
    this.ay = Math.asin(this.x / l(this.x, this.y));
    //nx=0，z为最大值
    this.nx = this.ax;
    //ny=0，x为最大值
    this.ny = this.ay;

    //nx,ny
    this.signX;
    this.signY = Math.sin(this.nx) / Math.abs(Math.sin(this.nx)) * Math.sin(this.ny) / Math.abs(Math.sin(this.ny));
    this.signZ;

    var sx = Math.pow(Math.sin(this.nx), 2);
    var sy = Math.pow(Math.sin(this.ny), 2);
    this._y = this.width * Math.sqrt(sx * sy / (sx + sy - sx * sy));
    this._x = this.y / (Math.round(Math.tan(this.ny) * 10000) / 10000);
    this._z = this.y / (Math.round(Math.tan(this.nx) * 10000) / 10000);

    this.canvasX = l(this._z, this._y) * Math.cos(this.nx) * (2000 + this.y) / 2000;
    this.canvasY = l(this._x, this._y) * Math.cos(this.ny) * (2000 + this.y) / 2000;

}