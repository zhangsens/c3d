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
}

c3d.prototype = {
    data: function(data) {
        var datas;
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

        datas = this.dereplication(this.datas);
        this.datas = this.arrClean(datas);

        return this.datas;
    },

    dereplication: function(datas) {
        var data = datas;
        var pointArr = this.arrApart(data);

        for (let m in pointArr) {
            let a, b;

            for (let n = 0; n < m; n++) {
                if (pointArr[n]) {
                    a = pointArr[n].indexOf(pointArr[m][0]);
                    b = pointArr[n].indexOf(pointArr[m][1]);
                    if (a >= 0 && b >= 0) {
                        delete pointArr[m];
                        break;
                    }
                } else {
                    continue;
                }
            }

        }

        return pointArr;
    },

    arrApart: function(array) {
        var _array = new Array();

        for (let m in array) {
            for (var n = 1; n < array[m].length; n++) {
                _array.push([array[m][0], array[m][n]])
            }
        }

        return _array;
    },

    arrClean: function(array) {
        for (let i = 0; i < array.length; i++) {
            if (!array[i]) {
                array.splice(i, 1);
                i--;
            }
        }
        return array;
    },

    draw: function(callback) {
        var data = this.datas;
        this.ctx.strokeStyle = "hsla(0,0%,0%,1)";

        for (let m in data) {
            for (let n = 1; n < data[m].length; n++) {

                if (typeof(callback) == "function") {
                    callback(data[m][n].canvasX, data[m][n].canvasY, this.ctx);
                } else {
                    callback = undefined;
                    this.ctx.beginPath();
                    this.ctx.moveTo(data[m][0].canvasX, data[m][0].canvasY);
                    this.ctx.lineTo(data[m][n].canvasX, data[m][n].canvasY);
                    this.ctx.stroke();
                }

            }
        }

        //this.info = runInfo("draw", callback);
    },

    _draw: function(callback) {
        //自定义绘制
        callback(this.datas, this.ctx);

        //this.info = runInfo("_draw", callback)
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

    cameraRotate: function(x, y, fixed) {
        //fixed:true or false;
        var center = new Object();
        var time;
        if (fixed) {
            center.x = 0;
            center.y = 0;
            center.z = 0;
            times = 1;
        } else {
            center.x = this.center.x;
            center.y = this.center.y;
            center.z = this.center.z;
            times = 10;
        }
        var clientX = e.clientX;
        var clientY = e.clientY;

        var ax = x - this.ax;
        var ay = y - this.ay;

        this.rotateX = ax / times;
        this.rotateY = ay / times;

        var sinX = Math.sin(this.rotateX * this.pi / 180);
        var cosX = Math.cos(this.rotateX * this.pi / 180);
        var sinY = Math.sin(this.rotateY * this.pi / 180);
        var cosY = Math.cos(this.rotateY * this.pi / 180);

        for (let i in this._data) {

            let x = this._data[i].x - center.x;
            let y = this._data[i].y - center.y;
            let z = this._data[i].z - center.z;

            //(x,y)
            this._data[i]._x = x * cosX + y * sinX + center.x;
            this._data[i]._y = x * sinX - y * cosX + center.y;

            y = this._data[i]._y - center.y;
            //(z,y)
            this._data[i]._z = z * cosY + y * sinY + center.z;
            this._data[i]._y = z * sinY - y * cosY + center.y;

            this._data[i].canvas();
        }

        this.clearCanvas();
        this.draw();
    }
}