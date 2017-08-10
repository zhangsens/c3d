function point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.canvasX = this.x - this.y / 2;
    this.canvasY = -this.z + this.y / 2;
}