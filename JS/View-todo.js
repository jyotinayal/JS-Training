function loads()
{
    var username= sessionStorage.getItem("username")
    let usertodo = JSON.parse(localStorage.getItem('user-todo'));
    var i;
    var text="<table class='tab'><tr><th>Username</th><th>cdate</th><th>category</th><th>Mark as done</th><th>Public</th><th>reminder</th><th>reminder date</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            text+="<tr><td>"+ usertodo[i].username +"</td>"
            text+="<td>"+ usertodo[i].cdate +"</td>"
            text+="<td>"+ usertodo[i].catA +" ,"+ usertodo[i].catB +" ,"+ usertodo[i].catC +" </td>"
            text+="<td>"+ usertodo[i].isdone +"</td>"
            text+="<td>"+ usertodo[i].ispublic +"</td>"
            text+="<td>"+ usertodo[i].reminder +"</td>"
            text+="<td>"+ usertodo[i].rdate +"</td>"
             
        }
        
    }
    text+="</table>";
    // document.getElementById("listtodo").innerHTML=JSON.stringify(usertodo);
    document.getElementById("listtodo").innerHTML= text;
    
     console.log(usertodo);
}