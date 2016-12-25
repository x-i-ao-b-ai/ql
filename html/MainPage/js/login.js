 function loginIn(){
        document.getElementById("modal-backdrop").style.cssText="opacity:0.75;display:block;";
        document.getElementById("login-in").style.cssText="opacity:1;display:block;";
}
function loginOut(){
    document.getElementById("modal-backdrop").style.cssText="opacity:0;display:none;";
    document.getElementById("login-in").style.cssText="opacity:0;display:none;";
}
 function registerIn(){
        document.getElementById("modal-backdrop").style.cssText="opacity:0.75;display:block;";
        document.getElementById("register-in").style.cssText="opacity:1;display:block;";
}
function registerOut(){
    document.getElementById("modal-backdrop").style.cssText="opacity:0;display:none;";
    document.getElementById("register-in").style.cssText="opacity:0;display:none;";
}