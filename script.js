gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

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

let gameCardContainer = document.querySelector(".free-gc");
let hero = document.querySelector(".hero");
let heroItems = document.querySelectorAll(".hero-item");
let card = document.querySelectorAll(".item");

// Sperate Text into span
function splitText(textClassName) {
  let texts = document.querySelectorAll(`.${textClassName}`);

  texts.forEach((text, index) => {
    let characters = text.innerHTML.split("");
    text.innerHTML = "";
    characters.forEach((character, charIndex) => {
      console.log(character);
      text.innerHTML += `<span class="${textClassName}-${index} ${
        index != 0 ? "opacity-0" : "opacity-1"
      } text-white inline-block">${character === " "?"&nbsp": character}</span>`;
    });
  });
}

// ----------- HERO SECTION ------------------------
splitText("hero-text");

let currentElementIndex = 0;
heroItems.forEach((heroItem, index) => {
  heroItem.addEventListener("mouseenter", (event) => {
    heroItems.forEach((heroItem, heroIndex) => {
      if (index !== heroIndex) {
        gsap.to(heroItem, {
          onStart: () => {
            gsap.to(`.hero-text-${heroIndex}`, {
              opacity: 0,
              y: 15,
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
          opacity: 1,
          y: 0,
          stagger: 0.02,
        });
      },
      width: `${window.innerWidth > 768 ? "60%" : "95%"}`,
      duration: 0.5,
    });
  });
});

// ----------- ITEM SECTION ------------------------
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
const slider = document.querySelector('.item-container');
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
      if (!isDown) return;  // stop the fn from running
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    });




    // gsap
    // gsap.registerPlugin(ScrollToPlugin)
    // gsap.to(slider, { duration: 2, scrollTo: {x: 600 }, ease: "power2" });


    // slider.addEventListener('mousedown', (e) => {
    //   isDown = true;
    //   slider.classList.add('active');
    //   startX = e.pageX - slider.offsetLeft;
    //   scrollLeft = slider.scrollLeft;
    // });

    // slider.addEventListener('mouseleave', () => {
    //   isDown = false;
    //   slider.classList.remove('active');
    // });

    // slider.addEventListener('mouseup', () => {
    //   isDown = false;
    //   slider.classList.remove('active');
    // });

    // slider.addEventListener('mousemove', (e) => {
    //   if (!isDown) return;  // stop the fn from running
    //   e.preventDefault();
    //   const x = e.pageX - slider.offsetLeft;
    //   const walk = (x - startX * 30);
    //   // slider.scrollLeft = scrollLeft - walk;
    //   gsap.to(slider, { duration: 1, scrollTo: {x: slider.scrollLeft - walk}, ease: "none" });

    //   console.log(slider.scrollLeft - walk);
    // });

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
  gameCardContainer.innerHTML += `<div class="f-game-card rotate-[${card.rotate}deg] origin-bottom-${card.origin} absolute top-0 left-[50%] -translate-x-[50%] shrink-0">
                        <div class="item relative h-[35vh] w-[35vh] md:h-[30vh] lg:h-[58vh]  md:w-[30vh] lg:w-[60vh] flex justify-center items-center border-[1px] border-[#575757]">
                            <img class="absolute ${index == 0 && 'hidden'} top-0 left-0 h-full w-full object-cover object-center z-10" src="${card.image}" alt="">
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
        console.log(index, subIndex);
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
  console.log(heading);
  gsap.to(heading, {
    transform: `translateX(120%) ${index == 0 ? 'rotate(-10deg)' : 'rotate(10deg)'}`,
    scrollTrigger: {
      trigger: ".purchase-heading-container",
      scroller: "#main",
      start: `top ${window.innerWidth > 768? '80%}': '80%'}`,
      end: `top ${window.innerWidth > 768? '-100%}': '-130%'}`,
      scrub: 1,
      duration: 10,
    }
  },
)
});