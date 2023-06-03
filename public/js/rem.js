// // 适配文件
// function remSize() {
//     // 获取设备宽度
//     var deviceWidth = document.documentElement.clientWidth || window.innerWidth
//     if (deviceWidth >= 750) {
//         deviceWidth = 750
//     }
//     if (deviceWidth <= 320) {
//         deviceWidth = 320
//     }
//     // 750px ---> 1rem = 75px
//     // 375px ---> 1rem = 37.5px 
//     document.documentElement.style.fontSize = (deviceWidth / 10) + 'px'
//     document.querySelector('body').style.fontSize = .426667 + 'rem'
// }
// remSize()
// window.onresize = function() {
//     remSize()
// }