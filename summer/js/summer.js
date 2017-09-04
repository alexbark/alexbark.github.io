var SUMMER = SUMMER || {};

SUMMER.generateEffect = function(){

  var effects = [ "verticalRotate", "horizontalRotate", "scaleDown", "scaleUp",
                  "rotateLeft", "rotateRight" ];
  var directions = [ "moveFromTop", "moveFromLeft", "moveFromRight"];

  function glueEffects(arr1, arr2){
     return `${arr1[getRandom(0, arr1.length-1)]} ${arr2[getRandom(0, arr2.length-1)]}`;
  }
  function getRandom(min, max) {
     return Math.round(Math.random() * (max - min) + min);
  }

  return glueEffects(effects, directions);

}

SUMMER.handleSlides = function(slide){

   putImgOnScreen(createImg());

   function createImg(){
     var img = document.createElement("img");
     img.src = slide.value.imgSrc;
     img.className = `${SUMMER.generateEffect()} ${slide.value.imgWidth}`;
     return img;
   }
   function putImgOnScreen(img){
      clearImgContainer()
      document.querySelector(".img-container").appendChild(img);
      setTimeout(() => {
        img.style.setProperty('--img-width', img.width + "px");
      },300)
   }
   function clearImgContainer(){
      document.querySelector(".img-container").innerHTML = "";
   }
}
