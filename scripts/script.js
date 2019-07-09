var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function() {

        var status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };

    xhr.send();
};


var render = function(err, data) {
  if (err != null) {
      console.error(err);
  } else {
    var row = document.createElement("div");
    row.className = "row"
    for (var i = 0; i < data.length; i++) {
        // create card
        var card = document.createElement("div");
        card.className = "card col-lg-3 col-md-4 col-sm-6 col-xs-12";

        // link card image
        var card_img = document.createElement("img");
        card_img.className = "card-img-top";
        if (data[i].imageurl == null) {
          card_img.src = "imgs/card-placeholder.png"
        } else {
          card_img.src = data[i].imageurl;
        }
        card.appendChild(card_img);

        var card_body = document.createElement("div");
        card_body.className = "card-body";
        card.appendChild(card_body);

        // create card content
        var card_title = document.createElement("h5");
        card_title.className = "card-title";
        var text = document.createTextNode(data[i].name);
        card_title.appendChild(text);

        var card_text = document.createElement("p");
        card_text.className = "card-text";
        var text = document.createTextNode(data[i].causes);
        card_text.appendChild(text);

        var card_link = document.createElement("a");
        card_link.className = "btn btn-primary";
        card_link.href = data[i].url;
        var text = document.createTextNode("Website");
        card_link.appendChild(text);

        var card_footer = document.createElement("div");
        card_footer.className = "card-footer";
        var address = document.createElement("small");
        address.className = "text-muted";
        var text = document.createTextNode(data[i].address.streetAddress + ", " +
                                           data[i].address.city + ", " +
                                           data[i].address.state + ", " +
                                           data[i].address.country);
        address.appendChild(text);
        card_footer.appendChild(address);

        // append content to the card
        card_body.appendChild(card_title);
        card_body.appendChild(card_text);
        card_body.appendChild(card_link);
        card.appendChild(card_footer)

        // insert into content
        row.appendChild(card);
    }
    var element = document.getElementById("content");
    element.appendChild(row);
  }
};


getJSON('https://abhatt95.github.io/do-good/data/websites.json',  render);
