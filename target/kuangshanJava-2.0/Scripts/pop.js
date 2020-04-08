//Boxy插件的扩展方法
jQuery.fn.qbox = function (options) {
    var node = this.get(0).nodeName.toLowerCase();
    var self = this;
    if (node == 'a') {
        $(this).attr('onclick', '').unbind('click').click(function () { return false; });
        options = $.extend({ src: this.get(0).getAttribute('href'), beforeUnload: function () { $(self).unbind('click').click(function () { return $(this).qbox(options); }); } }, options || {});
    }
    qBox.iFLoad(options);
    return false;
}
var qBox = function () { };
jQuery.extend(qBox, {
    aDgs: [],
    iFrame: function (op) {
        op = jQuery.extend({ title: '提示11', w: 320, h: 200, src: 'about:blank', modal: false, fixed: false, unloadOnHide: true }, op), fm = parseInt(Math.random() * (1000 * 987)); //
        var dialog = new Boxy("<b id=\"ld" + fm + "\">正在加载，请稍后....</b><iframe id=\"_" + fm + "\" style=\"width:0px;height:0px;display:none;padding:0;\" src=" + op.src + " frameborder=\"0\" scrolling=\"yes\"></iframe>", op);

        jQuery("#_" + fm).load(function () {
            dialog.resize(op.w, op.h, function () { });
            jQuery("#ld" + fm).remove();
            jQuery("#_" + fm).css({ 'padding': '', 'display': '' });
        });
        qBox.aDgs.push(dialog);
        return false;
    },
    Close: function () {
        qBox.aDgs[qBox.aDgs.length - 1].hide();
        window.location.href = location.href;
        return false
    },
    Close2: function () {
        qBox.aDgs[qBox.aDgs.length - 1].hide();
        return false
    },
    iFSrc: function (op) {
        op = jQuery.extend({ w: 320, h: 200, src: 'about:blank' }, op);
        var B = qBox.aDgs[qBox.aDgs.length - 1];
        B.setTitle(op.title);
        B.getContent().attr({ 'src': op.src });
        B.tween(op.w, op.h, function () {
            B.getContent().css({ 'width': op.w + 'px', 'height': op.h + 'px' });
        });
        return false;
    },
    iFLoad: function (options) {
        var sr = jQuery(this).attr("href");
        var op = jQuery.extend({ src: sr }, options);
        qBox.iFrame(op);
        return false;
    }
});
 