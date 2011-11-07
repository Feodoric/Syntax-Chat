<?php

require_once('ChatId.php');
echo json_encode(array(
	'chatId' => ChatId::getId()
));