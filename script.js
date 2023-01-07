const imageClickHandler = (e) => {
  const activeImages = document.querySelectorAll(".showing");
  activeImages.forEach(div => div.classList.remove("showing"));

  const imageUrl = e.target.style.backgroundImage;
  const imagePath = imageUrl.split('"')[1];
  const detailWrapper = document.getElementById("detail-backdrop");
  detailWrapper.classList.add("active");

  const detailImage = document.getElementById("detail-content-image");
  detailImage.setAttribute("src", imagePath);
  detailImage.classList.add("showing");
  setTimeout(() => detailImage.classList.remove("showing"), 250)

  e.target.classList.add("showing");
}

const hideDetailClickHandler = () => {
  const detailWrapper = document.getElementById("detail-backdrop");
  detailWrapper.classList.remove("active");
  document.getElementById("detail-content-image").classList.remove("transition")
}

const getImageStepsAwayFromShowing = (stepFromActiveSize) => {
  const imageDivs = Array.from(document.getElementById("image-grid").children);
  for(let i = 0; i < imageDivs.length; i++){
    const currentDiv = imageDivs[i];
    if(currentDiv.classList.contains("showing")){
      const newIndex = i + stepFromActiveSize;
      if(newIndex >= imageDivs.length){
        const diff = newIndex - imageDivs.length;
        return imageDivs[diff];
      } else if (newIndex < 0){
        const diff = imageDivs.length + newIndex;
        return imageDivs[diff]
      }
      return imageDivs[newIndex]
    }
  }
  return imageDivs[0];
}

const resetShowing = () => {
  document
    .querySelectorAll(".showing")
    .forEach(div => div.classList.remove("showing"));
}

const showNextClickHandler = () => {
  const nextImage = getImageStepsAwayFromShowing(1);
  resetShowing();
  nextImage.classList.add("showing");

  const imageUrl = nextImage.style.backgroundImage;
  const imagePath = imageUrl.split('"')[1];

  const detailImage = document.getElementById("detail-content-image");
  detailImage.classList.remove("transition");
  setTimeout(() => detailImage.classList.add("transition"), 1);
  setTimeout(() => detailImage.setAttribute("src", imagePath), 100);
}

const showPrevClickHandler = () => {
  const nextImage = getImageStepsAwayFromShowing(-1);
  resetShowing();
  nextImage.classList.add("showing");

  const imageUrl = nextImage.style.backgroundImage;
  const imagePath = imageUrl.split('"')[1];

  const detailImage = document.getElementById("detail-content-image");
  detailImage.classList.remove("transition");
  setTimeout(() => detailImage.classList.add("transition"), 1);
  setTimeout(() => detailImage.setAttribute("src", imagePath), 100);
}

/*
  MAIN SECTION
*/
const imageWrapper = document.getElementById("images");
const images = Array.from(imageWrapper.children);
const randImages = images.sort((a,b) => 0.5 - Math.random());

for(const image of images){
  const cards = document.querySelectorAll(".card:not(.has-image)");
  if(cards.length == 0) break;
  const card = cards[0];
  card.addEventListener("click", imageClickHandler);
  card.style.backgroundImage = `url("${image.getAttribute("src")}")`;
  card.classList.add("has-image");
}

document.getElementById("detail-backdrop").addEventListener("swiped-left", showNextClickHandler)
document.getElementById("detail-backdrop").addEventListener("swiped-right", showPrevClickHandler)

document.getElementById("detail-hide").addEventListener("click", hideDetailClickHandler)
document.getElementById("detail-next").addEventListener("click", showNextClickHandler)
document.getElementById("detail-prev").addEventListener("click", showPrevClickHandler)

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show")
    }
  });
});
const cards = document.querySelectorAll(".card");
cards.forEach(image => observer.observe(image));