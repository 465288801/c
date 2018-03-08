window.onload=function () {
    var oBg=document.getElementById('bg');
    var bGame=document.getElementById('game');
    var oBox1=document.getElementById('begin');
    var aBegin=oBox1.getElementsByTagName('div');
    var oPlayer=document.getElementById('player');
    var oPlayer2=document.getElementById('player-b');
    var oPlayer3=document.getElementById('player-c');
    var oBu1=document.getElementById('bu1');
    var oBu2=document.getElementById('bu2');
    var oBu3=document.getElementById('bu3');
    var aRock=document.getElementsByClassName('rock');
    var tim=0;
    var wd=false;
    var move=true;
    var aPlane=document.getElementsByClassName('plane-d');
    var aPlaneZd=document.getElementsByClassName('plane-zd');
    var oStrong=document.getElementById('strong');
    var oTs1=document.getElementById('ts1');
    var oTs2=document.getElementById('ts2');
    var oTs3=document.getElementById('ts3');
    var fx=null;
    var wl=1;
    var zdLeft=31;
    var oWidth=document.documentElement.clientHeight/830;
    var tim1=0;
    var oStrongx=null;
    var oStrongy=null;
    var life=2;
    var oLife1=document.getElementById('life1');
    var oLife2=document.getElementById('life2');
    var oScore1=document.getElementById('score1');
    var oScore2=document.getElementById('score2');
    var oScore3=document.getElementById('score3');
    var oScore4=document.getElementById('score4');
    var oRrestart=document.getElementById('restart');
    var score=0;

    function fbl() {
        if(document.documentElement.clientHeight<800)
        {
            oBg.style.transform="scale("+oWidth+","+oWidth+")";
            oBg.style.top=document.documentElement.clientHeight-1000;
        }
    }

    fbl();




    bGame.onclick=function () {
        storeMove();  //调用石头移动函数
        oPlayer.style.display='block';
        oPlayer.style.top='600px';
        oPlayer.style.left='250px';
        oBox1.style.display='none';
        for(var i=0;i<aBegin.length;i++)
        {
            aBegin[i].style.display='none';
        }

        var left=false;
        var right=false;
        var up=false;
        var down=false;
        var shut=false;



        setInterval(function () {
            if(shut&&tim==0&&move)
            {
                tim=1;
                clearInterval(oBu1.timer);
                clearInterval(oBu2.timer);
                clearInterval(oBu3.timer);

                oBu1.style.display='none';
                oBu1.style.left=oPlayer.offsetLeft+zdLeft+'px';
                oBu1.style.top=oPlayer.offsetTop-20+'px';
                startFire();
                setTimeout(function () {
                    oBu2.style.display='none';
                    oBu2.style.left=oPlayer.offsetLeft+zdLeft+'px';
                    oBu2.style.top=oPlayer.offsetTop-20+'px';
                    startFire1();
                },50);
                setTimeout(function () {
                    oBu3.style.display='none';
                    oBu3.style.left=oPlayer.offsetLeft+zdLeft+'px';
                    oBu3.style.top=oPlayer.offsetTop-20+'px';
                    startFire2();
                },100);

                setTimeout(function () {
                    tim=0;
                },800)
            }
            if(left&&oPlayer.offsetLeft>=5&&move)
            {
                oPlayer.style.left=oPlayer.offsetLeft-2+'px';
            }
            if(right&&oPlayer.offsetLeft<=515&&move)
            {
                oPlayer.style.left=oPlayer.offsetLeft+2+'px';
            }
            if(up&&oPlayer.offsetTop>=5&&move)
            {
                oPlayer.style.top=oPlayer.offsetTop-2+'px';
            }
            if(down&&oPlayer.offsetTop<=735&&move)
            {
                oPlayer.style.top=oPlayer.offsetTop+2+'px';
            }
        },3);




        function startFire() {
            oBu1.style.display='block';
            oBu1.timer=setInterval(function () {
                if(oBu1.offsetTop<-100)
                {
                    clearInterval(oBu1.timer);
                }
                else
                {
                    oBu1.style.top=oBu1.offsetTop-7+'px';
                }
            },5);
        }

        function startFire1() {
            oBu2.style.display='block';
            oBu2.timer=setInterval(function () {
                if(oBu2.offsetTop<-100)
                {
                    clearInterval(oBu2.timer);
                }
                else
                {
                    oBu2.style.top=oBu2.offsetTop-7+'px';
                }
            },5);
        }

        function startFire2() {
            oBu3.style.display='block';
            oBu3.timer=setInterval(function () {
                if(oBu3.offsetTop<-100)
                {
                    clearInterval(oBu3.timer);
                }
                else
                {
                    oBu3.style.top=oBu3.offsetTop-7+'px';
                }
            },5);
        }


        //键位设定，解决停顿问题
        document.onkeydown=function (ev) {
            var oEvent=ev||event;

            switch (oEvent.keyCode)
            {
                case 65:left = true;
                    break;
                case 87:up = true;
                    break;
                case 68:right = true;
                    break;
                case 83:down = true;
                    break;
                case 85:shut =true;
                    break;
            }
            document.onkeyup=function (ev) {
                var oEvent=ev||event;
                switch (oEvent.keyCode)
                {
                    case 65:left = false;
                        break;
                    case 87:up = false;
                        break;
                    case 68:right = false;
                        break;
                    case 83:down = false;
                        break;
                    case 85:shut = false;
                        break;
                }
            }
        }



        //键盘控制飞行方向及开火结束
//障碍物移动开始
        function storeMove() {
            for(var i=0;i<aRock.length;i++)
            {
                aRock[i].style.left=parseInt(530*Math.random())+'px';
                aRock[i].style.top=parseInt(-500*Math.random()-70)+'px';
                aRock[i].hp=parseInt(1);
            }
            for(var i=0;i<aPlane.length;i++)
            {
                aPlane[i].style.left=parseInt(530*Math.random())+'px';
                aPlane[i].style.top=parseInt(-500*Math.random()-70)+'px';
                aPlane[i].hp=parseInt(1);
            }
        }
        setInterval(function () {
            for(var i=0;i<aRock.length;i++)
            {
                aRock[i].style.top=aRock[i].offsetTop+1+'px';
                if(aRock[i].offsetTop>800)
                {
                    aRock[i].style.left=parseInt(530*Math.random())+'px';
                    aRock[i].style.top=parseInt(-800*Math.random()-70)+'px';
                    aRock[i].hp=parseInt(60);
                }
                if(aRock[i].hp<0)
                {
                    //石头死亡
                    aRock[i].style.top=900+'px';
                    score+=10;
                    inc();
                }
            }
            for(var i=0;i<aPlane.length;i++)
            {
                aPlane[i].style.top=aPlane[i].offsetTop+3+'px';
                if(aPlane[i].offsetTop>800)
                {
                    aPlane[i].style.left=parseInt(530*Math.random())+'px';
                    aPlane[i].style.top=parseInt(-800*Math.random()-70)+'px';
                    aPlane[i].hp=parseInt(30);
                }
                var dla=parseInt(10*Math.random());
                if(aPlane[i].hp<0)
                {
                    //敌机死亡
                    aPlane[i].style.top=900+'px';
                    score+=5;
                    inc();
                //    敌机死亡掉落
                    if(dla==1&&tim1==0)
                    {
                        dl();
                    }
                }
            }
        },25);
        function inc() {
            oScore1.src='images/'+Math.floor(score/1000)+'.png';
            oScore2.src='images/'+Math.floor(score%1000/100)+'.png';
            oScore3.src='images/'+Math.floor(score%100/10)+'.png';
            oScore4.src='images/'+score%10+'.png';
        }

        //敌机死亡掉落触发函数
        function dl () {
            tim1=1;
            oStrong.style.top=oStrongy+'px';
            oStrong.style.left=oStrongx+'px';
            oStrong.style.display='block';
            var speedl=5;
            var speedt=5;
            oStrong.timer=setInterval(function () {
                if(oStrong.offsetLeft<10)
                {
                    speedl=5;
                }
                if(oStrong.offsetLeft>560)
                {
                    speedl=-5;
                }
                if(oStrong.offsetTop<10)
                {
                    speedt=5;
                }
                if(oStrong.offsetTop>600)
                {
                    speedt=-5;
                }
                oStrong.style.left=oStrong.offsetLeft+speedl+'px';
                oStrong.style.top=oStrong.offsetTop+speedt+'px';

            },30);
            setTimeout(function () {
                tim1=0;
                oStrong.style.top='-100px';
                oStrong.style.left='-100px';
                clearInterval(oStrong.timer);
            },5000);
        }



        setInterval(function () {
            for(var i=0;i<aPlaneZd.length;i++)
            {
                var j=Math.floor(i/3);

                if(aPlane[j].offsetTop<204&&aPlane[j].offsetTop>200)
                {
                    aPlaneZd[i].style.top=aPlane[j].offsetTop+100+'px';
                    aPlaneZd[i].style.left=aPlane[j].offsetLeft+50+'px';
                }
                switch (i%3)
                {
                    case 0:fx=0;
                        break;
                    case 1:fx=3;
                        break;
                    case 2:fx=-3;
                        break;
                }
                aPlaneZd[i].style.top=aPlaneZd[i].offsetTop+8+'px';
                aPlaneZd[i].style.left=aPlaneZd[i].offsetLeft+fx+'px';
            }
        },25);
//障碍物移动结束

//碰撞开始
//        玩家与石头碰撞
        setInterval(function () {
            for(var i=0;i<aRock.length;i++)
            {
                if(impact(oPlayer,aRock[i])==1)
                {
                    boom1();
                }
            }
            //玩家与敌机子弹碰撞
            for(var i=0;i<aPlaneZd.length;i++)
            {
                if(impact(oPlayer,aPlaneZd[i])==1)
                {
                    boom1();
                }
            }
            //玩家与敌机碰撞
            for(var i=0;i<aPlane.length;i++)
            {
                if(impact(oPlayer,aPlane[i])==1)
                {
                    boom1();
                }
            }
            //子弹与石头碰撞
            for(var i=0;i<aRock.length;i++)
            {
                if(impact(oBu1,aRock[i])==1)
                {
                    boom2(aRock[i],oBu1);
                }
            }
            for(var i=0;i<aRock.length;i++)
            {
                if(impact(oBu2,aRock[i])==1)
                {
                    boom2(aRock[i],oBu2);
                }
            }
            for(var i=0;i<aRock.length;i++)
            {
                if(impact(oBu3,aRock[i])==1)
                {
                    boom2(aRock[i],oBu3);
                }
            }
            //子弹与敌机碰撞
            for(var i=0;i<aPlane.length;i++)
            {
                if(impact(oBu1,aPlane[i])==1)
                {
                    boom2(aPlane[i],oBu1)
                }
            }
            for(var i=0;i<aPlane.length;i++)
            {
                if(impact(oBu2,aPlane[i])==1)
                {
                    boom2(aPlane[i],oBu2)
                }
            }
            for(var i=0;i<aPlane.length;i++)
            {
                if(impact(oBu3,aPlane[i])==1)
                {
                    boom2(aPlane[i],oBu3)
                }
            }
            if(impact(oPlayer,oStrong))
            {
                oStrong.style.display='none';
                var sjBuff=parseInt(10*Math.random());
                if(sjBuff>3)
                {
                    buff1();
                }
                else
                {
                    buff2();
                }

            }
        },30);

        //生命增加
        function buff2() {
            if(life<99)
            {
                life+=1;
                oLife1.src='images/'+Math.floor(life/10)+'.png';
                oLife2.src='images/'+Math.floor(life%10)+'.png';
                tsMove(oTs3);
            }
        }

        //威力增加
        function buff1() {
            if(wl==3)
            {
                tsMove(oTs2);
            }
            if(wl==2)
            {
                wl=3;
                zdLeft=14;
                oBu1.style.width=51+'px';
                oBu2.style.width=51+'px';
                oBu3.style.width=51+'px';
                tsMove(oTs1);
            }
            if(wl==1)
            {
                wl=2;
                zdLeft=23;
                oBu1.style.width=34+'px';
                oBu2.style.width=34+'px';
                oBu3.style.width=34+'px';
                tsMove(oTs1);
            }
        }

        function tsMove(obj) {
            clearInterval(obj.timer);

            obj.style.display='block';
            obj.style.top='-20px';
            var tsOp=1;
            obj.timer=setInterval(function () {
                obj.style.top=obj.offsetTop-3+'px';
                tsOp-=0.05;
                obj.style.opacity=tsOp;
            },30);
            setTimeout(function () {
                clearInterval(obj.timer);
            },1500);
        }



        function impact(obj1,obj2) {
            var l1=obj1.offsetLeft;
            var r1=l1+obj1.offsetWidth;
            var t1=obj1.offsetTop;
            var b1=t1+obj1.offsetHeight;

            var l2=obj2.offsetLeft;
            var r2=l2+obj2.offsetWidth;
            var t2=obj2.offsetTop;
            var b2=t2+obj2.offsetHeight;


            if(r1<l2||b1<t2||l1>r2||t1>b2||wd)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }

        function fWd() {
            var i=0;
            wd=true;
            var timer=setInterval(function () {
                oPlayer.style.opacity=i++%2?"1":"0.1";
            },30);
            setTimeout(function () {
                clearInterval(timer);
                oPlayer.style.opacity='1';
                wd=false;
            },3000);
        }

        function boom1() {
            oPlayer2.style.left=oPlayer.offsetLeft+19+'px';
            oPlayer2.style.top=oPlayer.offsetTop+'px';
            fWd();
            move=false;
            wl=1;
            oBu1.style.width='17px';
            oBu2.style.width='17px';
            oBu3.style.width='17px';
            zdLeft=31;
            oPlayer.style.left='250px';
            oPlayer.style.top='1400px';
            var timer=setInterval(function () {
                oPlayer.style.top=oPlayer.offsetTop-5+'px';
            },10);
            setTimeout(function () {
                clearInterval(timer);
                move=true;
            },1500);
            setTimeout(function () {
                oPlayer2.style.background='url(images/boom2.png) -42px 0px no-repeat'
            },50);
            setTimeout(function () {
                oPlayer2.style.background='url(images/boom2.png) -84px 0px no-repeat'
            },100);
            setTimeout(function () {
                oPlayer2.style.background='url(images/boom2.png) -126px 0px no-repeat'
            },150);
            setTimeout(function () {
                oPlayer2.style.background='url(images/boom2.png) -168px 0px no-repeat'
            },200);
            setTimeout(function () {
                dead();
                oPlayer2.style.top='-100px';
                oPlayer2.style.left='-100px';
                oPlayer2.style.background='url(images/boom2.png) 0px 0px no-repeat';
            },300);
        }

        function boom2(obj3,obj4) {
            oPlayer3.style.left=obj3.offsetLeft+20+'px';
            oPlayer3.style.top=obj3.offsetTop+20+'px';
            oStrongx=obj3.offsetLeft;
            oStrongy=obj3.offsetTop;
            obj4.style.display='none';
            switch (wl)
            {
                case 1:obj3.hp-=10;
                break;
                case 2:obj3.hp-=15;
                break;
                case 3:obj3.hp-=20;
                break;
            }
            setTimeout(function () {
                oPlayer3.style.background='url(images/boom2.png) -42px 0px no-repeat'
            },50);
            setTimeout(function () {
                oPlayer3.style.background='url(images/boom2.png) -84px 0px no-repeat'
            },100);
            setTimeout(function () {
                oPlayer3.style.background='url(images/boom2.png) -126px 0px no-repeat'
            },150);
            setTimeout(function () {
                oPlayer3.style.background='url(images/boom2.png) -168px 0px no-repeat'
            },200);
            setTimeout(function () {
                oPlayer3.style.top='-100px';
                oPlayer3.style.left='-100px';
                oPlayer3.style.background='url(images/boom2.png) 0px 0px no-repeat';
            },300);
        }

        function dead() {
            if(life==0){
                gameover();
            }
            else
            {
                life-=1;
                oLife1.src='images/'+Math.floor(life/10)+'.png';
                oLife2.src='images/'+Math.floor(life%10)+'.png';
            }
        }
        function gameover() {
            document.getElementById('go').style.display='block';
            oRrestart.onclick=function () {
                location.reload(false);
            }

        }

//碰撞结束
    };
}












