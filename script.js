gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();


let mainPage = document.querySelector("#main");
let gameCardContainer = document.querySelector(".free-gc");
let hero = document.querySelector(".hero");
let heroItems = document.querySelectorAll(".hero-item");
let gameVideo = document.querySelector(".game-video");
let otherCategories = document.querySelector(".other-categories");


let freeGameCardData = [
  {
    title: "more",
    image:
      "https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-17zb2.png?h=480&quality=medium&resize=1&w=360",
    rotate: -20,
    origin: "right",
  },
  {
    title: "warframe",
    image:
      "https://cdn1.epicgames.com/offer/244aaaa06bfa49d088205b13b9d2d115/EGS_Warframe_DigitalExtremes_S2_1200x1600-dedea6d1723c52a562acebe279da5ec8?h=480&quality=medium&resize=1&w=360",
    rotate: -10,
    origin: "right",
  },
  {
    title: "diablo",
    image: "./Asserts/diablo.avif",
    rotate: 0,
    origin: "left",
  },
  {
    title: "XDefiant",
    image: "./Asserts/x defiant.avif",
    rotate: 10,
    origin: "left",
  },
  {
    title: "call of duty mw II",
    image: "./Asserts/call of duty cross gen.webp",
    rotate: 20,
    origin: "left",
  },
];

let otherCategoriesData = [
  {
    heading: "Discover New",
    gameList: [{
      title: "Hell Drivers II",
      image: "./Asserts/helldivers.webp",
    },
    {
      title: "the last of us part I",
      image: "./Asserts/the-last-of-us-part-1.webp",
    },
    {
      title: "Horizon Forbidden West™",
      image: "./Asserts/horizon.avif",
    }],
  },
  {
    heading: "Top Upcomings",
    gameList: [{
      title: "Black Myth: Wukong",
      image: "./Asserts/game2.jpg",
    },
    {
      title: "Call of Duty®: Black Ops 6",
      image: "./Asserts/call of duty bo vi.avif",
    },
    {
      title: "Gta VI",
      image: "./Asserts/gta vi.jpg_large",
    }],
  },
  {
    heading: "Most played",
    gameList: [{
      title: "gta v",
      image: "./Asserts/gta v.jpg",
    },
    {
      title: "UNCHARTED: Legacy of Thieves",
      image: "./Asserts/uncharted.webp",
    },
    {
      title: "god of war",
      image: "./Asserts/god-of-war.webp",
    }],
  },
];


// Sperate Text into span
function splitText(textClassName) {
  let texts = document.querySelectorAll(`.${textClassName}`);

  texts.forEach((text, index) => {
    let characters = text.innerHTML.split("");
    text.innerHTML = "";
    characters.forEach((character, charIndex) => {
      text.innerHTML += `<span class="${textClassName}-${index} text-white inline-block">${character === " "?"&nbsp": character}</span>`;
    });
  });
}


//  ------------------ LOADER ------------------
// let digits = document.querySelectorAll(".digit");
// let t1 = gsap.timeline();
// let delayTime = 0;
// digits.forEach((digit, index) => {
//   gsap.to(digit, {
//     opacity: 1,
//     duration: 0.2,
//     delay: delayTime,
//   })

//   index>0 && gsap.to(digits[index-1], {
//     opacity: 0,
//     duration: 0.2,
//     delay: delayTime,
//   })

//   delayTime += 0.3;
// });

// gsap.to(".loader-text", {
//   transform: "translateX(-100%)",
//   delay: delayTime+0.7,
//   duration: 0.5,
// })

// console.log(digits[4].querySelector("span"));
// let digit4 = digits[4].querySelector("span");
// gsap.to(digit4, {
//   transform: "translateX(-100%)",
//   delay: delayTime+0.7,
//   duration: 0.5,
// })

// ---------- HIDE LOADER--------------
// const hideLoader = setTimeout(()=>{
//   const loader = document.querySelector("#loader");

