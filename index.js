var imgInfoList = [];

loadImgs();

$$('.checkbox').forEach(function(item) {
    item.addEventListener('change', function(e) {
        var index = this.parentElement.parentElement.dataset.index;
        var checked = this.checked;

        this.nextElementSibling.disabled = !checked;
        imgInfoList[index].checked = checked;
    })
});

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
    
// 点击事件
$("#generate").addEventListener("click", function() {
    var lastHeight = 0;

    for (var i = 0, len = imgInfoList.length; i < len; i++) {
        var item = imgInfoList[i];

        if (item.checked) {

            if (!item.loaded) {
                alert('图片加载失败，请检查网络状况并刷新重试');
            }

            var img = item.img;
            img.width = canvas.width;

            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.height = lastHeight + img.height;

            ctx.putImageData(imgData, 0, 0);

            // 添加图片
            ctx.drawImage(img, 0, lastHeight, img.width, img.height);
            
            // 添加文字
            var text = $$('.item .text')[i].value;

            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 1;
            ctx.shadowColor = '#000';
            ctx.font = '20px 微软雅黑';
            ctx.fillStyle = "#fff";
            ctx.fillText(text, 100, 360 + lastHeight);

            lastHeight = canvas.height;
        }
    }
        
    var newImg = new Image();
    newImg.src = canvas.toDataURL('image/png');
    $('#show').innerHTML = '';
    $('#show').appendChild(newImg);
});



function loadImgs() {
    for (var i = 0; i < 4; i++) {
        imgInfoList.push({
            img: loadImg(i),
            loaded: false,
            checked: true
        });
    }

    function loadImg(index) {
        var img = new Image();  

        img.onload = function() {
            imgInfoList[index].loaded = true;
        };
        img.onerror = function(){
            console.warm('图片:' + this.src + ' 加载失败')
        };
        img.src = './img/ps_' + index + '.jpg';

        return img;
    }
}

function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
}
