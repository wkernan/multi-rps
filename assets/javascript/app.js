var fireBase = new Firebase('https://prs-project.firebaseio.com/');
var nameButton = $('#playerSubmit');
var username = $('#player');
var text = $('#playerText');
var postButton = $('#post');
var playerOne = "";
var playerTwo = "";
var playerCount = 0;

nameButton.on('click', function() {
	if(playerCount != 0) {
		playerCount = 2;
		console.log(playerCount);
		fireBase.child('players').child('count').update({playerNum: 2});
		fireBase.child('players').child(playerCount).set({name:username.val(), choice: "", losses: 0, wins: 0});
		fireBase.child('players').child('count').set({playerNum: playerCount});
		$('#choices2').removeClass('hide');
	} else {
		playerCount++;
		console.log(playerCount);
		fireBase.child('players').child(playerCount).set({name:username.val(), choice: "", losses: 0, wins: 0});
		fireBase.child('players').child('count').set({playerNum: playerCount});
		$('#choices1').removeClass('hide');
	}
	$('#playerForm').hide();
	//$('#player' + playerCount).html('<h3>' + username.val() + '</h3>');
	return false;
})

$('.choice1').on('click', function() {
	$('#choices1').addClass('hide');
	$(this).detach().appendTo('#choiceOne');
	$('#choiceOne').removeClass('hide');
	var pick = $(this).attr('id');
	console.log(pick);
	console.log(fireBase.child('players').child(1).update({choice: pick}));
})

$('.choice2').on('click', function() {
	$('#choices2').addClass('hide');
	$(this).detach().appendTo('#choiceTwo');
	$('#choiceTwo').removeClass('hide');
	var pick = $(this).attr('id');
	console.log(pick);
	console.log(fireBase.child('players').child(2).update({choice: pick}));
})

fireBase.on('value', function(snap) {
	playerCount = snap.val().players.count.playerNum;
	$('#player' + playerCount).html('<h3>' + snap.val().players[playerCount].name + '</h3>');
	console.log(snap.val().players.count.playerNum);
	console.log(playerCount);
})

postButton.on('click', function() {
	console.log('worked');
	var msgUser = username.val();
	var msgText = text.val();
	fireBase.child('chat').push({username:msgUser, text:msgText});
	text.val('');
	return false;
});

var fireBaseChat = new Firebase('https://prs-project.firebaseio.com/chat');

fireBaseChat.on('child_added', function(snap) {
	var msg = snap.val();
	var p = $('<p>').html("<b>" + msg.username + ": </b>" + msg.text);
	$('#textArea').append(p);
})

fireBase.child('chat').onDisconnect().remove();

//fireBase.child('players').child(1).onDisconnect().remove();
//fireBase.child('players').child(2).onDisconnect().remove();
fireBase.child('players').onDisconnect().remove();