//   gsap.from(mainPage, {
//     onStart: ()=>{
//       loader.style.display = "none";
//     },

//     y: 400,
//     duration: 0.7,
//     ease: "power4.in-out",

//     onComplete: ()=>{
//       document.querySelector("header").style.borderColor = 'black black #575757 black';
//     },
//   })
// }, 3400)



// ------------ CURSOR -----------------
let cursors = document.querySelectorAll(".cursor");

window.addEventListener("mousemove", (event)=>{
  cursors.forEach((cursor, index) => {
    gsap.to(cursor, {
      top: event.clientY,
      left: event.clientX,
      duration: ((index)/cursors.length) *0.22,
      ease:"cubic-bezier(0.5, 1, 0.89, 1)",
    })
  });
});




// ---------------- HAMBURGER MENU ----------------

splitText("menu-option");

let menuBtn = document.querySelector(".menu");
let menuOptions = document.querySelectorAll(".menu-option");
let isActive = false;
let scrollPosition = 0;

function disableScroll() {
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.overflow = "hidden";
  document.body.style.width = "100%";

  locoScroll.stop();
}

// Function to enable scrolling
function enableScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.overflow = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);

  locoScroll.start();
}

menuBtn.addEventListener("click", (event) => {
  isActive = !isActive
  isActive? disableScroll(): enableScroll();

  gsap.to(".hamburger-menu", {
    transform: `${isActive? "translateX(0%)": "translatex(100%)"}`,
    ease: CustomEase.create("custom","0.76, 0, 0.24, 1"),
    duration: 0.7,
  })

  isActive && gsap.from(".menu-option", {
    x: 500,
    duration: 1,
    opacity: 0,
  })

  gsap.to((".menu-line"), {
    onStart: ()=>{
      gsap.to(`.menu`, {
        rotate: `${isActive ? "360deg" : "0deg"}`,
        duration: 0.7,
      });
    },

    rotate: `${isActive? "45deg": "0deg"}`,
    ease: CustomEase.create("smooth","0.16, 1, 0.3, 1"),
    duration: 0.7,
  })
});

menuOptions.forEach((element, index)=>{
  element.addEventListener("mouseenter", ()=>{
    gsap.to(`.menu-option-${index}`,{
      x: 100,
      duration: 0.8,
      ease: CustomEase.create("smooth","0.16, 1, 0.3, 1"),
    });
  })

  element.addEventListener("mouseleave", ()=>{
    gsap.to(`.menu-option-${index}`,{
      x: 0,
      duration: 0.8,
      ease: CustomEase.create("smooth","0.16, 1, 0.3, 1"),
    });
  })
});




// ----------- HERO SECTION ------------------------
splitText("hero-text");

let currentElementIndex = 0;
heroItems.forEach((heroItem, index) => {
  if(index != 0){
    gsap.to(`.hero-text-${index}`,{
      opacity: 0,
    });
  }

  heroItem.addEventListener("mouseenter", (event) => {
    

    heroItems.forEach((heroItem, heroIndex) => {
      if (index !== heroIndex) {
        gsap.to(heroItem, {
          onStart: () => {
            gsap.to(`.hero-text-${heroIndex}`, {
              opacity: 0,
              stagger: 0.02,
            });
          },
          width: `${window.innerWidth > 768 ? "20%" : "75%"}`,
          duration: 0.5,
        });
      }
    });

    gsap.to(heroItem, {
      onStart: () => {
        gsap.to(`.hero-text-${index}`, {
          opacity: '1',
          stagger: 0.02,
        });
      },
      width: `${window.innerWidth > 768 ? "60%" : "95%"}`,
      duration: 0.5,
    });
  });
});


