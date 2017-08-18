var c3d = function(ctx) {

    this.ctx = ctx;
    this.canvas = this.ctx.canvas
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.rotateX = 0;
    this.rotateY = 0;

    var axis = [this.width / 2, this.height / 2]
    this.axis(axis);
    var center = [0, 1000, 0];
    this.camera(center);

    this.pi = Math.PI;

    //动画播放
    this.played = true;

    this.canvas.addEventListener("mousemove", this.cameraRotate.bind(this), false);
}

c3d.prototype = {
    data: function(data) {
        this.datas = [];
        this._data = [];

        for (let i in data) {
            this._data.push(new point(data[i][0][0], data[i][0][1], data[i][0][2], this.center.y))
        }

        for (let m in data) {
            let __data = [];
            for (let n in data[m]) {
                for (let p in data) {
                    if (data[m][n] == data[p][0]) {
                        __data.push(this._data[p])
                    }
                }
            }
            this.datas.push(__data);
        }
        return this.datas;
    },

    draw: function() {
        var data = this.datas;
        this.ctx.strokeStyle = "hsla(0,0%,0%,1)";
        for (let m in data) {
            for (let n in data[m]) {
                this.ctx.beginPath();
                this.ctx.moveTo(data[m][0].canvasX, data[m][0].canvasY);
                this.ctx.lineTo(data[m][n].canvasX, data[m][n].canvasY);
                //ctx.arc(data[m][n].canvasX, data[m][n].canvasY, 10, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        }
    },
    //去重
    dereplication: function(data) {
        // var _data = data;
        // var pointArr = [];
        // for (let m in _data) {
        //     for (let n in _data[m]) {
        //         pointArr.push({ form: _data[m][0], to: _data[m][n] });
        //     }
        // }
        // return pointArr;
    },

    axis: function(axis) {
        this._axis = axis;
        this.ax = this._axis[0];
        this.ay = this._axis[1];
        this.ctx.translate(this._axis[0], this._axis[1]);
    },

    camera: function(center) {
        this.center = new Object();
        this.center.x = center[0];
        this.center.y = center[1];
        this.center.z = center[2];
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

    cameraRotate: function(e) {

        var ax = e.clientX - this.ax;
        var ay = e.clientY - this.ay;

        this.rotateX = ax / 10;
        this.rotateY = ay / 10;

        var sinX = Math.sin(this.rotateX * this.pi / 180);
        var cosX = Math.cos(this.rotateX * this.pi / 180);
        var sinY = Math.sin(this.rotateY * this.pi / 180);
        var cosY = Math.cos(this.rotateY * this.pi / 180);

        for (let i in this._data) {

            let x = this._data[i].x - this.center.x;
            let y = this._data[i].y - this.center.y;
            let z = this._data[i].z - this.center.z;
            //(x,y)
            this._data[i]._x = x * cosX + y * sinX + this.center.x;
            this._data[i]._y = x * sinX - y * cosX + this.center.y;

            y = this._data[i]._y - this.center.y;
            //(z,y)
            this._data[i]._z = z * cosY + y * sinY + this.center.z;
            this._data[i]._y = z * sinY - y * cosY + this.center.y;

            this._data[i].canvas();
        }

        this.clearCanvas();
        this.draw();
    }
}