
let titan;
if (localStorage.getItem("titan")) {
    titan = +localStorage.getItem("titan");
} else {
    titan = 0;
}

let autoMoney;
if (localStorage.getItem("autoMoney")) {
    autoMoney = +localStorage.getItem("autoMoney");
} else {
    autoMoney = 0;
}

let clickPower;
if (localStorage.getItem("clickPower")) {
    clickPower = +localStorage.getItem("clickPower");
} else {
    clickPower = 1;
}

let boughtItems = [];
if (localStorage.getItem("boughtItems")) {
    boughtItems = localStorage.getItem("boughtItems").split(",");
}


const achievements = [
    { title: "Перша руда", desc: "Видобуто 10 титану", target: 10, type: "titan", earned: false },
    { title: "Автоматизація", desc: "Автовидобуток досяг 20/с", target: 20, type: "auto", earned: false },
    { title: "Гіпер-клік", desc: "Сила кліку досягла 50", target: 50, type: "click", earned: false },
    { title: "Мільйонер", desc: "Накопичено 1 000 000 титану", target: 1000000, type: "titan", earned: false }
];

function checkAchievements() {
    achievements.forEach(ach => {
        if (ach.earned == false) {
            let val = 0;
            if (ach.type == "titan") val = titan;
            if (ach.type == "auto") val = autoMoney;
            if (ach.type == "click") val = clickPower;

            if (val >= ach.target) {
                ach.earned = true;
                const box = document.querySelector("#achievement-box");
                document.querySelector("#ach-title").innerText = ach.title;
                document.querySelector("#ach-desc").innerText = ach.desc;
                box.classList.add("show");
                setTimeout(() => box.classList.remove("show"), 4000);
            }
        }
    });
}


function createRipple(e) {
    const zone = document.querySelector("#clickZone");
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    zone.appendChild(ripple);

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    let currentSize = 100 + (clickPower * 4);
    ripple.style.setProperty("--size", currentSize + "px");

    if (clickPower > 50) ripple.style.background = "rgba(255, 50, 0, 0.8)";

    setTimeout(() => ripple.remove(), 700);
}


const oresDisplay = document.querySelector(".ores");

const autoDisplay = document.querySelector(".money\\/s");

function update() {
    oresDisplay.innerText = titan;
    autoDisplay.innerText = autoMoney;
    
    checkAchievements();

    localStorage.setItem("titan", titan);
    localStorage.setItem("autoMoney", autoMoney);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("boughtItems", boughtItems.join(","));
}


document.querySelector("#clickZone").onclick = (e) => {
    titan = titan + clickPower;
    createRipple(e);
    update();
};


document.querySelectorAll(".shop").forEach(item => {
    const title = item.querySelector("b").innerText;

    for (let i = 0; i < boughtItems.length; i++) {
        if (boughtItems[i] == title) item.classList.add("bought");
    }

    item.onclick = () => {
        if (item.classList.contains("bought")) return;

        const price = +item.querySelector(".price").innerText;

        if (titan >= price) {
            titan = titan - price;
            
            let bonus = parseInt(title.split("+")[1]);

            if (title.includes("/с")) {
                autoMoney = autoMoney + bonus;
            } else {
                clickPower = clickPower + bonus;
            }

            boughtItems.push(title);
            item.classList.add("bought");
            update();
        } else {
            item.style.borderColor = "red";
            setTimeout(() => item.style.borderColor = "#333", 300);
        }
    };
});

setInterval(() => {
    titan = titan + autoMoney;
    update();
}, 1000);

update();
