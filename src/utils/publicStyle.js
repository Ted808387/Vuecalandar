const changestyle = (style) => {
    document.getElementsByTagName("body")[0].style.setProperty("--bg2",style ? "#17212b" : "white");
    document.getElementsByTagName("body")[0].style.setProperty("--bg7",style ? "#1d262e" : "#f1eeee");
    document.getElementsByTagName("body")[0].style.setProperty("--bg8",style ? "#283441" : "white");
    document.getElementsByTagName("body")[0].style.setProperty("--font_1",style ? "white" : "#2c3e50");
    document.getElementsByTagName("body")[0].style.setProperty("--font_2",style ? "#2c3e50" : "white");
    document.getElementsByTagName("body")[0].style.setProperty("--icon",style ? "white" : "#888b8994");
}

export default changestyle