(function(){
     if(sessionStorage.getItem("username"))
    { 
        window.location.href = "Profile.html";
    }

})();
let res;
//registration operation
btninsert.onclick=function()
{
    let gender,email,fname,lname,address,password,enpw;  
    var x= true;
    var passw=  /^[A-Za-z]\w{7,14}$/;
    if (document.getElementById('male').checked) 
    {
        gender = document.getElementById('male').value;                     
    }
    else if (document.getElementById('female').checked) 
    {
         gender = document.getElementById('female').value;                 
    }
    else if (document.getElementById('other').checked) 
    {
        gender = document.getElementById('other').value; 
    }
   
     email=document.getElementById("email").value;
     fname=document.getElementById("fname").value;
     lname=document.getElementById("lname").value;
     address=document.getElementById("address").value; 
     password=document.getElementById("password").value;
    
    if(document.getElementById('male').checked == false && document.getElementById('female').checked == false && document.getElementById('other').checked == false )
        {
            document.getElementById("genderError").innerHTML ="*Select gender"
        }
     if(email==null || email=="")
     {
         document.getElementById("emailError").innerHTML = "*Email is madatory";
            x=false;
     }
     else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
         document.getElementById("emailError").innerHTML = "*Invalid email";
            x=false;
    }
    else{
        if(!localStorage.getItem('user'))
        {
            localStorage.setItem('user', JSON.stringify([]));
        }
        else{
            var user = JSON.parse(localStorage.getItem('user'));
            var i;
            for (i = 0; i < user.length; i++) 
            {
                    if(user[i].email==email) 
                    {
                        document.getElementById("emailError").innerHTML = "*Email already exists";
                        x=false;
                    }
            }   
        }
    }
    fname=fname.trim();
    lname=lname.trim();
    address=address.trim();
    password=password.trim();
     if (fname==null || fname=="")
     {  
        document.getElementById("fnameError").innerHTML = "*First name is madatory";
         x=false; 
     }
     else if(!isNaN(fname))
         {
        document.getElementById("fnameError").innerHTML = "*Enter alphabet only";
         x=false; 
         }
    else{
         document.getElementById("fnameError").innerHTML = ""   
    }
     if(lname==null || lname=="")
     {
         document.getElementById("lnameError").innerHTML = "*Last name is madatory";
         x=false;
     }
      else if(!isNaN(lname))
    {
        document.getElementById("lnameError").innerHTML = "*Enter alphabet only";
         x=false; 
    }
    else{
        document.getElementById("lnameError").innerHTML = ""
    }
     if(gender==null || gender=="")
     {
         document.getElementById("genderError").innerHTML = "*Gender is madatory";
         x=false;
     }
    else{
        document.getElementById("genderError").innerHTML = ""
    }
     if(address==null || address=="")
     {
         document.getElementById("addressError").innerHTML = "*Address is madatory";
         x=false;
     }
    else{
        document.getElementById("addressError").innerHTML = ""
    }
      if(password==null || password=="")
     {
         document.getElementById("passwordError").innerHTML = "*Password is madatory";
         x=false;
     }
   else if(password.length < 8)
       {
           document.getElementById("passwordError").innerHTML = "*Password is short,atleast 8 charachter Required";
         x=false;
       }
    else if(!(password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match( /[^a-zA-Z\d]/g) ))
        {
            document.getElementById("passwordError").innerHTML = "*Required 1 uppercase 1 lowercase 1 digit 1 special";
         x=false;
        }
    else{
         document.getElementById("passwordError").innerHTML = ""
    }
    
     if(x!= true)
        {
             return false;
        }
     else
     {
         
         password = crypt.encrypt(password);
         
         let newUser1 = {
			fname : fname,
			lname : lname,
			email : email,
            gender : gender,
			address : address,
			password : password,
             profileimg : res
			
		};
         console.log(newUser1);
		let j = JSON.parse(localStorage.getItem('user'));
		j.push(newUser1);
		localStorage.setItem('user', JSON.stringify(j));   
        alert("Registration Successfull"); 
        window.location.href = "Login.html";
     }
}


//Encrypt password    
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
//Convert image to base64
 function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            console.log(res);
        res = reader.result;
             //localStorage.setItem("imgbase64",res);
        }
        reader.readAsDataURL(file);
      }