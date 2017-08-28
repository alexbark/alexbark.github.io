App.HomeViewCtrl = function(){

  var imgUrl = 'assets/img/workplace.jpg';
  var homePageImg = `<img class="home-page-img" src="${imgUrl}">`;

  function view() {
    return `<div class="content">${homePageImg}</div>`
  }

App.UpdateView("#app-container", view());
}
