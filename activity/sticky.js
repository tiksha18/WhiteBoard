let sticky = document.querySelector("#sticky")

sticky.addEventListener("click", function()
{
    let textArea = document.createElement("textarea");

    textArea.setAttribute("rows", "10");
    textArea.setAttribute("cols", "30");

    let stickyContent = createSticky();
    stickyContent.appendChild(textArea);

    
})