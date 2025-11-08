function changeChannel(e) {
  document.querySelector(".active").classList.remove("active");
  e.currentTarget.classList.add("active");
  populateMessages(e.currentTarget.getAttribute("data-channel"));
  document.querySelector("#channel-title").innerText =
    e.currentTarget.innerText;
}

function populateMessages(chat) {
  document.querySelectorAll(".message").forEach((item) => item.remove());
  let template = document.querySelector("template");
  // INSERT CODE HERE
  

}


async function init(){
   
  // INSERT CODE HERE

    document
      .querySelectorAll(".channel")
      .forEach((item) => item.addEventListener("click", changeChannel));
  
}

init();
