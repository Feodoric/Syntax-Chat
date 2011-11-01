<?php

$m = new Mongo();
$db = $m->chatServer;
$collection = $db->chats;



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
