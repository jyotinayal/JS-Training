 if(!localStorage.getItem('user-todo'))
{
    localStorage.setItem('user-todo', JSON.stringify([]));
}
function ShowHideDiv() {
        var chkYes = document.getElementById("chkYes");
        var RemDate = document.getElementById("RemDate");
        RemDate.style.visibility = chkYes.checked ? "visible" : "hidden";
    }

function addTodo()
{
    let username= sessionStorage.getItem("username");
    let cdate,catA,catB,catC,done,reminder,rdate,ispublic;
    cdate=document.getElementById("cdate").value;
    
    if (document.getElementById('dyes').checked) 
    {
        done = document.getElementById('dyes').value;                     
    }
    else  
    {
        done = document.getElementById('dno').value;                  
    }
    
    if (document.getElementById('pyes').checked) 
    {
        ispublic = document.getElementById('pyes').value;                     
    }
    else  
    {
        ispublic = document.getElementById('pno').value;                  
    }
    
    if (document.getElementById('chkYes').checked) 
    {
        reminder = document.getElementById('chkYes').value;  
        rdate = document.getElementById("rdate").value;
    }
    else  
    {
        reminder = document.getElementById('chkNo').value;                  
        rdate=null;
    }
    
   
    if(document.getElementById("a").checked)
    {
        catA = document.getElementById("a").value;
    }
    if(document.getElementById("b").checked)
    {
       catB =document.getElementById("b").value;
    }
    if(document.getElementById("c").checked)
    {
        catC =document.getElementById("c").value;
    }
    
    let todo = {
			username : username,
            cdate : cdate,
            catA : catA,
            catB : catB,
            catC : catC,
            isdone : done,
            reminder : reminder,
            rdate : rdate,
            ispublic : ispublic
		};
		let j = JSON.parse(localStorage.getItem('user-todo'));
		j.push(todo);
		localStorage.setItem('user-todo', JSON.stringify(j));   
        alert("Successfully Created"); 
        window.location.href = "View-todo.html";
}