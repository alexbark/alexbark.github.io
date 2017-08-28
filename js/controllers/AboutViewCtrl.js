App.AboutViewCtrl = function(){

  var about = "ABOUT";
  function view(data) {
    return `<div class="content">${data}</div>`
  }

App.UpdateView("#app-container", view(about));
}
