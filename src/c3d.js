var c3d = function(ctx) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas
    this.played = true;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this._axis = new point(0, 0, 0);
    this.axis([this.width / 2, this.height / 2, 0]);
}

c3d.prototype = {
    data: function(data) {
        var _data = [];
        for (let i in data) {
            var __data = [];
            for (let m in data[i]) {
                __data.push(new point(data[i][m][0], data[i][m][1], data[i][m][2]));
            }
            _data.push(__data);
        }
        return _data;
    },

    draw: function(data) {
        for (let m in data) {
            for (let n in data[m]) {
                this.ctx.beginPath();
                console.log(data[m][0]);
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
        // console.log(_data[0][0]);
        // console.log(_data[1][1]);
        // console.log(_data[0][0] == _data[1][1]);
    },
    axis: function(axis) {
        this.clearCanvas();
        this.ctx.translate(-this._axis.x, -this._axis.y);
        this._axis = new point(axis[0], axis[1], axis[2]);
        this.ctx.translate(this._axis.x, this._axis.y);
        //X
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(400, 0);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-400, 400);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -400);
        this.ctx.stroke();
    },

    clearCanvas: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    run: function() {
        if (this.played) {
            this.clearCanvas();
            this.draw(this.data);
            requestAnimationFrame(this.run.bind(this));
        }

    }
}