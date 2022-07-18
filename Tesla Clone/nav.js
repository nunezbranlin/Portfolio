const openMenu = () => {
  document.querySelector(".backdrop").className = "backdrop active";
  document.querySelector("aside").className = "active";
};
const CloseMenu = () => {
  document.querySelector(".backdrop").className = "backdrop";
  document.querySelector("aside").className = "";
};

document.getElementById("menuBtn").onclick = (e) => {
  e.preventDefault();
  openMenu();
};
document.querySelector("aside button.close").onclick = (e) => {
  CloseMenu();
};
document.querySelector(".backdrop").onclick = (e) => {
  CloseMenu();
};
