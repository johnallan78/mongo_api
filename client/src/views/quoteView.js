var QuoteView = function(scale){
  this.render(scale);
}

QuoteView.prototype = {
  render: function(scale){
    
    console.log(scale);
    scale.forEach( function(scale){
      var li = document.createElement('li');
      var text = document.createElement('p');
      var ul = document.getElementById('scales');
      text.innerText = scale.scale + ": " + '"' + scale.notes + '"';
      li.appendChild(text);
      ul.appendChild(li);
    })
  }
}

 module.exports = QuoteView;