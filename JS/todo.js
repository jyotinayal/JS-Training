let usertodo = JSON.parse(localStorage.getItem('user-todo'));
let username= sessionStorage.getItem("username");
(function(){
    if(username == undefined) 
    {
        window.location = "Login.html" ;       
    }

})();
let res;
let arr= []
if(!localStorage.getItem('user-todo'))
{
    localStorage.setItem('user-todo', JSON.stringify([]));
}
//show/hide Reminder date on createTodo
function ShowHideDiv() {
        var chkYes = document.getElementById("chkYes");
        var RemDate = document.getElementById("RemDate");
        RemDate.style.visibility = chkYes.checked ? "visible" : "hidden";
}
//Function for printing table data
function tableShow(i){
    var text;
            text="<td>"+ usertodo[i].tid +"</td>"
            text+="<td>"+ usertodo[i].todoname +"</td>"
            text+="<td>"+ usertodo[i].cdate +"</td>"
                if(usertodo[i].catStudy == undefined)
                {
                    text+="<td> - </td>"
                }
                else
                {
                    text+="<td>"+ usertodo[i].catStudy +"</td>"
                }
                if(usertodo[i].catSports == undefined)
                {
                     text+="<td> - </td>"
                }
                else
                {
                text+="<td>"+ usertodo[i].catSports +"</td>"
                }
                if(usertodo[i].catOther == undefined)
                {
                     text+="<td> - </td>"
                }
                else{
                text+="<td>"+ usertodo[i].catOther +" </td>"
            }
            text+="<td>"+ usertodo[i].isdone +"</td>"
            text+="<td>"+ usertodo[i].ispublic +"</td>"
            text+="<td>"+ usertodo[i].reminder +"</td>"
            text+="<td>"+ usertodo[i].rdate +"</td>" 
            text+="<td><img src="+usertodo[i].todoimg+" height='100px' width='150px'></td>"
    return text;
}
//hide all elements
function hideAllElements(){
    document.getElementById('isdone').style.display = 'none';
	document.getElementById('cat').style.display = 'none';
    document.getElementById('datetofrom').style.display = 'none';
    document.getElementById('isPending').style.display = 'none';
    document.getElementById('createtodo').style.display = 'none';
    document.getElementById('viewtodo').style.display='none';
    document.getElementById('updatetodo').style.display= 'none';   
    document.getElementById('deletetodo').style.display='none';
    document.getElementById('searchtodo').style.display='none';
    document.getElementById('cat-list').style.display='none';
}

//filter data category wise
function byCat()
{
    document.getElementById('cat-list').style.display='block';
    let cat = document.getElementById("cat").value;
    var i;
    var f=false;
    var text="<table class='tab'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
       if(usertodo[i].username == username) 
        {   
            if(usertodo[i].catStudy == cat || usertodo[i].catSports == cat || usertodo[i].catOther == cat)
            {
                f=true;
               text+="<tr>"+tableShow(i)+"</tr>";
            }
        }
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//filter data by Status of work
function byStatus()
{
    document.getElementById('cat-list').style.display='block';
    let isdone = document.getElementById("isdone").value;
    var i;
    var f=false;
    var text="<table class='tab'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            if(usertodo[i].isdone == isdone)
            {
                f=true;
              text+="<tr>"+tableShow(i)+"</tr>";
            }
        }  
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//filter pending working
function isPending()
{
    document.getElementById('cat-list').style.display='block';
    var f=false;
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
    var i;
    var text="<table class='tab'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            if(usertodo[i].cdate > today && usertodo[i].isdone == "no")
            {
                f=true;
              text+="<tr>"+tableShow(i)+"</tr>";
            }
        }    
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}
//filter accoring to data range
function datetofrom(){
    document.getElementById('cat-list').style.display='block';
    var f= false;
    var tdate = document.getElementById("dateto").value;
    var fdate = document.getElementById("datefrom").value;
    var i;
     var text="<table class='tab'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            if(usertodo[i].cdate > fdate && usertodo[i].cdate < tdate)
            {
                f=true;
               text+="<tr>"+tableShow(i)+"</tr>";
            }
        } 
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//shows input types for filter
function byfilter(element){
   if (element.value == 'isDone') {
       hideAllElements();
		document.getElementById('isdone').style.display = 'block';
	}
	else if(element.value == 'categories'){
		hideAllElements();
		document.getElementById('cat').style.display = 'block';
	}
    else if(element.value == 'dateRange'){
        hideAllElements();
		document.getElementById('datetofrom').style.display = 'block';
	}
    else if(element.value == 'isPending'){
        hideAllElements();
		document.getElementById('isPending').style.display = 'block';
	}
}

