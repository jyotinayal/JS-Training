(function(){
     if(sessionStorage.getItem("username"))
    { 
        window.location.href = "Profile.html";
    }

})();
let res;
if(!localStorage.getItem('user'))
{
    localStorage.setItem('user', JSON.stringify([]));
}
//registration operation
btninsert.onclick=function()
{
    let gender,email,fname,lname,address,password,enpw;  
    var x= true;
    if (document.getElementById('male').checked) 
    {
        gender = document.getElementById('male').value;                     
    }
    else if (document.getElementById('female').checked) 
    {
         gender = document.getElementById('female').value;                 
    }
    else
    {
        gender = document.getElementById('other').value;                   
    }
     email=document.getElementById("email").value;
     fname=document.getElementById("fname").value;
     lname=document.getElementById("lname").value;
     address=document.getElementById("address").value; 
     password=document.getElementById("password").value;
    
    if(document.getElementById('male').checked == false || document.getElementById('female').checked == false || document.getElementById('other').checked == false )
        {
            document.getElementById("genderError").innerHTML ="*select gender"
        }
     if(email==null || email=="")
     {
         document.getElementById("emailError").innerHTML = "*email is madatory";
            x=false;
     }
     else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
         document.getElementById("emailError").innerHTML = "*Invalid email";
            x=false;
    }
    else
        {
            var user = JSON.parse(localStorage.getItem('user'));
            var i;
            for (i = 0; i < user.length; i++) 
            {
                    if(user[i].email==email) 
                    {
                        document.getElementById("emailError").innerHTML = "*email already exists";
                        x=false;
                    }
            }   
        }
    
     if (fname==null || fname=="")
     {  
        document.getElementById("fnameError").innerHTML = "*First name is madatory";
         x=false; 
     }
     else if(!isNaN(fname))
         {
        document.getElementById("fnameError").innerHTML = "*enter alphabet only";
         x=false; 
         }
     if(lname==null || lname=="")
     {
         document.getElementById("lnameError").innerHTML = "*Last name is madatory";
         x=false;
     }
      else if(!isNaN(lname))
    {
        document.getElementById("lnameError").innerHTML = "*enter alphabet only";
         x=false; 
    }
     if(gender==null || gender=="")
     {
         document.getElementById("genderError").innerHTML = "*Gender is madatory";
         x=false;
     }
     if(address==null || address=="")
     {
         document.getElementById("addressError").innerHTML = "*address is madatory";
         x=false;
     }
     if(password==null || password=="")
     {
         document.getElementById("passwordError").innerHTML = "*password is madatory";
         x=false;
     }
    else if(password.length<6)
        {
            document.getElementById("passwordError").innerHTML = "*password is short";
         x=false;
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