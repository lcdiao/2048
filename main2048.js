var board = new Array();// 小格子！
var score = 0;	
var hasConflicted = new Array();	

//触控 坐标
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function() {
	prepareForMobile();
	newgame();
});

function prepareForMobile(){

	if(documentWidth>500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength=100;
	}

	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生产数字
	generateOneNumber();
	generateOneNumber();
}

//初始化棋盘格
function init(){
	for(var i=0;i<4;i++)
		for (var j = 0; j < 4; j++) {
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}


	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++)
			board[i][j]=0;
			hasConflicted[i][j]=false;
	}

	updateBoardView();
	
	score = 0;
}


function updateBoardView(){
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);

			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
		
	}
	$('.number-cell').css('line-height',cellSideLength+'px');
	$('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
	if(nospace(board))
		return false;//无法生成格子

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random()*4));	//x坐标:取得随机数并向下取整 再强转为整型
	var randy = parseInt(Math.floor(Math.random()*4));	//y坐标:取得随机数并向下取整 再强转为整型
	
	var times = 0;
	while(times<50){	//取到可用坐标
		if(board[randx][randy]==0)
			break;
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;	//获得2或4

	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);//生成随机数动画

	return true;
}


$(document).keydown(function (event){

	//event.preventDefault();//阻挡原本的默认效果(有滚动条的情况下，按下键的时候滚动条不会滚动)
	//所有按键的效果都会被屏蔽

	switch(event.keyCode){
		case 37: 		//left
			event.preventDefault();	//判断出按下的键后再阻挡按键的默认效果
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
			break;
		case 38: 		//up
			event.preventDefault();
			if(moveUp()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
			break;
		case 39: 		//right
			event.preventDefault();
			if(moveRight()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
			break;
		case 40: 		//down
			event.preventDefault();
			if(moveDown()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
			break;
		default:
			break;
	}
})


//触控事件
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;	//获得触摸起始位置的横纵坐标
	starty = event.touches[0].pageY;
})

document.addEventListener('touchmove',function(){
	event.preventDefault();
})

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;	//获得触摸结束位置的横纵坐标
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax)<0.2*documentWidth&&Math.abs(deltay)<0.2*documentWidth)
		return ;

	//在x轴方向进行滑动
	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			//move right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
		}
		else{
			//move left
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
		}
	}
	//在y轴方向进行滑动
	else{
		if(deltay>0){
			//move down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
		}
		else{
			//move up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);//添加一个随机数
				setTimeout("isgameover()",300);//判断是否结束
			};
		}
	}
})



function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}
function gameover(){
	alert('gameover');
}

function moveLeft(){

	if(!canMoveLeft(board))
		return false;

	//moveLeft
	for (var i = 0; i < 4; i++) 
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);//从i,j位置移动到i,k位置(动画效果)
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];//相加
						board[i][j]=0;

						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;

						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()",200);//刷新格子
	return true;
}

function moveRight(){

	if(!canMoveRight(board))
		return false;

	//moveRight
	for (var i = 0; i < 4; i++) 
		for(var j=2;j>=0;j--){		//第3列不需要遍历
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);//从i,j位置移动到i,k位置(动画效果)
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];//相加
						board[i][j]=0;

						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;

						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()",200);//刷新格子
	return true;
}

function moveUp(){

	if(!canMoveUp(board)){
		return false;
	}

	//moveUp
	
	for(var j=0;j<4;j++){
		for (var i=1;i<4;i++) 	//第0行不需要遍历
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(k,i,j,board)){
						//move
						showMoveAnimation(i,j,k,j);//从i,j位置移动到k,j位置(动画效果)
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(k,i,j,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];//相加
						board[i][j]=0;

						//add score
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;

						continue;
					}
				}
			}
	}

	setTimeout("updateBoardView()",200);//刷新格子
	return true;
}

function moveDown(){

	if(!canMoveDown(board)){
		return false;
	}

	//moveUp
	for(var j=0;j<4;j++){
		for (var i=2;i>=0;i--) 	//第3行不需要遍历
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(i,k,j,board)){
						//move
						showMoveAnimation(i,j,k,j);//从i,j位置移动到k,j位置(动画效果)
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(i,k,j,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];//相加
						board[i][j]=0;

						//add score
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;

						continue;
					}
				}
			}
	}

	setTimeout("updateBoardView()",200);//刷新格子
	return true;
}