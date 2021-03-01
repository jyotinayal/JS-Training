function loading(){
    if(sessionStorage.getItem("username"))
    { 
        window.location.href = "Profile.html";
    }
   
}

document.getElementById('pwd').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
           logincheck()
        }
    });

document.getElementById('uname').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
           logincheck()
        }
    });

function logincheck()
{
        var i;
        var x=true;
        var j=false;
        let un,pw;
        un=document.getElementById("uname").value;
        pw=document.getElementById("pwd").value;
        let pwd;
   
        if(un == null || un == "")
        {
            document.getElementById('uname_Err').innerHTML = "Username is madatory";
            x=false;
        }
        else{
            document.getElementById('uname_Err').innerHTML = ""
        }
        if(pw == null || pw=="")
        {
            document.getElementById('pw_Err').innerHTML = "Password is madatory";
            x=false;
        }
    else{
        document.getElementById('pw_Err').innerHTML = ""
    }
        if(x == true)
        {
            if(user= JSON.parse(localStorage.getItem('user')))
            {
                for (i = 0; i < user.length; i++) 
                {
                    pwd=crypt.decrypt(user[i].password);   
                    if(user[i].email == un && pwd == pw) 
                    { 
                        j=true;
                        sessionStorage.setItem("username",un);
                        window.location.href = "Profile.html";
                    }    
                }
                if(j==false)
                {document.getElementById('database-errorMsg').innerHTML="Incorrect Credentials"}
            }
            else
            {
                document.getElementById('database-errorMsg').innerHTML="Database Connection Error"
            }
        }
        else
        {
            return false;
        }
}
var crypt = {
  secret : "CIPHERKEY",
  encrypt : function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },
  decrypt : function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};