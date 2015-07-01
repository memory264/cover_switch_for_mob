(function () {
    window.addEventListener("load", function () {
        /*控制音乐模块*/
        var sound = document.getElementById("sound"),
            audio = document.getElementById("audio");
        sound.addEventListener("click", function () {
            if (this.className == "audio close") {
                this.className = "audio";
                audio.play();
            } else {
                this.className = "audio close";
                audio.pause();
            }
        }, false);

        function stopDefault(e, ele) {
            if (e.target.nodeName.toLowerCase() == ele) {
                e.preventDefault();
            }
        }
        /*整页滑动模块*/
        function Slide(opts) {
            this.idxs = opts.idxs;
            this.len=this.idxs.length;
            this.wrap=opts.wrap;
            this.init();
            this.bindEven();
        }
        Slide.prototype = {
            init: function () {
                this.index = 0;
                this.movindex=0;
                this.h = window.innerHeight;
                this.flag=this.h/8;
            },
            bindEven: function () {

                var startY, offsetY,cur,z= 1,
                    _this = this;
                var startFun = function (e) {
                    stopDefault(e, "section");
                    startY = e.touches[0].clientY;
                    offsetY =0;
                };
                var moveFun = function (e) {
                    stopDefault(e, "section");
                    offsetY = e.touches[0].clientY - startY;
                    if (offsetY < 0) {/*向上划*/
                        _this.movindex=_this.index+1;
                        cur=_this.h+offsetY;
                    } else {/*向下划*/
                        _this.movindex=_this.index-1;
                        cur=-_this.h+offsetY;
                    }
                    _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.zIndex= z)
                    _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.webkitTransform='translate3d(0,'+cur+'px,0)')
                    _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.webkitTransition='none')

                };
                var endFun = function (e) {
                    stopDefault(e, "section");
                    _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.webkitTransition='transform .5s')
                    //ffsetY!=0判断不是tap事件
                    if(Math.abs(offsetY)<_this.flag&&offsetY!=0){
                        if (offsetY < 0) {/*向上划*/
                            _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.webkitTransform='translate3d(0,100%,0)')
                        } else {/*向下划*/
                            _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.webkitTransform='translate3d(0,-100%,0)')
                        }

                    }else if(Math.abs(offsetY)>=_this.flag&&offsetY!=0){
                        _this.idxs[_this.movindex]&&(_this.idxs[_this.movindex].style.webkitTransform='translate3d(0,0,0)');
                        offsetY<0?_this.index++:_this.index--;
                        if(_this.index>_this.len-1){
                            _this.index=_this.len-1
                        }else if(_this.index<0){
                            _this.index=0
                        }
                        _this.idxs[_this.movindex]&&(z++);
                    }
                };

                    this.wrap.addEventListener("touchstart", startFun, false);
                    this.wrap.addEventListener("touchmove", moveFun, false);
                    this.wrap.addEventListener("touchend", endFun, false);

            }
        }

        new Slide({
            wrap:document.getElementById("pages"),
            idxs: document.getElementById("pages").getElementsByTagName("section")
        })
    }, false)
})();