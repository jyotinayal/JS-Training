 let username = sessionStorage.getItem('username');
let usertodo = JSON.parse(localStorage.getItem('user-todo'));
let user = JSON.parse(localStorage.getItem('user'));
let count = 0;
(function(){
    if(username == undefined) 
    {
        window.location = "Login.html" ;       
    }
})();
function loads()
{
    
    var ttask = ""
    var rtask = ""
	let userObj={};
	let flag = false;
    var i;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    
	for (i = 0; i < user.length; i++) {
		if(user[i].email == username)
		{
            document.getElementById('Details').style.display = "block"; 
		      document.getElementById('pimg').src = user[i].profileimg;
		      document.getElementById('fn').textContent = user[i].fname;
		      document.getElementById('ln').textContent = user[i].lname;
		      document.getElementById('un').textContent = user[i].email;
		      document.getElementById('gen').textContent = user[i].gender;
		      document.getElementById('add').textContent = user[i].address;
			break;
		}
	}
	
    for(i=0; i<usertodo.length;i++)
    {
        if(username == usertodo[i].username)
            {
                if(today == usertodo[i].cdate)
                    {
                        count++;
                        ttask+=usertodo[i].tid+" "+usertodo[i].todoname+"<br>"
                    }
                if(today == usertodo[i].rdate)
                    {
                          count++;
                        rtask+=usertodo[i].tid+" "+usertodo[i].todoname+"<br>"
                    }
            }
    }
     document.getElementById('notification').style.display='none'
    if(count>0)
        {
            if(ttask == "")
                {
                    ttask="No Task"
                }
            if(rtask == "")
                {
                    ttask="No Task"
                }
            document.getElementById("notify").innerHTML = 'Today task :-  '+ttask;
            document.getElementById("notifyRem").innerHTML = 'Reminder for :- '+rtask;
            document.getElementById('count-notification').innerHTML=count;
        }
    else{
        document.getElementById('notification').style.display = 'none';
        document.getElementById('count-notification').innerHTML=count;
    }
}

function logout(){    
    sessionStorage.removeItem("username");
}
function showNotification(){
    if(count>0)
    document.getElementById('notification').style.display = 'block';
}