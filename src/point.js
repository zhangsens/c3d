function point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pi = Math.PI;
    this.p = this.pi;
    this.angleX = 3 / 4 * this.pi;
    this.angleY = 3 / 4 * this.pi;
    this.canvasX = this.x; //this.x * Math.cos(this.angleX) - this.y * Math.sin(this.angleX);
    this.canvasY = this.z; //this.z * Math.cos(this.angleY) - this.y * Math.sin(this.angleY);
}

function axis(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pi = Math.PI;
    this.angleX = 0 * this.pi;
    this.angleY = 1 / 4 * this.pi;
}