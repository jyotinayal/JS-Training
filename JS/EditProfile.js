let res;
let username=sessionStorage.getItem("username");
let user = JSON.parse(localStorage.getItem('user'));
(function(){
    if(username == undefined) 
    {
        window.location = "Login.html" ;       
    }
    var i;
	for (i = 0; i < user.length; i++) {    //auto fill user Details
		if(user[i].email == username)
		{
            document.getElementById('fname').value = user[i].fname
            document.getElementById('lname').value = user[i].lname;
            document.getElementById('address').value = user[i].address;
            if(user[i].gender == 'female')
            {
                document.getElementById('female').checked = true;
            }
            else if(user[i].gender == 'male')
            {
                    document.getElementById('male').checked = true;
            }
            else{
                document.getElementById('other').checked = true;
            }
            document.getElementById('pic').src = user[i].profileimg;
		}
	}

})();
//Edit Profile 
function editProfile(){
    var i
    let firstn,lastn,gender,address;
    var x = true;
    if(document.getElementById("fname").value == ""  )
    {
        document.getElementById('fnameError').innerHTML="first name is mandatory"
        x= false;
    }
    if(document.getElementById("lname").value == "")
        {
           document.getElementById('lnameError').innerHTML="last name is mandatory";
            x= false;
        }
    if(document.getElementById("address").value == "")
        {
           document.getElementById('addressError').innerHTML="last name is mandatory" ;
            x= false;
        }
    if(document.getElementById("male").checked == false && document.getElementById("female").checked == false && document.getElementById("other").checked == false)
        {
           document.getElementById('genderError').innerHTML="gender is mandatory" ;
            x= false;
        }
    if(document.getElementById('epic').length == 0 && document.getElementById('pic').src == "")
    {
        document.getElementById('e_imgError').innerHTML="image is mandatory" ;
        x= false;
    }
    if(x!=true)
        {
            return false;
        }
    else{
    
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
     
    if(document.getElementById('epic').files.length == 0)
        {
            res=document.getElementById('pic').src;
        }
     firstn=document.getElementById("fname").value;
     lastn=document.getElementById("lname").value;
     address=document.getElementById("address").value; 
    
    
    for (i = 0; i < user.length; i++) 
    {
        if(user[i].email == username) 
        {          
            user[i].fname=firstn;
            user[i].lname=lastn;
            user[i].address=address;
            user[i].gender=gender;
            user[i].profileimg=res;
            break;
        }
        
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "Profile.html";
}
}
//image to base64
 function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
        res = reader.result;
             localStorage.setItem("imgbase64",res);
        }
        reader.readAsDataURL(file);
      }
function logout(){    
    sessionStorage.removeItem("username");
}
