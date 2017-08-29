var SUMMER = SUMMER || {};

SUMMER.pubsub = (function() {
    var topics = {};

    return {
        on: function(topic, listener) {
            if (!topics[topic]) topics[topic] = {
                queue: []
            };

            var index = topics[topic].queue.push(listener) - 1;
            return {
                off: function() {
                    delete topics[topic].queue[index];
                }
            };
        },
        emit: function(topic, info) {
            if (!topics[topic] || !topics[topic].queue.length) return;
            var items = topics[topic].queue;
            items.forEach(function(item) {
                item(info || {});
            });
        }
    };
})();
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
   }
   function clearImgContainer(){
      document.querySelector(".img-container").innerHTML = "";
   }
}
