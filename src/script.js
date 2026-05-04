let titan = Number(localStorage.getItem("titan")) || 0;
let autoMoney = Number(localStorage.getItem("autoMoney")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;



const achievements = [
  { id: 1, title: "Перший крок", desc: "Видобуто 10 титану", target: 10, type: "titan", earned: false },
  { id: 2, title: "Старатель", desc: "Видобуто 100 титану", target: 100, type: "titan", earned: false },
  { id: 3, title: "Майстер кліку", desc: "Сила кліку досягла 5", target: 5, type: "click", earned: false },
  { id: 4, title: "Автоматизація", desc: "Автовидобуток досяг 5/с", target: 5, type: "auto", earned: false },
  { id: 5, title: "Титанова лихоманка", desc: "Накопичено 1 000 титану", target: 1000, type: "titan", earned: false },
  { id: 6, title: "Бур-майстер", desc: "Сила кліку досягла 20", target: 20, type: "click", earned: false },
  { id: 7, title: "Мала фабрика", desc: "Автовидобуток досяг 50/с", target: 50, type: "auto", earned: false },
  { id: 8, title: "Багатій", desc: "Накопичено 10 000 титану", target: 10000, type: "titan", earned: false },
  { id: 9, title: "Промисловий гігант", desc: "Автовидобуток досяг 200/с", target: 200, type: "auto", earned: false },
  { id: 10, title: "Півшляху", desc: "Зібрано 500 000 титану", target: 500000, type: "titan", earned: false }
];


function showAchievement(ach) {
  const box = document.getElementById("achievement-box");
  document.getElementById("ach-title").innerText = ach.title;
  document.getElementById("ach-desc").innerText = ach.desc;

  box.classList.add("show");
  
 
  setTimeout(() => {
    box.classList.remove("show");
  }, 4000);
}


function checkAchievements() {
  achievements.forEach(ach => {
    if (!ach.earned) {
      let currentVal = 0;
      if (ach.type === "titan") currentVal = titan;
      if (ach.type === "click") currentVal = clickPower;
      if (ach.type === "auto") currentVal = autoMoney;

      if (currentVal >= ach.target) {
        ach.earned = true;
        showAchievement(ach);
      }
    }
  });
}


const oresDisplay = document.querySelector(".ores");
const moneys = document.querySelector(".money\\/s");
const clickButton = document.querySelector(".clickButton");

function update() {
  oresDisplay.innerText = Math.floor(titan);
  moneys.innerText = autoMoney;

  checkAchievements(); 

  localStorage.setItem("titan", titan);
  localStorage.setItem("autoMoney", autoMoney);
  localStorage.setItem("clickPower", clickPower);
}

clickButton.onclick = () => {
  titan += clickPower;
  update();
};

document.querySelectorAll(".shop").forEach(item => {
  item.onclick = () => {
    const price = +item.querySelector(".price").innerText;
    
    if (titan >= price) {
      titan -= price;
      const bonusText = item.querySelector("b").innerText;
      const bonusValue = +bonusText.match(/\d+/);

      if (bonusText.includes("/с")) {
        autoMoney += bonusValue;
      } else {
        clickPower += bonusValue;
      }
      update();
    } else {
      item.style.borderColor = "red";
      setTimeout(() => item.style.borderColor = "#222", 200);
    }
  };
});

document.querySelector(".finishMission").onclick = () => {
  if (titan >= 1000000) {
    alert("ВІТАЄМО! Місія завершена!");
    titan -= 1000000;
    update();
  } else {
    alert("Недостатньо титану! Треба ще " + (1000000 - Math.floor(titan)));
  }
};

setInterval(() => {
  titan += autoMoney;
  update();
}, 1000);

update();