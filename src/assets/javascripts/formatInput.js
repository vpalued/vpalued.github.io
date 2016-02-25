;(function(vera){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    vera.clearSpace = clearSpace;
    vera.formatInput = formatInput;

     //清除字符串内部的空格
    function clearSpace(str){
        var result = [], len = str.length;
        for(var i = 0; i < len; i++){
            if (str[i] == ' ') {
                continue;
            }
            result.push(str[i]);
        }
        return result.join('');
    }
    
    /**
    用户输入内容格式化
    参数:  str    String  用户输入内容
    格式:  stpe   String  格式化方式,'card_split'(default) 'mobile_split' idcard_split'
    */
    function formatInput (str, type) {
        type = type || 'card_split';
        var seg = [4,4,4,4,4,4];
        var maxlen = 50;
        switch(type){
            case 'card_split':
                seg = [4,4,4,4,4];
                maxlen = 19;
                break;
            case 'mobile_split':
                seg = [3,4,4];
                maxlen = 11;
                break;
            case 'idcard_split':
                seg = [6,8,4];
                maxlen = 18;
                break;
            default :
                break;
        }

        str = clearSpace(str).substr(0, maxlen);
        var start = 0;
        var result = [];
        for(var j = 0; j < seg.length; j++){
            var count = seg[j];
            var tmpstr = str.substr(start, count);
            if(tmpstr.length <= 0){
                break;
            }

            start = start + count;

            result.push(tmpstr);

            if(j == seg.length - 1){
                tmpstr = str.substr(start);
                if(tmpstr.length > 0){
                    result.push(tmpstr);
                }
            }

        }

        return result.join(' ');
    }
    
    
})(vera);

