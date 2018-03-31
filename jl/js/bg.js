window.onload=function () {
    var aBtn=document.getElementsByClassName('btn');
    var oCont=document.getElementById('cont-1');
    var oCon=document.getElementById('cont');
    var it='';





    for(var i=0;i<aBtn.length;i++)
    {
        aBtn[i].index=i;
        aBtn[i].onclick=function () {
            tim=false;
            for(var j=0;j<aBtn.length;j++)
            {
                aBtn[j].className='btn';
            }
            this.className='active btn';
            it=parseInt(-this.index*oCon.offsetHeight);
            tim = false;
            startMove(oCont,it);
            setTimeout(function () {
                tim=true;
            },1000);
        };
    }

    $(document).on("mousewheel DOMMouseScroll", function (e) {

        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox


        if (delta > 0 && tim && oCont.offsetTop<-100) {
            // 向上滚
            startMove(oCont,oCont.offsetTop+oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            tim = false;
            setTimeout(function () {
                tim=true;
            },1000);
            aBtn[parseInt(-oCont.offsetTop/oCon.offsetHeight-1)].className = 'btn active';
        } else if (delta < 0 && tim && oCont.offsetTop>(-4*oCon.offsetHeight+100)) {
            // 向下滚
            startMove(oCont,oCont.offsetTop-oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            tim = false;
            setTimeout(function () {
                tim=true;
            },1000);
            aBtn[parseInt(-oCont.offsetTop/oCon.offsetHeight+1)].className = 'btn active';
        }
    });


    var startX, startY, moveEndX, moveEndY, X, Y;

    window.addEventListener('touchstart', function(e) {

        e.preventDefault();

        startX = e.touches[0].pageX;

        startY = e.touches[0].pageY;

    });

    window.addEventListener('touchmove', function(e) {

        e.preventDefault();

        moveEndX = e.changedTouches[0].pageX;

        moveEndY = e.changedTouches[0].pageY;

        X = moveEndX - startX;

        Y = moveEndY - startY;

        if ( Y < 0&& tim && oCont.offsetTop>(-4*oCon.offsetHeight+100))
        {
            startMove(oCont,oCont.offsetTop-oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            tim = false;
            setTimeout(function () {
                tim=true;
            },1000);
            aBtn[parseInt(-oCont.offsetTop/oCon.offsetHeight+1)].className = 'btn active';
        }

        else if ( Y > 0 && tim && oCont.offsetTop<-100)
        {
            startMove(oCont,oCont.offsetTop+oCon.offsetHeight);
            for(var i=0;i<aBtn.length;i++)
            {
                aBtn[i].className='btn';
            }
            tim = false;
            setTimeout(function () {
                tim=true;
            },1000);
            aBtn[parseInt(-oCont.offsetTop/oCon.offsetHeight-1)].className = 'btn active';
        }
    });


}
var tim=true;



function startMove(obj,iTarget) {

    clearInterval(obj.timer);

    if(obj.offsetWidth==iTarget)
    {
        clearInterval(obj.timer);
    }
    else
    {

        obj.timer=setInterval(function () {

            var speed=(iTarget-obj.offsetTop)/5;

            if(speed>0)
            {
                speed=Math.ceil(speed);
            }
            else
            {
                speed=Math.floor(speed);
            }

            obj.style.top=obj.offsetTop+speed+'px';

        },30);


    }
}