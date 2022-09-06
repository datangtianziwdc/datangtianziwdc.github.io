const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = e => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about" ?
  card.classList.add("is-active") :
  card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach(s => s.classList.remove("is-active"));
  buttons.forEach(b => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach(btn => {
  btn.addEventListener("click", handleButtonClick);
});
window.onscroll = function () {
  //为了保证兼容性，这里取两个值，哪个有值取哪一个
  //scrollTop就是触发滚轮事件时滚轮的高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  console.log("滚动距离" + scrollTop);
  console.log("元素",(scrollTop-3000)/2000,document.getElementById("profile"))
  const profile = document.getElementById("profile");
  profile.style.opacity = (scrollTop-3000)/2000;
  // if(scrollTop>4000){
  //   profile.style.opacity = 1;
  // }else{
  //   profile.style.opacity = 0;
  // }
}