// ------------------------- OTHER LINKS ------------------------
otherCategoriesData.forEach((element, index)=>{
  let headingArr = element.heading.split(" ");
  otherCategories.innerHTML += `<div class="flex flex-col md:flex-row text-white items-center h-[50vh] w-full md:h-[30vh] lg:h-[35vh] lg:w-[85%] m-auto  mt-7 md:mt-0">
                <div class="text-5xl md:text-4xl lg:text-3xl 2xl:text-5xl flex flex-col items-center md:items-start leading-[3.2rem] md:leading-none text-white mb-2  w-[30%]">
                  <h2>${headingArr[0]}<h2/>
                  <h2>${headingArr[1]}<h2/>
                </div>
                <div class="oGameListContainer flex justify-between mt-3 md:mt-0  h-full w-full md:w-[70%] lg:pr-[10vh] gap-2 overflow-auto">
                    <div class="w-full md:w-[50vh] lg:w-[33.33%] shrink-0 p-2 relative item category h-full flex flex-col justify-center items-center">
                        <img src="${element.gameList[0].image}" class="absolute h-full w-full left-0 right-0 object-cover object-top" alt="">
                        <h2 class="text-xl 2xl:text-3xl text-center">${element.gameList[0].title}</h2>
                    </div>

                    <div class="w-full md:w-[50vh] lg:w-[33.33%] shrink-0 p-2 relative item category h-full flex flex-col justify-center items-center">
                        <img src="${element.gameList[1].image}" class="absolute h-full w-full left-0 right-0 object-cover  lg:opacity-0 object-top" alt="">
                        <h2 class="text-xl 2xl:text-3xl text-center">${element.gameList[1].title}</h2>
                    </div>

                    <div class="w-full md:w-[50vh] lg:w-[33.33%] shrink-0 p-2 relative item category h-full flex flex-col justify-center items-center">
                        <img src="${element.gameList[2].image}" class="absolute h-full w-full left-0 right-0 object-cover  lg:opacity-0 object-top" alt="">
                        <h2 class="text-xl 2xl:text-3xl text-center">${element.gameList[2].title}</h2>
                    </div>
    
                </div>
            </div>`
})

let categories = document.querySelectorAll(".category");
window.innerWidth > 830 && (categories.forEach((element, index)=>{
  element.addEventListener('mouseover', ()=>{

    categories.forEach((category, subIndex)=>{
      
      if(subIndex!= index){
        gsap.to(category.querySelector("img"), {
          onStart: ()=>{
            gsap.to(category.querySelector("h2"),{
              opacity: 1,
              duration: 0.2,
            })
          },

          opacity: 0,
          duration: 0.3,
        })
      }
    });

    gsap.to(element.querySelector("img"), {
      onStart: ()=>{
        gsap.to(element.querySelector("h2"),{
          opacity: 0,
          duration: 0.2,
        })
      },
      opacity: 1,
      duration: 0.3,
    })
  })
}))

// ----------- ITEM SECTION ------------------------

let card = document.querySelectorAll(".item");
card.forEach((element, index) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xOffset = (x / element.clientWidth - 0.5) * 25;
    const yOffset = (y / element.clientHeight - 0.5) * 25;
  
    let cardImage = element.querySelector("img");
    gsap.to(cardImage, {
      duration: 0.3,
      scale: 1,
      x: `${xOffset}px`,
      y: `${yOffset}px`,
      ease: "power3.out",
    });
  });

  element.addEventListener("mouseleave", (e) => {
    let cardImage = element.querySelector("img");
    gsap.to(cardImage, {
      duration: 0.3,
      scale: 1,
      x: 0,
      y: 0,
      ease: "power3.out",
    });
  });
});
 


// -------------- slider --------------
const sliders = document.querySelectorAll('.item-container');

sliders.forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;


  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    console.log(startX);
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
})


// --------------- TRENDING SECTION --------------------
gsap.to(".trending-item", {
  transform: "translateX(-200%)",

  scrollTrigger: {
    trigger: ".trending-items",
    scroller: "#main",
    start: "top 0%",
    end: "top -350%",
    scrub: 2,
    pin: true,
  }
})



// --------------- FREE GAME CARDS SECTION --------------------

