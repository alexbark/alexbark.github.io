App.TopicsViewCtrl = function(){

var topics = App.topics;

function Item(item){
  return  `<li><a href="${item.location}">${item.name}</a></li>`
}

function SearchTopic(){
   return `<div class="input-wrapper">
               <input class="search-input" type="text" placeholder="search...">
               <i class="search-icon"></i>
           </div>`
}

function NewestTopic(allTopics){
    let latestTopic = allTopics.reduce((prev, cur)=>{
        return prev.dateOfPosting > cur.dateOfPosting ? prev : cur;
    }, 1);
    return `<a class="newest-topic" href="${latestTopic.location}">
               <div class="newest-topic-title"><strong>${latestTopic.name}</strong></div>
               <div class="newest-topic-content">
                    ${latestTopic.associatedImgUrl ? "<img src='"+ latestTopic.associatedImgUrl +"'>" : "<div class='newest-topic-text'>" + latestTopic.content +"</div>"}
              </div>
            </a>`
}

function view() {
    return `<div class="content">
              ${SearchTopic()}
              ${NewestTopic(topics)}
               <ul class="list-of-topics">
                  ${topics.map(Item).join('')}
               </ul>
            </div>`
}

App.UpdateView("#app-container", view());
}
