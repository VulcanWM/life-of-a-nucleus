const subcellular_animal = ['mitochondrion', 'cell membrane', 'cytoplasm', 'ribosome']
const subcellular_plant = ['mitochondrion', 'cell membrane', 'cytoplasm', 'ribosome', 'vacuole', 'cell wall', 'chloroplast']
const question_types = ["there_or_not", "what_job", "called_what"]
const letters = ["a", "b", "c"]
const jobs = {
  "mitochondrion": "You are where respiration happens. Enzymes are contained in you.",
  "cell membrane": "You are a selective barrier that controls which substances pass in and out of the cell.",
  "cytoplasm": "You are a liquid gel in which chemical reactions which are needed for life occur in.",
  "cell wall": "You are made of cellulose and form a rigid non-living box around the cell to strengthen and provide support.",
  "vacuole": "You are full of cell sap, a watery solution of sugar and salts. You help keep the cell rigid, so supporting the plant and keeping it upright.",
  "ribosome": "You are where all the proteins needed for the cell are synthesised.",
  "chloroplast": "You contain chlorophyll and you are where photosynthesis occurs."
}
const descriptions = {
  "mitochondrion": "they are where respiration happens. Enzymes are contained in them.",
  "cell membrane": "they are a selective barrier that controls which substances pass in and out of cell.",
  "cytoplasm": "they are a liquid gel in which chemical reactions which are needed for life occur in.",
  "cell wall": "they are made of cellulose and form a rigid non-living box around the cell to strengthen and provide support.",
  "vacuole": "they are full of cell sap, a watery solution of sugar and salts. They help keep the cell rigid, so supporting the plant and keeping it upright.",
  "ribosome": "they are where all the proteins needed for the cell are synthesised.",
  "chloroplast": "they contain chlorophyll and they are where photosynthesis occurs."
}

function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + (10000000*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var extra = document.getElementById("extra")
var correct_answer = "a";
var day = getCookie("day")
if (day == ""){
  day = 1
} else {
  day = parseInt(day)
}

var cpd = getCookie("cpd")
if (cpd == ""){
  cpd = 1
} else {
  cpd = parseInt(cpd)
}

var cells = getCookie("cells")
if (cells == ""){
  cells = 1
} else {
  cells = parseInt(cells)
}
document.getElementById("day").innerText = day
document.getElementById("cells").innerText = cells
document.getElementById("cpd").innerText = cpd

var buycpd = document.getElementById("buycpd")
var price = 25 * Math.pow(2, cpd-1)
buycpd.innerText = `Increase CPD to ${cpd*2} for ${price} Cells`

function reset(){
  day = 1
  cpd = 1
  cells = 1
  setCookie("day", day)
  setCookie("cells", cells)
  setCookie("cpd", cpd)
  document.getElementById("day").innerText = day
  document.getElementById("cells").innerText = cells
  document.getElementById("cpd").innerText = cpd
  extra.classList.remove("error")
  extra.classList.add("message")
  document.getElementById("extra").innerText = "Try to get the most cells in the least days!"
  
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generate_question(){
  types = ["there_or_not", "what_job", "what_is_it"];
  var type = types[Math.floor(Math.random() * types.length)];
  if (type == "there_or_not"){
    var part = subcellular_plant[Math.floor(Math.random()*subcellular_plant.length)];
    var answers = ["Yep, they'll find great friends there!", "You don't know where each subcellular structure lives!", `A ${part} doesn't live in an animal cell!`]
    answers = shuffle(answers);
    if (subcellular_animal.includes(part)){
      var index = answers.indexOf("Yep, they'll find great friends there!")
    } else {
      var index = answers.indexOf(`A ${part} doesn't live in an animal cell!`)
    }
    var questiondoc = document.getElementById("question")
    questiondoc.innerText = `A ${part} is asking you if they can move to an animal cell. What should you answer?`
    correct_answer = letters[index]
    var index = 1
    for (let answer in answers){
      document.getElementById(`option${index}`).innerText = answers[answer]
      index = index + 1
    }
  } else if (type == "what_job"){
    var part = subcellular_plant[Math.floor(Math.random()*subcellular_plant.length)];
    var answer = jobs[part]
    var question = `A ${part} is asking you what job they do. What should you answer?`
    var questiondoc = document.getElementById("question")
    questiondoc.innerText = question
    var answers = new Array()
    answers.push(answer)
    for (const key in jobs){
      if (answers.length == 3){
        break
      }
      if (answers.includes(jobs[key])){
        // nothing
      } else {
        answers.push(jobs[key])
      }
    }
    answers = shuffle(answers)
    var index = answers.indexOf(answer)
    correct_answer = letters[index]
    var index = 1
    for (let answer in answers){
      document.getElementById(`option${index}`).innerText = answers[answer]
      index = index + 1
    }
  } else if (type == "what_is_it"){
    var answer = subcellular_plant[Math.floor(Math.random()*subcellular_plant.length)];
    var job = descriptions[answer]
    var question = `A cell part comes up to you saying that ${job} What cell part are they?`
    var questiondoc = document.getElementById("question")
    questiondoc.innerText = question
    var answers = new Array()
    answers.push(answer)
    for (const cell_part_list in jobs){
      if (answers.length == 3){
        break
      }
      if (answers.includes(cell_part_list)){
        // nothing
      } else {
        answers.push(cell_part_list)
      }
    }
    answers = shuffle(answers)
    var index = answers.indexOf(answer)
    correct_answer = letters[index]
    var index = 1
    for (let answer in answers){
      document.getElementById(`option${index}`).innerText = answers[answer]
      index = index + 1
    }
  }
}

generate_question()

function check_answer(answer){
  day = day + 1
  if (answer == correct_answer){
    cells = cells + cpd
    extra.innerText = "Correct!"
    extra.classList.remove("error")
    extra.classList.add("message")
  } else {
    extra.innerText = "Incorrect!"
    extra.classList.remove("message")
    extra.classList.add("error")
  }
  setCookie("day", day)
  setCookie("cells", cells)
  document.getElementById("day").innerText = day
  document.getElementById("cells").innerText = cells
  generate_question()
}

function buycpd(){
  price = 25 * Math.pow(2, cpd-1)
  if (cells < price){
    extra.classList.remove("message")
    extra.classList.add("error")
    extra.innerText = "Not enough cells!"
  } else {
    cpd = cpd * 2
    cells = cells - price
    setCookie("cpd", cpd)
    setCookie("cells", cells)
    document.getElementById("cpd").innerText = cpd
    document.getElementById("cells").innerText = cells
    extra.classList.remove("error")
    extra.classList.add("message")
    extra.innerText = `You increased your CPD to ${cpd} for ${price} cells!`
    var buycpd = document.getElementById("buycpd")
    newprice = 25 * Math.pow(2, cpd-1)
    buycpd.innerText = `Increase CPD to ${cpd*2} for ${newprice} Cells`
  }
}