freeGameCardData.forEach((card, index) => {
  gameCardContainer.innerHTML += `<div class="f-game-card ${index == 0 && 'backdrop-blur-md'} rotate-[${card.rotate}deg] origin-bottom-${card.origin} absolute top-0 left-[50%] -translate-x-[50%] shadow-[0_8px_12px_-5px_rgba(0,0,0,0.8)] shrink-0">
                        <div class="item relative h-[35vh] w-[35vh] md:h-[30vh] lg:h-[58vh]  md:w-[30vh] lg:w-[60vh] flex justify-center items-center border-[1px] border-[#575757]">
                            <img class="absolute ${index == 0 && 'hidden backdrop-blur-lg'} top-0 left-0 h-full w-full object-cover object-center z-10" src="${card.image}" alt="">
                            <div class="absolute bottom-0 left-0 h-[100%] w-full z-20 bg-gradient-to-t from-[#000000] to-[#00000000]"></div>
                            <h2 class="text-white text-[3vh] md:text-[3.9vh] xl:text-[4.3vh] text-center z-30 px-2">${card.title}</h2>
                        </div>
                    </div>`;
});


function findRotation(targetElement){
  // const targetElement = document.getElementById(elementId);
            
            // Get the computed style of the element
            const computedStyle = window.getComputedStyle(targetElement);
            
            // Get the transformation matrix
            const matrix = computedStyle.transform;
            
            // Extract the values from the matrix
            const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            const a = values[0];
            const b = values[1];
            
            // Calculate the angle in radians
            const radians = Math.atan2(b, a);
            
            // Convert radians to degrees
            const degrees = radians * (180 / Math.PI);
            
            // Log the rotation degree
            console.log(`Rotation Degree: ${degrees}deg`);
}

const fGameCards = document.querySelectorAll('.f-game-card');

let middleValue = Math.ceil(fGameCards.length/2);
fGameCards.forEach((element, index)=>{
  fGameCards.forEach((elem, subIndex)=>{
    
    if(subIndex > index){
      let currentRotateValue = freeGameCardData[subIndex].rotate;
      let currentOriginValue = freeGameCardData[subIndex].origin;
      element.addEventListener('mouseenter', (event)=>{
        gsap.to(elem, {
          transformOrigin: `${currentOriginValue} bottom`,
          rotate: `${currentRotateValue+70}deg`,
          duration: 0.6,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
        })
      })

      element.addEventListener('mouseleave', (event)=>{
        gsap.to(elem, {
          transformOrigin: `${currentOriginValue} bottom`,
          rotate: `${currentRotateValue}deg`,
          duration: 0.6,
          ease: "cubic-bezier(0.33, 1, 0.68, 1)",
        })
      })
    }
  })
})



// ---------------- PURCHASE SECTION ----------------
let purchaseHeading = document.querySelectorAll(".purchase-heading");

purchaseHeading.forEach((heading, index) => {
  gsap.to(heading, {
    transform: `translateX(-10%)`,
    scrollTrigger: {
      trigger: ".purchase-heading-container",
      scroller: "#main",
      start: `top ${window.innerWidth > 768? '105%}': '105%'}`,
      end: `top ${window.innerWidth > 768? '-70%}': '-70%'}`,
      scrub: 1,
      duration: 10,
    }
  },
)
});


let instructions = document.querySelectorAll(".instructions");

instructions.forEach((instruction, index)=>{
  gsap.from(instruction.querySelectorAll(".heading-reveal"), {
    y: 150,
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: instruction,
      scroller: "#main",
      start: "top 85%",
      end: "top 10%",  
      ease: "power4.out",
    }
  })
});


// gsap.to(gameVideo, {
//   scrollTrigger: {
//     trigger: gameVideo,
//     scroller: "#main",
//     start: `top 120%`,
//     end: `top -100%`,
//     onEnter: () => {gameVideo.play()},
//       onLeave: () => gameVideo.pause(),
//       onEnterBack: () => gameVideo.play(),
//       onLeaveBack: () => gameVideo.pause(),

//   },
// })



