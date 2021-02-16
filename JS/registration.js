if(!localStorage.getItem('user'))
{
    localStorage.setItem('user', JSON.stringify([]));
}
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
         let newUser1 = {
			fname : fname,
			lname : lname,
			email : email,
            gender : gender,
			address : address,
			password : password
			
		};
		let j = JSON.parse(localStorage.getItem('user'));
		j.push(newUser1);
		localStorage.setItem('user', JSON.stringify(j));   
        alert("Registration Successfull"); 
        window.location.href = "Login.html";
     }
}