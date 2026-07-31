let themeBtn = document.getElementById("themeBtn");
let links = document.querySelectorAll(".nav-links a");
let typing = document.getElementById("typing");
let words = ["Étudiante en Génie Logiciel", "Développeuse Web Junior", "Passionnée par la programmation"];
let wordIndex = 0;
let letterIndex = 0;
let filters = document.querySelectorAll(".filter");
let projects = document.querySelectorAll(".project-card");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeBtn) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}
let menuBtn = document.getElementById("menuBtn");
let navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

links.forEach(function(link){
    link.addEventListener("click",function(){
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});
function typeEffect(){
    if(letterIndex < words[wordIndex].length){
        typing.textContent += 
        words[wordIndex][letterIndex];
        letterIndex++;
        setTimeout(typeEffect,100);
    }else{
        setTimeout(eraseEffect,1500);
    }
}
function eraseEffect(){
    if(letterIndex > 0){
        typing.textContent =
        words[wordIndex].substring(
            0,
            letterIndex-1
        );
        letterIndex--;
        setTimeout(eraseEffect,50);
    }else{
        wordIndex++;
        if(wordIndex >= words.length){
            wordIndex = 0;
        }
        setTimeout(typeEffect,500);
    }
}
typeEffect();
let reveals = document.querySelectorAll(".reveal");
function revealOnScroll(){
    reveals.forEach(function(element){
     let position =
        element.getBoundingClientRect().top;
        let screen =
        window.innerHeight;
        if(position < screen - 100){
            element.classList.add("active");
        }
    });
}
window.addEventListener(
    "scroll",
    revealOnScroll
);
revealOnScroll();
let stats = document.querySelectorAll(
    ".stat-card h3"
);
let started = false;
function startCounter(){
    if(started) return;
    let section =
    document.querySelector(".stats");
    let position =
    section.getBoundingClientRect().top;
    if(position < window.innerHeight){
        started = true;
        stats.forEach(function(stat){
            let target =
            Number(stat.dataset.number);
            let count = 0;
            let interval =
            setInterval(function(){
                count++;
                stat.textContent =
                count;
                if(count >= target){
                    clearInterval(interval);
                }
            },20);
        });
    }
}
window.addEventListener(
    "scroll",
    startCounter
);
filters.forEach(function(button){
    button.addEventListener("click",() => {
        filters.forEach(function(btn){
            btn.classList.remove("active");
        });
        button.classList.add("active");
        let category =button.dataset.filter;
        projects.forEach(function(project){
            if(category === "all"){
                project.style.display =
                "block";

            }

            else if(project.dataset.category.includes(category))
            {
                project.style.display =
                "block";
            }
            else{

                project.style.display =
                "none";
            }
        });
    });
});
let topBtn =
document.getElementById("topBtn");
window.addEventListener("scroll",() => {
    if(window.scrollY > 400){
        topBtn.style.display =
        "block";
    }else{
        topBtn.style.display =
        "none";
    }
});
topBtn.addEventListener("click",() => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});