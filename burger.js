
document.querySelector('.burger').onclick = function(){
    document.querySelectorAll('.burger-icon, .header__menu2').forEach(elem => elem.classList.toggle('active'));
    document.querySelector('body').classList.toggle('lock');
    // for (var elem of menu){elem.classList.toggle('active');
}
// document.querySelector('.burger').onclick = function(){
//     document.querySelector('.burger-icon').classList.toggle('active');
// }
// $(document).ready(function() {
// 	$('.burger').click(function(event){
// 		$('.burger,.header__menu').toggleClass('active');
// 	});
// });