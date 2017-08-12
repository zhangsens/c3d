var c3d = function(ctx) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas
    this.played = true;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this._axis = new point(0, 0, 0);
    this.axis([this.width / 2, 0, this.height / 2]);
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
        // console.log(_data[0][0]);
        // console.log(_data[1][1]);
        // console.log(_data[0][0] == _data[1][1]);
    },
    axis: function(data) {
        this.clearCanvas();
        this.ctx.translate(-this._axis.x, -this._axis.y);
        this._axis = new axis(data[0], data[1], data[2]);
        this.ctx.translate(this._axis.x, this._axis.z);
        //axis
        var a = (400 - 400 * Math.cos(this._axis.angleY)) / 400 * Math.sqrt(400 * 400 - 400 * Math.cos(this._axis.angleX) * 400 * Math.cos(this._axis.angleX))
        var b = (400 - 400 * Math.cos(this._axis.angleX)) / 400 * Math.sqrt(400 * 400 - 400 * Math.cos(this._axis.angleY) * 400 * Math.cos(this._axis.angleY))
        this.ctx.beginPath();
        this.ctx.strokeStyle = "hsla(0,100%,50%,1)";
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(400 * Math.cos(this._axis.angleX), a);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "hsla(240,100%,50%,1)";
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-400 * Math.sin(this._axis.angleX), 400 * Math.cos(this._axis.angleY));
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "hsla(60,100%,50%,1)";
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -400 * Math.cos(this._axis.angleY));
        this.ctx.stroke();
    },

    //旋转
    rotate: function() {
        //横向距离
        var rotateX = 20;
        //纵向距离
        var rotateY = 20;
        //?
        var rotateZ = 0;
        //对X,y,Z处理

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