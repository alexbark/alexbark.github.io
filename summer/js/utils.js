SUMMER.Maybe = function(val){
  this.__val = val;
}
SUMMER.Maybe.of = function(val){
  return new SUMMER.Maybe(val);
}
SUMMER.Maybe.prototype.isNothing = function(){
  return (this.__val === undefined || this.__val === null)
}
SUMMER.Maybe.prototype.map = function(fn){
   return   this.isNothing() ? SUMMER.Maybe.of(null) : SUMMER.Maybe.of(fn(this.__val))
}
SUMMER.Maybe.prototype.join = function(fn){
   return   this.__val
}

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