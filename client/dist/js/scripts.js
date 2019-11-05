window.onload = function(evt) {
  var btn = document.createElement("BUTTON");   // Create a <button> element
  btn.innerHTML = "CLICK ME";                   // Insert text
  btn.onclick = function() {
    alert("Button clicked");
  };
  document.body.appendChild(btn);
};