/*btn-login.onclick=function()
{
   /* var user = JSON.parse(localStorage.getItem('user'));
    var i;
    let un,pw;
    un=document.getElementById("uname").value;
    pw=document.getElementById("pwd").value;
    for (i = 0; i < user.length; i++) 
    {
        if(user[i].email == "abc@gmail.com" && user[i].password=="4567890rt") 
        {
            alert("login in")
        }
        else{
            alert("no")
        }
    }
    alert("hello");
}*/
function logincheck()
{
     var user = JSON.parse(localStorage.getItem('user'));
    var i;
    var j=false;
    let un,pw;
    un=document.getElementById("uname").value;
    pw=document.getElementById("pwd").value;
    
   
 /*   pw = crypt.encrypt(pw);
    console.log(crypt.decrypt(pw));
    console.log(pw)
   */ 
    for (i = 0; i < user.length; i++) 
    {
        if(user[i].email == un && user[i].password== pw) 
        {
            alert("Login Successfull"); 
            j=true;
            sessionStorage.setItem("username",un);
            window.location.href = "Profile.html";
        }
        
    }
    if(j==false)
        alert("incorrect credentials")
}
 /*  
var crypt = {
  // (B1) THE SECRET KEY
  secret : "CIPHERKEY",
 
  // (B2) ENCRYPT
  encrypt : function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },
 
  // (B3) DECRYPT
  decrypt : function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};
 */