//search utility function
function bysearch(element){
    hideAllElements();
    viewLoads();
    document.getElementById('searchtodo').style.display='block';
    if(element.value == 'tdate')
        {
            document.getElementById('bytdate').style.display='block';
            document.getElementById('bytname').style.display='none'
        }
    else if(element.value == 'search-tname'){
        document.getElementById('bytdate').style.display='none';
        document.getElementById('bytname').style.display='block';
    }
}

//search by task name
function searchName() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tab1");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

//search by task date 
function dateSearch(){
   var fdate = document.getElementById("datesearch").value; 
    var f=false;
    var i;
    var text="<table class='tab'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            if(usertodo[i].cdate == fdate)
            {
                f=true;
                 text+="<tr>"+tableShow(i)+"</tr>";
            }
        } 
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//shows create todo form
function CreateTodo(){
    hideAllElements();
    document.getElementById('createtodo').style.display='block';
}
//shows view todo Table
function ViewTodo(){
    hideAllElements();
    document.getElementById('viewtodo').style.display='block';
    viewLoads(); 
}

//show table for update record
function UpdateTodo(){
    hideAllElements();
    document.getElementById('updatetodo').style.display= 'block';
    document.getElementById('cat-list').style.display= 'block';
    document.getElementById('updatetodoRecord').style.display='none'
    var i;
    var f = false;
    var text="<table class='tab' id='tab1'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th><th></th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
       if(usertodo[i].username == username) 
        {   
            f=true;
            text+="<tr>"+tableShow(i);
            text+="<td><input type='submit' onclick='updateStoreIndex("+i+")' value='update'></td></tr>"
        }
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//stores index of element to be update and display update form
function updateStoreIndex(index)
{
    document.getElementById('updatetodoRecord').style.display='block';
    document.getElementById('cat-list').style.display='none';
    sessionStorage.setItem("indexUpdate",index);  
    document.getElementById('ctnameu').value=usertodo[index].todoname;
    document.getElementById('cdateu').value=usertodo[index].cdate;
    document.getElementById('uimg').src = usertodo[index].todoimg;
    if(usertodo[index].isdone == 'yes')
    {
        document.getElementById('dyesu').checked = true;
    }
    else 
    {
        document.getElementById('dnou').checked = true;
    }
    if(usertodo[index].ispublic == 'yes')
       {
            document.getElementById('pyesu').checked = true;
       }
    else
    {
        document.getElementById('pnou').checked = true
    }
    if(usertodo[index].reminder == 'on')
        {
            document.getElementById('chYesu').checked = true;
            RDate.style.visibility = 'visible';
            document.getElementById('rdateu').value = usertodo[index].rdate;
        }
    else
        {
            RDate.style.visibility = 'hidden';
            document.getElementById('chNou').checked = true;
        }
}

//show / hide reminder date for updateTodo
function ShowHideRDiv() {
        var chYes = document.getElementById("chYesu");
        var RDate = document.getElementById("RDate");
        RDate.style.visibility = chYes.checked ? "visible" : "hidden";
}

//update todo operation perform
function updateRecord(){
    let index = sessionStorage.getItem("indexUpdate");
   let cdate,catSports,catStudy,catOther,done,reminder,rdate,ispublic,tid,tname;
    var x= true;
    if(document.getElementById('ctnameu').value == "")
    {
            document.getElementById('ctname_uErr').innerHTML="Name is mandatory"
            x=false;
    }
    else{
    tname=document.getElementById('ctnameu').value;
    }
    if(document.getElementById('cdateu').value == "")
        {
            document.getElementById('cdate_uErr').innerHTML="Date is mandatory"
            x=false;
        }
    else{
    cdate=document.getElementById('cdateu').value;
    }
   
    if (document.getElementById('dyesu').checked) 
    {
        done = document.getElementById('dyesu').value;                     
    }
    else
    {
        done = document.getElementById('dnou').value;                  
    }
    
    
    if (document.getElementById('pyesu').checked) 
    {
        ispublic = document.getElementById('pyesu').value;                     
    }
    else  if (document.getElementById('pnou').checked) 
    {
        ispublic = document.getElementById('pnou').value;                  
    }
    else{
       document.getElementById('public_uErr').innerHTML="choose one option"
    }
    
    if (document.getElementById('chYesu').checked) 
    {
        reminder = document.getElementById('chYesu').value;  
        rdate = document.getElementById('rdateu').value;
    }
    else  if (document.getElementById('chNou').checked)
    {
        reminder = document.getElementById('chNou').value;                  
        rdate=null;
    }
    
    if(document.getElementById('chYesu').checked == false && document.getElementById('chNou').checked==false)
        {
            document.getElementById('rem_uErr').innerHTML="choose one option"
        }
    if(document.getElementById('chYesu').checked == true && document.getElementById('rdateu').value == "" )
        {
            document.getElementById('rdate_uErr').innerHTML="choose reminder date"
        }
    
     if( document.getElementById('uimg').src=="" && document.getElementById('toimg').files.length == 0 )
     {
        document.getElementById('img_uErr').innerHTML="image is mandatory"
    }
    else if(document.getElementById('uimg').src!="")
        {
            todoimg=usertodo[index].todoimg;
        }
    else if(document.getElementById('toimg').files.length == 1){
        todoimg=res;
    }
    
    catStudy=usertodo[index].catStudy;
    catSports=usertodo[index].catSports;
    catOther=usertodo[index].catOther;
    tid=usertodo[index].tid;
    if(x !=true){
        return false;
    }else
    {
        usertodo[index].tid=tid;
        usertodo[index].todoname=tname;
        usertodo[index].cdate = cdate;
        usertodo[index].catStudy = catStudy;
        usertodo[index].catSports = catSports;
        usertodo[index].catOther = catOther;
        usertodo[index].isdone = done;
        usertodo[index].reminder = reminder;
        usertodo[index].rdate = rdate;
        usertodo[index].ispublic = ispublic;
        usertodo[index].todoimg=todoimg;
        localStorage.setItem('user-todo', JSON.stringify(usertodo))
        location.reload();
    }    
}

//For delete element shows table
function DeleteTodo(){
    hideAllElements(); 
    document.getElementById('deletetodo').style.display='block';
    document.getElementById('cat-list').style.display='block';
    var i;
    var f= false;
     var text="<table class='tab'><tr><th></th><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            f=true;
            text+="<tr><td><input type='checkbox' onclick='Deleteto("+i+")'  value='Delete'></td>"
            text+=tableShow(i)+"</tr>";
        }
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//Stores index number of elements to be deleted
function Deleteto(i){
    if(arr.includes(usertodo[i].tid)) 
    { 
        console.log(arr)
        arr.splice(arr.indexOf(usertodo[i].tid),1);
    }
    else 
    {
     arr.push(usertodo[i].tid);
    }
}

//perform delete operations
function Deleteall(){
    var i,j
    console.log(arr)
    for (i = 0; i < arr.length; i++) 
    {
       for(j=0; j < usertodo.length;j++)
           {
               if(usertodo[j].tid == arr[i])
                   {
                       usertodo.splice(j,1);
                       break;
                   }
           }
    }
    localStorage.setItem("user-todo", JSON.stringify(usertodo));
    location.reload();
}

//show list of todo records(by default on page load)
function viewLoads(){   
   
    var i;
    var f= false;
    var text="<table class='tab' id='tab1'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        if(usertodo[i].username == username) 
        {   
            f = true;
           text+="<tr>"+tableShow(i)+"</tr>";
        }
    }
    text+="</table>";
    document.getElementById('cat-list').style.display='block';
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
}

