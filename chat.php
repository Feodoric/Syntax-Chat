<?php

$m = new Mongo();
$db = $m->chatServer;
$collection = $db->chats;
$ts = new MongoDate();

$insert = array(
	'text' => $_POST['text'],
	'isCode' => $_POST['isCode'],
	'timestamp' => $ts
);

$collection->insert($insert);

echo json_encode(array(
	'text' => $_POST['text'],
	'isCode' => $_POST['isCode'],
	'timestamp' => date('h:i:s', $ts->sec)
));