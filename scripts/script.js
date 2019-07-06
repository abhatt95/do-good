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
    var card_per_row = 4;

    for (var i = 0; i < data.length; i += card_per_row) {
        var row = document.createElement("div");
        row.className = "row"

        remaining = card_per_row;
        if ((i + 1) * card_per_row > data.length) {
            remaining = data.length - i * card_per_row;
        }

        for (var j = 0; j < remaining; j++) {
            var card = document.createElement("div");
            card.className = "card col-3";
            var card_body = document.createElement("div");
            card_body.className = "card-body";
            card.appendChild(card_body);

            // create card title
            var card_title = document.createElement("h5");
            card_title.className = "card-title";
            var text = document.createTextNode(data[3 * i + j].name);
            card_title.appendChild(text);

            var card_text = document.createElement("p");
            card_text.className = "card-text";
            var text = document.createTextNode(data[3 * i + j].causes);
            card_text.appendChild(text);

            var card_link = document.createElement("a");
            card_link.className = "btn btn-primary";
            card_link.href = data[3 * i + j].url;
            var text = document.createTextNode("Website");
            card_link.appendChild(text);

            card_body.appendChild(card_title);
            card_body.appendChild(card_text);
            card_body.appendChild(card_link);

            // insert into content
            row.appendChild(card);
        }
        var element = document.getElementById("content");
        element.appendChild(row);
      }
  }
};


getJSON('https://abhatt95.github.io/do-good/data/websites.json',  render);