//represents sort todo
function bysort(element){
    hideAllElements();
    document.getElementById('cat-list').style.display='block'
     var text="<table class='tab' id='tab1'><tr><th>tid</th><th>Task Name</th><th>Todo date</th><th>Category Study</th><th>Category Sports</th><th>Category Other</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
     for (i = 0; i < usertodo.length; i++) 
        {
            if(usertodo[i].username == username) 
            {   
                text+="<tr>"+tableShow(i)+"</tr>";
            }
        }
    text+="</table>";
    document.getElementById("cat-list").innerHTML= text;
    if (element.value == 'isDone'){     //sort by task status
        sortFunction(6);
    }
    else if(element.value == 'datewise'){
        sortFunction(2);                //sort date wise
    }
}

function sortFunction(index)
{
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tab1");
    switching = true;
    while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[index];
      y = rows[i + 1].getElementsByTagName("TD")[index];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//Create todo Method
function addTodo()
{
    document.getElementById('cat-list').style.display='none'
    let cdate,catStudy,catSports,catOther,done,reminder,rdate,ispublic,tname,tid;
    var x = true;
    var ToDate = new Date();
    cdate=document.getElementById("cdate").value;
    done="no";
    if(usertodo.length==0)
        {
            tid=1;
        }
    else{
            tid=parseInt(usertodo[usertodo.length-1].tid) + 1;
    }
    
    if(document.getElementById('todoName').value=="")
        {
            document.getElementById("todo-nameErr").innerHTML = "Todo Name is mandatory";
          x=false;
        }
    else{
        tname=document.getElementById('todoName').value;
    }
     if(new Date(cdate).getTime() <= ToDate.getTime()) {
          document.getElementById("cdateErr").innerHTML = "*invalid date";
          x=false;
     }
    else if(cdate == null || cdate==""){
            document.getElementById("cdateErr").innerHTML = "Date is Mandatory";
            x=false;
    }
    if (document.getElementById('pyes').checked) {
        ispublic = document.getElementById('pyes').value;                     
    }
    else if (document.getElementById('pno').checked) {
        ispublic = document.getElementById('pno').value;                  
    }
    else{
        document.getElementById("publicErr").innerHTML = "isPublic is Mandatory";
            x=false;
    }
    if (document.getElementById('chkYes').checked) {
        reminder = document.getElementById('chkYes').value;  
        rdate = document.getElementById("rdate").value;
    }
    else if (document.getElementById('chkNo').checked) {
        reminder = document.getElementById('chkNo').value;                  
        rdate=null;
    }
     if((document.getElementById('chkYes').checked == false) && (document.getElementById('chkNo').checked == false)){
         document.getElementById("remErr1").innerHTML = "Choose Reminder option";
         x=false;
     }
    if(document.getElementById('chkYes').checked == true && document.getElementById("rdate").value == ""){
        document.getElementById("rdateErr").innerHTML = "Reminder Date is Mandatory";
        x=false;
    }
    if((document.getElementById('chkYes').checked== true) && (new Date(rdate).getTime() < ToDate.getTime() || new Date(rdate).getTime() > new Date(cdate).getTime() )) {
          document.getElementById("rdateErr").innerHTML = "*invalid date";
          x=false;
     }
    if(document.getElementById("study").checked){
        catStudy = document.getElementById("study").value;
    }
    if(document.getElementById("sports").checked){
       catSports =document.getElementById("sports").value;
    }
    if(document.getElementById("other").checked){
        catOther =document.getElementById("other").value;
    }
    if(catStudy== undefined && catSports==undefined && catOther==undefined){
            document.getElementById("catErr").innerHTML = "One Category is Mandatory";
            x=false;   
        }
    if( document.getElementById('addimg').files.length == 0 ){
        document.getElementById("imgErr").innerHTML = "Attachment is mandatory";
            x=false;  
    }
     if(x!= true){
         return false;
        }
     else{  let todo = {
            tid : tid.toString(),
			username : username,
            todoname : tname,
            cdate : cdate,
            catStudy : catStudy,
            catSports : catSports,
            catOther : catOther,
            isdone : done,
            reminder : reminder,
            rdate : rdate,
            ispublic : ispublic,
            todoimg : res
		      };
		let j = JSON.parse(localStorage.getItem('user-todo'));
		j.push(todo);
		localStorage.setItem('user-todo', JSON.stringify(j));   
        location.reload();}
}

//imag to base64
function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
        res = reader.result;
             localStorage.setItem("imgbase64",res);}
        reader.readAsDataURL(file);
      }
function logout(){    
    sessionStorage.removeItem("username");
}