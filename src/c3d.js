var c3d = function(ctx) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas
    this.played = true;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this._axis = new point(0, 0, 0);
    this.ax = e.clientX;
    this.ay = e.clientY;
    this.t = new d3(100, 100, 100);
    this._t = new d3(100, -100, 100);
    this.axis([this.width / 2, 0, this.height / 2]);
    this.canvas.addEventListener("mousedown", this.mousedown.bind(this), false);
    this.canvas.addEventListener("mousemove", this.mousemove.bind(this), false);
}

c3d.prototype = {
    data: function(data) {
        this.data = [];
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
            this.data.push(__data);
        }
        return this.data;
    },

    draw: function(data) {
        var data = this.data;
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
        this.clearCanvas();
        this.ctx.translate(-this._axis.x, -this._axis.y);
        this._axis = new axis(data[0], data[1], data[2]);
        this.ctx.translate(this._axis.x, this._axis.z);
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
        this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
    },

    run: function() {
        if (this.played) {
            this.clearCanvas();
            this.draw(this.data);
            requestAnimationFrame(this.run.bind(this));
        }
    },
    test: function() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "hsla(10,100%,50%,1)";
        var x = l(this.t._z, this.t._y) * Math.cos(this.t.nx) * (2000 + this.t.y) / 2000;
        var y = l(this.t._x, this.t._y) * Math.cos(this.t.ny) * (2000 + this.t._y) / 2000;
        console.log(this.t._z);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    },
    mousedown: function(e) {
        this.ax = e.clientX;
        this.ay = e.clientY;
    },
    // mousemove: function(e) {
    //     if (e.button == 0 && e.buttons == 1) {
    //         var ay = e.clientY;
    //         var ax = e.clientX;
    //         var nx = Math.asin((this.ax - ax) / 200);
    //         var ny = Math.asin((this.ay - ay) / 200);
    //         // this.t._x = this.t.x * Math.cos(Y轴);
    //         // this.t._y = this.t.y * Math.sin(Y轴) * Math.sin(X轴);
    //         // this.t._z = this.t.z * Math.cos(X抽);
    //         this.t.nx = this.t.ax + nx;
    //         this.t.ny = this.t.ax + ny;
    //         var sx = Math.pow(Math.sin(this.t.nx), 2);
    //         var sy = Math.pow(Math.sin(this.t.ny), 2);
    //         this.t._y = this.t.width * Math.sqrt(sx * sy / (sx + sy - sx * sy)) || 0;
    //         this.t._x = this.t.y / (Math.round(Math.tan(this.t.ny) * 10000) / 10000);
    //         this.t._z = this.t.y / (Math.round(Math.tan(this.t.nx) * 10000) / 10000);
    //         console.log(this.t._x, this.t._y, this.t._z);

    //         this.clearCanvas();
    //         this.test();
    //     }

    // }
    mousemove: function(e) {
        if (e.button == 0 && e.buttons == 1) {
            var ax = e.clientX;
            var ay = e.clientY;
            console.log(this.ax - ax);
            console.log(this.ay - ay);
            for (let i in this.data) {
                // this.data[i][0]._x;
                this.data[i][0]._y = this.data[i][0].y + this.ax - ax;
                // this.data[i][0]._z;
                this.data[i][0].canvasX = this.data[i][0]._x * (1000 + this.data[i][0]._y) / 1000;
                this.data[i][0].canvasY = this.data[i][0]._z * (1000 + this.data[i][0]._y) / 1000;
            }
            this.clearCanvas();
            this.draw();
        }
    }
}