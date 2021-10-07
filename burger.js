
document.querySelector('.burger').onclick = function(){
    document.querySelectorAll('.burger-icon, .header__menu2').forEach(elem => elem.classList.toggle('active'));
    document.querySelector('body').classList.toggle('lock');
}
