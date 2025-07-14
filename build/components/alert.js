function Alert(text = "", color = "black") {
    let al = document.getElementById("alert-text");
    al.style.color = color;
    al.innerHTML = text;
    setTimeout(() => {
        al.style.color = "black";
        al.innerHTML = "";
    }, 2500);
}
