let gridSpace = document.querySelectorAll(".grid");
let reset = document.querySelector(".button");
let boxes = [
  ['top1','top2','top3'],
  ['mid1','mid2','mid3'],
  ['bot1','bot2','bot3'],
  ['top1','mid1','bot1'],
  ['top2','mid2','bot2'],
  ['top3','mid3','bot3'],
  ['top1','mid2','bot3'],
  ['top3','mid2','bot1']
];
function checkGrid(){
  var gridCount = 0;
  Array.from(gridSpace).forEach(function(el){
    if(el.textContent !== "" ){
      gridCount++;
    }
  });
  if (gridCount > 8) {
    alert('DRAW!');
  }
}
function getTextContent(id) {
  return document.getElementById(id).textContent;
}
function checkWinner(piece,sp1,sp2,sp3){
  if (getTextContent(sp1) === piece && getTextContent(sp2) === piece && getTextContent(sp3) === piece){
   return true;
 }else {return false;}
}
// setup tic-tac-toe object
let ttc = {

  // var topRow = [" "," "," "],
  // var midRow = [" "," "," "],
  // var botRow = [" "," "," "],
  piece: "x",

  // alternate X & O's

  alternate: function(){
      if (ttc.piece === "x" && event.target.textContent !== "x"){
        ttc.piece = "o";
      }else if (ttc.piece === "o" && event.target.textContent !== "o"){
        ttc.piece = "x";
      }
      console.log(ttc.piece);
    },

// place X or O on grid as well prevent the page going to default
placePiece: function(){
  event.target.textContent = ttc.piece;
},

// reset button
reset: function(){
  console.log(gridSpace);
  Array.from(gridSpace).forEach(function(el){
     el.textContent = "";
     })
   }
// winning statement, losing statement, draw statement


}
reset.addEventListener("click", ttc.reset);

let xWin = parseFloat(document.getElementById('xWin').innerText) //turning form  entry into a number
let yWin = parseFloat(document.getElementById('yWin').innerText)

const xwin = () => {
  xWin +=1;
  fetch('messages', { //these 2 lines are to find correct API end point
   method: 'put',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     'name':'score', // this information is what we're passing along
     'xWin': xWin,
     'yWin': yWin
   })
  })
}

const ywin = () => {
  yWin +=1;
  fetch('messages', {
   method: 'put',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     'name':'score',
     'yWin': yWin,
     'xWin': xWin
   })
  })
}

Array.from(gridSpace).forEach(function(el){
  el.addEventListener("click", function(){
    ttc.alternate();
    ttc.placePiece();
    var hasWinner = false;
    for (let i=0;i<boxes.length;i++){
      var combo = boxes[i];
      if(checkWinner('x',combo[0],combo[1],combo[2])){
        hasWinner = true;
        alert("X Wins!");
        xwin();
      }
      if (checkWinner('o',combo[0],combo[1],combo[2])){
        hasWinner = true;
        alert("O Wins!");
        ywin();
      }
    }
    if (hasWinner === false){
        checkGrid();
    }
  })
})


// =================================================================================================
//
// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash");
//
// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText // the thing you clicked on then go up to the next parent then come back down to the selected child
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
//
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messagesDown', { // this is the url
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           // the object
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbDown':thumbDown
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
//
// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
// var payload = {
//     a: 1
// };
//
// var data = new FormData();
// data.append( "json", JSON.stringify( payload ) );
//
// fetch("messages",
// {
//     method: "POST",
//     body: data
// })
// .then(function(res){ return res.json(); })
// .then(function(data){ alert( JSON.stringify( data ) ) })
