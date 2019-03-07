var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  document.querySelector('.groet').innerHTML = 'Goede morgen!';
} else if (curHr < 18) {
  document.querySelector('.groet').innerHTML = 'Goede middag!';
} else {
  document.querySelector('.groet').innerHTML = 'Goede avond!';
}