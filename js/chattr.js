$(document).addEvent('domready', function(){
    Chattr.init();
});

var Chattr = (function(){
    var myname = 'Test Guy',
        highlighting = (hljs ? true : false),
        sender,
        receiver,
        chatId,
        lastReceive = new Date();

    function initRequest(){
        sender = new Request.JSON({
            url: 'chat.php',
            onSuccess: function(r) {
                chatId = r.chatId;
                appendMessage(r.text, r.isCode, r.timestamp);
            }
        });
    }

    function initPoller(){
        receiver = new Request.JSON({
            url: 'msgPoll.php',
            onSuccess: function(r) {
                lastReceive = r.timestamp;
                appendMessage(r.text, r.isCode, r.timestamp, r.username);
                setTimeout(msgPoll, 5000);
            },
            method: 'get'
        });
        msgPoll();
    }

    function msgPoll(){
        var get = 'chatId=' + encodeURIComponent(chatId)
                + '&lastReceive=' +  encodeURIComponent(lastReceive);
        
        if (chatId){
            receiver.send(get);
        }
    }
    
    function sendMessage(text, isCode) {
        var post = 'text=' + encodeURIComponent(text)
                 + '&isCode=' + encodeURIComponent(isCode)
                 + '&chatId=' + encodeURIComponent(chatId)
                 + '&username=' + encodeURIComponent(myname);
        sender.send(post);
    };

    function appendMessage(text, isCode, timestamp, username){
        var insert = new Element('div', {
            'class': 'mymsg'
        });
        
        if (isCode){
            insert.grab(wrapPre(text));
        } else {
            insert.set('html', text);
        }

        insert.grab(buildPreamble(username, timestamp), 'top');
        $('conversation').grab(insert, 'bottom');
    }
    
    function wrapPre(text){
        var code = new Element('code', {
            'html': hljs.highlightAuto(text).value
        }),
            pre = new Element('pre');

        return pre.grab(code);
    };
    
    function setupEvents(){
        $('chat').addEvent('click', function(e){
            var msg = $('msg').get('value'),
                target = e.target,
                isCode = (target.get('id') === 'sendcode' ? true : false);

            if (target.get('type') !== 'button'){
                return;
            }
            
            sendMessage(msg, isCode);
        });
    }; 

    function buildPreamble(username, timestamp) {
        return new Element('span', {
            html: (username ? username : myname) + ' <' + timestamp + '> : ',
            'class': 'myname'
        });
    };

    
    return {
        init: function() {
            setupEvents();
            initRequest();
            initPoller();
        }
    };
    
}());

