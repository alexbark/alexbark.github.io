App.HighlightRoute = function(topmenu, hash){
   var menuItems = document.querySelectorAll(".top-navigation a"),
       removeHashSign = function(string){
           return string.split("#").pop()
       },
       removeActiveState = function(elem){
              var classNameArr = elem.className.split(" "),
                  activeClassIndex = classNameArr.indexOf("is-active");
              if(activeClassIndex > -1){
                classNameArr.splice(activeClassIndex, 1);
              }
              return classNameArr.join(" ");
       };

    Array.prototype.forEach.call(menuItems, function(item){
      if(removeHashSign(item.href) == removeHashSign(hash)){
        item.className += " is-active";
      }else{
        item.className = removeActiveState(item);
      }
   })
}
