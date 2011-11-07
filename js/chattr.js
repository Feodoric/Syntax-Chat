$(document).addEvent('domready', function(){
    Chattr.init();
});

var Chattr = (function(){
    var myname = 'anon',
        highlighting = (hljs ? true : false),
        sender,
        receiver,
        chatId,
        lastReceive = new Date(),
        nameEl;

    function addToRoom(name, self){
        nameEl = new Element('div', {
            'html': name,
            'class': (self ? 'me' : 'them')
        }).inject($('people'));
    }

    function initId(){
        var req = new URI(window.location.href),
            incomingId = req.get('data').chatid;
        
        if (incomingId){
            chatId = incomingId;
        } else {
            new Request.JSON({
                url: 'server/idgen.php',
                async: 'false',
                onSuccess: function(r){
                    chatId = r.chatId;
                    systemMessage('Your chat id is ' + chatId);
                }
            }).send();
        }
    }
    
    function systemMessage(text){
        var insert = new Element('div', {
            'class': 'system'
        });

        insert.set('html', '****** ' + text + ' ******');
        appendMessage(insert);
    }
    
    function initRequest(){
        sender = new Request.JSON({
            url: 'server/chat.php',
            onSuccess: function(r) {
                var msg;
                chatId = r.chatId;
                msg = buildMessage(r.text, r.isCode, r.timestamp);
                appendMessage(msg);
            }
        });
    }

    function initPoller(){
        receiver = new Request.JSON({
            url: 'server/msgPoll.php',
            onSuccess: function(r) {
                lastReceive = r.timestamp;
                for (m in r.messages){
                    var msg;
                    msg = buildMessage(m.text, m.isCode, m.timestamp, m.username);
                    appendMessage(msg);
                }

                setTimeout(msgPoll, 5000);
            },
            method: 'get'
        });
        msgPoll();
    }

    function msgPoll(){
        var get = 'chatId=' + encodeURIComponent(chatId)
                + '&lastReceive=' +  encodeURIComponent(lastReceive)
                + '&username=' + encodeURIComponent(myname);
        
        if (chatId){
            receiver.send(get);
        } else {
            setTimeout(msgPoll, 5000);
        }
    }
    
    function sendMessage(text, isCode) {
        var post = 'text=' + encodeURIComponent(text)
                 + '&isCode=' + encodeURIComponent(isCode)
                 + '&chatId=' + encodeURIComponent(chatId)
                 + '&username=' + encodeURIComponent(myname);
        sender.send(post);
    };

    function resetTextArea(){
        $('chat').getElement('textarea').set('value', '');
        $('chat').getElement('span').textContent = '';
        // TODO: extract this so it is easily accessible to both Chattr and
        // Interface
        $$('#conversation, #people').setStyle(
            'margin-bottom', 
            $('chat').getSize().y
        );
    }

    function buildMessage(text, isCode, timestamp, username){
        var insert = new Element('div', {
            'class': 'mymsg'
        });
        
        if (isCode){
            insert.grab(wrapPre(text));
        } else {
            insert.set('html', text);
        }

        insert.grab(buildPreamble(username, timestamp), 'top');
        return insert;

    }

    function appendMessage(msg){
        $('conversation').grab(msg, 'bottom');        
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
            resetTextArea();
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
            addToRoom(myname, true);
            initId();
        }
    };
    
}());

