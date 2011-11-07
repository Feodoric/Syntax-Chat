<?php

$m = new Mongo();
$db = $m->chatServer;
$collection = $db->chats;

$chatId = $_POST['chatId'];
$ts = new MongoDate(strtotime($_POST['lastReceive']));

$res = $collection->find(array(
	'_id' => $chatId, 
	'message.timestamp' => array('$gt' => $ts),
	'message.username' => array('$not' => $_POST['username'])
));

$return = array(
	'timestamp' => date('Y-m-d h:i:s'),
	'messages' => $res
);

echo json_encode($return);

/* if (rand(0,2) > 1){ */
/* 	echo json_encode(array( */
/* 		'text' => 'This is a normal text message that is being displayed in the chat window', */
/* 		'isCode' => false, */
/* 		'username' => 'Server Guy' */
/* 	)); */
/* } else { */
/* 	echo json_encode(array( */
/* 		'text'=> "function initRequest(){ */
/*         sender = new Request.JSON({ */
/*             url: 'chat.php', */
/*             onSuccess: function(r) { */
/*                 appendMessage(r.text, r.isCode); */
/*             } */
/*         });", */
/* 		'isCode' => true, */
/* 		'username' => 'Server Guy' */
/* 	)); */
/* } */
