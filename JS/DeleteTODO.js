let usertodo = JSON.parse(localStorage.getItem('user-todo'));
let arr= [ ]
function loads()
{
    var username= sessionStorage.getItem("username")
    
    var i;
    var text="<table class='tab'><tr><th>Username</th><th>cdate</th><th>category</th><th>Mark as done</th><th>Public</th><th>reminder</th><th>reminder date</th><th></th></tr>";
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
            text+="<td><input type='checkbox' onclick='Deleteto("+i+")'  value='Delete'></td>"
        }
        
    }
    text+="</table>";
    document.getElementById("listtodo").innerHTML= text;
}
function Deleteto(i){
    if(arr.includes(i)) 
    { 
        arr.splice(arr.indexOf(i),1);
    }
    else 
    {
        arr.push(i);
    }
}
function Deleteall(){
    console.log(arr);
    console.log(usertodo);
    var i
    for (i = 0; i < arr.length; i++) 
    {
       usertodo.splice(arr[i],1);
    }
    localStorage.setItem("user-todo", JSON.stringify(usertodo));
    alert("Successfully Deleted"); 
    window.location.href = "View-todo.html";
}

