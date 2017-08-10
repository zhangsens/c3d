var c3d = function(ctx, data) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas
    this.played = true;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.data = data;
    //this.ctx.translate(this.canvas.width, this.canvas.height);
}
c3d.prototype.mode = function(data) {

}
c3d.prototype.draw = function(data) {
    for (let i = 0; i < data[1].length; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(data[0].canvasX, data[0].canvasY);
        if (data[1][i].length > 1) {
            this.ctx.lineTo(data[1][i][0].canvasX, data[1][i][0].canvasY);
            this.ctx.stroke();
            this.draw(data[1][i]);
        } else {
            this.ctx.lineTo(data[1][i].canvasX, data[1][i].canvasY);
            this.ctx.stroke();
        }
    }
};
c3d.prototype.video = function(video) {
    this.ctx.translate(video.x, video.y);
}
c3d.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}
c3d.prototype.run = function() {
    if (this.played) {
        this.clearCanvas();
        this.draw(this.data);
        requestAnimationFrame(this.run.bind(this));
    }

}