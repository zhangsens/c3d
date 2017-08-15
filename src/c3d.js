var c3d = function(ctx) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas
    this.played = true;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this._axis = [0, 0];
    this.ax = e.clientX;
    this.ay = e.clientY;
    this.axis([this.width / 2, this.height / 2]);
    this.canvas.addEventListener("mousedown", this.mousedown.bind(this), false);
    this.canvas.addEventListener("mousemove", this.mousemove.bind(this), false);
}

c3d.prototype = {
    data: function(data) {
        this.datas = [];
        var _data = [];

        for (let i in data) {
            _data.push(new point(data[i][0][0], data[i][0][1], data[i][0][2]))
        }

        for (let m in data) {
            let __data = [];
            for (let n in data[m]) {
                for (let p in data) {
                    if (data[m][n] == data[p][0]) {
                        __data.push(_data[p])
                    }
                }
            }
            this.datas.push(__data);
        }
        return this.datas;
    },

    draw: function(data) {
        var data = this.data(data);
        this.ctx.strokeStyle = "hsla(0,0%,0%,1)";
        for (let m in data) {
            for (let n in data[m]) {
                this.ctx.beginPath();
                this.ctx.moveTo(data[m][0].canvasX, data[m][0].canvasY);
                this.ctx.lineTo(data[m][n].canvasX, data[m][n].canvasY);
                this.ctx.stroke();
            }
        }
    },
    //去重
    dereplication: function(data) {
        var _data = data;
        var pointArr = [];
        for (let m in _data) {
            for (let n in _data[m]) {
                pointArr.push({ form: _data[m][0], to: _data[m][n] });
            }
        }
        return pointArr;
    },
    axis: function(data) {
        this._axis = data;
        this.ctx.translate(this._axis[0], this._axis[1]);
    },

    clearCanvas: function() {
        this.ctx.clearRect(-this._axis[0], -this._axis[1], this.width, this.height);
    },

    run: function() {
        if (this.played) {
            this.clearCanvas();
            this.draw(this.datas);
            requestAnimationFrame(this.run.bind(this));
        }
    },
    mousedown: function(e) {
        this.ax = e.clientX;
        this.ay = e.clientY;
    },
    mousemove: function(e) {
        if (e.button == 0 && e.buttons == 1) {
            //this.clearCanvas();
            this.draw();
        }
    }
}