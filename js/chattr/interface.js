$(document).addEvent('domready', function(){
    Interface.init();
});

var Interface = (function(){

    function AutosizeTextarea(container){
        var area = container.getElement('textarea');
        var span = container.getElement('span');

        area.addEvent('input', function() {
            span.textContent = area.value;
            $$('#conversation, #people').setStyle(
                'margin-bottom', 
                $('chat').getSize().y
            );
        });
        container.addClass('active');
    }

    return {
        init: function() {
            AutosizeTextarea($(document.body).getElement('.auto-size'));
        }
    };
    
}());

