function myFunction(){
    
    var user = JSON.parse(localStorage.getItem('user'));
    let username=sessionStorage.getItem("username");
    var i
    let firstn,lastn,gender,address;
    
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
     
     firstn=document.getElementById("fname").value;
     lastnn=document.getElementById("lname").value;
     address=document.getElementById("address").value; 
    
    
    for (i = 0; i < user.length; i++) 
    {
        if(user[i].email == username) 
        {          
            user[i].fname=firstn;
            user[i].lname=lastn;
            user[i].address=address;
            user[i].gender=gender;
            break;
        }
        
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    alert("Record Updated")
    window.location.href = "Profile.html";
}