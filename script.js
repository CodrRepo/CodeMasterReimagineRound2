const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
  });


let gameCardDate = [
  {
    title: "GTA V",
    image: "https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-17zb2.png?h=480&quality=medium&resize=1&w=360",
    rotate: -20,
    origin: "right",
  },
  {
    title: "GTA V",
    image: "https://cdn1.epicgames.com/offer/244aaaa06bfa49d088205b13b9d2d115/EGS_Warframe_DigitalExtremes_S2_1200x1600-dedea6d1723c52a562acebe279da5ec8?h=480&quality=medium&resize=1&w=360",
    rotate: -10,
    origin: "right",
  },
  {
    title: "GTA V",
    image: "./Asserts/diablo.avif",
    rotate: 0,
    origin: "center",
  },
  {
    title: "GTA V",
    image: "./Asserts/x defiant.avif",
    rotate: 10,
    origin: "left",
  },
  {
    title: "GTA V",
    image: "./Asserts/call of duty cross gen.webp",
    rotate: 20,
    origin: "left",
  },
]


let gameCardContainer = document.querySelector(".free-gc");

gameCardDate.forEach((card)=>{
  console.log(gameCardContainer);
  gameCardContainer.innerHTML += `<div class="stick rotate-[${card.rotate}deg] origin-bottom-${card.origin} absolute top-0 left-[50%] -translate-x-[50%] shrink-0">
                        <div class="item relative h-[35vh] w-[35vh] md:h-[58vh]  md:w-[60vh] flex justify-center items-center border-[1px] border-[#575757]">
                            <img class="absolute top-0 left-0 h-full w-full object-cover object-center z-10" src="${card.image}" alt="">
                            <div class="absolute bottom-0 left-0 h-[100%] w-full z-20 bg-gradient-to-t from-[#000000] to-[#00000000]"></div>
                            <h2 class="text-white text-2xl text-center z-30 px-2">${card.title}</h2>
                        </div>
                    </div>`
})