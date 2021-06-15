﻿function navBarVisability() {
    if (localStorage.user != null) {
        user = JSON.parse(localStorage["user"]);
        $("#userName").text("Hello " + user.FirstName + " " + user.LastName);
        document.getElementById("signUp").style.visibility = "hidden";
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("exit").style.visibility = "visibility";

        if (user.FirstName == "Administrator") {
            document.getElementById("admin").style.visibility = "visibility";
           /* document.getElementById("view").style.visibility = "hidden";*/
        }
        else {
            document.getElementById("admin").style.visibility = "hidden";
        }
    }
    else {
        document.getElementById("signUp").style.visibility = "visibility";
        document.getElementById("login").style.visibility = "visibility";
        document.getElementById("exit").style.visibility = "hidden";
        document.getElementById("admin").style.visibility = "hidden";
        document.getElementById("view").style.visibility = "hidden";
    }
}