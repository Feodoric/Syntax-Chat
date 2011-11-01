$(document).addEvent('domready', function(){
    Chattr.init();
});

var Chattr = (function(){
    var username = 'Test Guy',
        highlighting = (hljs ? true : false),
        preamble;

    function sendMessage(text, isCode) {
        var insert = new Element('div', {
            'class': 'mymsg'
        });
        
        if (isCode){
            insert.grab(wrapPre(text));
        } else {
            insert.set('html', text);
        }

        insert.grab(preamble.clone(), 'top');
        $('conversation').grab(insert, 'bottom');
    };

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

    function buildPreamble() {
        preamble = new Element('span', {
            html: username + ': ',
            'class': 'myname'
        });
    };
    
    return {
        init: function() {
            setupEvents();
            buildPreamble();
        }
    };
    
}());

