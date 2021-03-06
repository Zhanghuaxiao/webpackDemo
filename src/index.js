import header from './header';
import main from './main';
import footer from './footer';
import createIma from './creatImg';
import count from './count';
import number from './number';
import './babelBundle';
import './usefont';
import './creatButton';
import avatar from './static/images/scenery.jpg';
import style from './static/css/index.less';

var img = new Image();
img.src = avatar;
img.classList.add(style.avater); // 配置modules:true 变成模块不影响其他样式
var app = document.getElementById('app');
app.append(img)

header();
main();
footer();
createIma();
count();
number();

if (module.hot) {
    module.hot.accept('./number', function () {
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
}