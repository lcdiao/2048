function getPosTop(i,j){
	return 20+i*120;
}

function getPosLeft(i,j){
	return 20+j*120;
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 4096:return "#a6c";break;
		case 9192:return "#93c";break;
	}

	return "black";
}

function getNumberColor(number){
	if(number<=4)
		return "#776e65";

	return "white";
}

//判断棋盘格是否还有空间
function nospace(board){
	for (var i = 0; i < 4; i++) 
		for(var j=0;j<4;j++)
			if(board[i][j]==0)
				return false;
	return true;
}

//判断是否移动到左侧
function canMoveLeft(board){

	for (var i = 0; i < 4; i++) 
		for(var j=1;j<4;j++)	//第0列不需要遍历
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return true;

	return false;
}
//判断是否移动到右侧
function canMoveRight(board){

	for (var i = 0; i < 4; i++) 
		for(var j=2;j>=0;j--)	//第3列不需要遍历
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;

	return false;
}
//判断是否移动到上侧
function canMoveUp(board){
	for(var j=0;j<4;j++)
		for (var i=1;i<4;i++) 	//第0行不需要遍历
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
					return true;

	return false;
}
//判断是否移动到下侧
function canMoveDown(board){
	for(var j=0;j<4;j++)
		for (var i=2;i>=0;i--) 	//第3行不需要遍历
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
					return true;

	return false;
}

function noBlockHorizontal(row,col1,col2,board){//判断第col1列到col2列之间是否有障碍物
	for(var i=col1+1;i<col2;i++)
		if(board[row][i]!=0)
			return false;
	return true;
}

function noBlockVertical(row1,row2,col,board){//判断第row1行到row2行之间是否有障碍物
	for(var i=row1+1;i<row2;i++)
		if(board[i][col]!=0)
			return false;
	return true;
}

function nomove(board){
	if(canMoveDown(board)||canMoveUp(board)||canMoveRight(board)||canMoveLeft(board)){
		return false;
	}
	return true;
}