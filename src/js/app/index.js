import '../../asset/iconfont/iconfont'
import '../../asset/flexible/flexible'
import Header from '../module/header'
import '../../css/app/index.scss'
// window.onload = function(){
//   document.querySelector('.main').innerHTML += Header.html+'test watch start'
// }
if (module.hot) {
  module.hot.accept('../module/header', function(){
    console.log('accept the update library module test this')
    Header.log()
  })
}
