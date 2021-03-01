let usertodo = JSON.parse(localStorage.getItem('user-todo'));
let username= sessionStorage.getItem("username");
(function(){
    if(username == undefined) 
    {
        window.location = "Login.html" ;       
    }
    if(!localStorage.getItem('user-todo'))
          {
                localStorage.setItem('user-todo', JSON.stringify([]));
          }
})();
let res;
let arr= []

//show/hide Reminder date on createTodo
function ShowHideDiv() {
        var chkYes = document.getElementById("chkYes");
        var RemDate = document.getElementById("RemDate");
        RemDate.style.visibility = chkYes.checked ? "visible" : "hidden";
}
//Function for printing table data
function tableShow(i){
    var text;
    let catArr = [];        
            text="<td>"+ usertodo[i].todoname +"</td>"
            text+="<td>"+ usertodo[i].cdate +"</td>"
                if(usertodo[i].catStudy != undefined)
                {
                    catArr.push(usertodo[i].catStudy);
                }
               
                if(usertodo[i].catSports != undefined)
                {
                     catArr.push(usertodo[i].catSports);
                }
               
                if(usertodo[i].catOther != undefined)
                {
                     catArr.push(usertodo[i].catOther);
                }
               text+="<td>"+ catArr.toString() +"</td>"
            text+="<td>"+ usertodo[i].isdone +"</td>"
            text+="<td>"+ usertodo[i].ispublic +"</td>"
            text+="<td>"+ usertodo[i].reminder +"</td>"
            text+="<td>"+ usertodo[i].rdate +"</td>" 
            text+="<td><img src="+usertodo[i].todoimg+" height='100px' width='150px'></td>"
    return text;
}
//hide all elements
function hideAllElements(){
	document.getElementById('cat').style.display = 'none';
    document.getElementById('datetofrom').style.display = 'none';
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
    if(cat == 'select')
        {
            viewLoads();
        }
    else{
        var i;
        var f=false;
        var text="<table class='tab'><tr><th>Task Name</th><th>Todo date</th><th>Category</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
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
}

//filter accoring to data range
function datetofrom(){
    
    document.getElementById('cat-list').style.display='block';
    var f= false;
    var tdate = document.getElementById("dateto").value;
    var fdate = document.getElementById("datefrom").value;
    if(tdate>fdate)
    {
        var i;
        var text="<table class='tab'><tr><th>Task Name</th><th>Todo date</th><th>Category</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
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
        if(f == true)
        {
            document.getElementById("cat-list").innerHTML= text;
        }
        else
        {
            document.getElementById("cat-list").innerHTML = "No Data Available";
        }
    }
    else
    {
        document.getElementById("cat-list").innerHTML = "From Date should be Greater than to date ";
    }
    document.getElementById('datefrom').value = 'YYYY-MM-DD' 
    document.getElementById('dateto').value = 'YYYY-MM-DD' 
}

//shows input types for filter
function byfilter(element){
   if (element.value == 'isDone') {
       hideAllElements();
       document.getElementById('cat-list').style.display='block';
        var i;
        var f=false;
        var text="<table class='tab'><tr><th>Task Name</th><th>Todo date</th><th>Category</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
        for (i = 0; i < usertodo.length; i++) {
            if(usertodo[i].username == username){   
                if(usertodo[i].isdone == 'yes'){
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
       document.getElementById("filter-box").value = 'select';
	}
	else if(element.value == 'categories'){
		hideAllElements();
        viewLoads();
		document.getElementById('cat').style.display = 'block';
        document.getElementById("filter-box").value = 'select';
	}
    else if(element.value == 'dateRange'){
        hideAllElements();
		document.getElementById('datetofrom').style.display = 'block';
        document.getElementById("filter-box").value = 'select';
	}
    else if(element.value == 'isPending'){
    
        hideAllElements();
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
    var text="<table class='tab'><tr><th>Task Name</th><th>Todo date</th><th>Category</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
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
        document.getElementById("filter-box").value = 'select';
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
            document.getElementById("search-box").value = 'select';
        }
    else if(element.value == 'search-tname'){
        document.getElementById('bytdate').style.display='none';
        document.getElementById('bytname').style.display='block';
        document.getElementById("search-box").value = 'select';
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
    td = tr[i].getElementsByTagName("td")[0];
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
    var text="<table class='tab'><tr><th>Task Name</th><th>Todo date</th><th>Category </th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
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
    document.getElementById('datesearch').value = 'YYYY-MM-DD'
   
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
    var text="<table class='tab' id='tab1'><tr><th>Task Name</th><th>Todo date</th><th>Category</th<th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th><th></th></tr>";
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
    if(usertodo[index].reminder == 'Yes')
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
    tname=document.getElementById('ctnameu').value;
    tname=tname.trim();
    if(tname == "" || tname== null)
    {
            document.getElementById('ctname_uErr').innerHTML="Name is mandatory"
            x=false;
    }
    else{
        document.getElementById('ctname_uErr').innerHTML=""
    }

    if(document.getElementById('cdateu').value == "")
        {
            document.getElementById('cdate_uErr').innerHTML="Date is mandatory"
            x=false;
        }
    else{
    cdate=document.getElementById('cdateu').value;
        document.getElementById('cdate_uErr').innerHTML=""
    }
    if (document.getElementById('dyesu').checked) 
    {
        done = document.getElementById('dyesu').value;                     
    }
    else if (document.getElementById('dyesu').checked) 
    {
        done = document.getElementById('dnou').value;                  
    }
    else{
        document.getElementById('done_uErr').innerHTML="Choose one option"
       
    }
    if (document.getElementById('pyesu').checked) 
    {
        ispublic = document.getElementById('pyesu').value;
        document.getElementById('public_uErr').innerHTML=""
    }
    else  if (document.getElementById('pnou').checked) 
    {
        ispublic = document.getElementById('pnou').value; 
        document.getElementById('public_uErr').innerHTML=""
    }
    else{
       document.getElementById('public_uErr').innerHTML="Choose one option"
    }
    
    if (document.getElementById('chYesu').checked) 
    {
        reminder = 'Yes';  
        rdate = document.getElementById('rdateu').value;
    }
    else  if (document.getElementById('chNou').checked)
    {
        reminder = 'No';                  
        rdate=null;
    }  
    if(document.getElementById('chYesu').checked == false && document.getElementById('chNou').checked==false)
        {
            document.getElementById('rem_uErr').innerHTML="Choose one option"
        }
    if(document.getElementById('chYesu').checked == true && document.getElementById('rdateu').value == "" )
        {
            document.getElementById('rdate_uErr').innerHTML="Choose reminder date"
        }
    
     if( document.getElementById('uimg').src=="" && document.getElementById('toimg').files.length == 0 )
     {
        document.getElementById('img_uErr').innerHTML="Image is mandatory"
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
     var text="<table class='tab'><tr><th></th><th>Task Name</th><th>Todo date</th><th>Category </th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
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
    var text="<table class='tab' id='tab1'><tr><th>Task Name</th><th>Todo date</th><th>Category</th><th>Mark as done</th><th>isPublic</th><th>Reminder</th><th>Reminder Date</th><th>Todo Image</th></tr>";
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

//Create todo Method
function addTodo()
{
    document.getElementById('cat-list').style.display='none'
    let cdate,catStudy,catSports,catOther,done,reminder,rdate,ispublic,tname,tid;
    var x = true;
    var ToDate = new Date();
    cdate=document.getElementById("cdate").value;
    tname=document.getElementById('todoName').value;
    tname=tname.trim();
    done="no";
    if(usertodo.length==0)
        {
            tid=1;
        }
    else{
            tid=parseInt(usertodo[usertodo.length-1].tid) + 1;
    }
    
    if(tname=="" || tname==null || tname.length < 2)
        {
            document.getElementById("todo-nameErr").innerHTML = "Todo Name is mandatory";
          x=false;
        }
    else{
         document.getElementById("todo-nameErr").innerHTML = ""
    }
    
     if(new Date(cdate).getTime() <= ToDate.getTime()) {
          document.getElementById("cdateErr").innerHTML = "*Invalid date";
          x=false;
     }
    else if(cdate == null || cdate==""){
            document.getElementById("cdateErr").innerHTML = "Date is Mandatory";
            x=false;
    }
    else{
         document.getElementById("cdateErr").innerHTML = ""
    }
    if (document.getElementById('pyes').checked) {
        ispublic = document.getElementById('pyes').value;
        document.getElementById("publicErr").innerHTML = ""
    }
    else if (document.getElementById('pno').checked) {
        ispublic = document.getElementById('pno').value;  
        document.getElementById("publicErr").innerHTML = ""
    }
    else{
        document.getElementById("publicErr").innerHTML = "IsPublic is Mandatory";
            x=false;
    }
    if (document.getElementById('chkYes').checked) {
        reminder = 'Yes';  
        rdate = document.getElementById("rdate").value;
    }
    else if (document.getElementById('chkNo').checked) {
        reminder ='No';                  
        rdate='NA';
    }
     if((document.getElementById('chkYes').checked == false) && (document.getElementById('chkNo').checked == false)){
         document.getElementById("remErr1").innerHTML = "Choose Reminder option";
         x=false;
     }
    else{
         document.getElementById("remErr1").innerHTML = ""
    }
    if(document.getElementById('chkYes').checked == true && document.getElementById("rdate").value == ""){
        document.getElementById("rdateErr").innerHTML = "Reminder Date is Mandatory";
        x=false;
    }
    else{
        document.getElementById("rdateErr").innerHTML = ""
    }
    if((document.getElementById('chkYes').checked== true) && (new Date(rdate).getTime() < ToDate.getTime() || new Date(rdate).getTime() > new Date(cdate).getTime() )) {
          document.getElementById("rdateErr").innerHTML = "*invalid date";
          x=false;
     }
    else{
        document.getElementById("rdateErr").innerHTML = ""
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
    else{
        document.getElementById("catErr").innerHTML = ""
    }
    if( document.getElementById('addimg').files.length == 0 ){
        document.getElementById("imgErr").innerHTML = "Attachment is mandatory";
            x=false;  
    }
    else{
        document.getElementById("imgErr").innerHTML = ""
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
                location.reload();
         }
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

//sorting by table index number
function sortTable(n) { 
                var table; 
                console.log(n)
                console.log(document.getElementById('table5'))
                table = document.getElementById("table5"); 
                var rows, i, x, y, count = 0; 
                var switching = true; 
  
                // Order is set as ascending 
                var direction = "ascending"; 
  
                // Run loop until no switching is needed 
                while (switching) { 
                    switching = false; 
                    var rows = table.rows; 
  
                    //Loop to go through all rows 
                    for (i = 1; i < (rows.length - 1); i++) { 
                        var Switch = false; 
  
                        // Fetch 2 elements that need to be compared 
                        x = rows[i].getElementsByTagName("TD")[n]; 
                        y = rows[i + 1].getElementsByTagName("TD")[n]; 
  
                        // Check the direction of order 
                        if (direction == "ascending") { 
  
                            // Check if 2 rows need to be switched 
                            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
                                { 
                                // If yes, mark Switch as needed and break loop 
                                Switch = true; 
                                break; 
                            } 
                        } else if (direction == "descending") { 
  
                            // Check direction 
                            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
                                { 
                                // If yes, mark Switch as needed and break loop 
                                Switch = true; 
                                break; 
                            } 
                        } 
                    } 
                    if (Switch) { 
                        // Function to switch rows and mark switch as completed 
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                        switching = true; 
  
                        // Increase count for each switch 
                        count++; 
                    } else { 
                        // Run while loop again for descending order 
                        if (count == 0 && direction == "ascending") { 
                            direction = "descending"; 
                            switching = true; 
                        } 
                    } 
                } 
            } 

//show sort in table
function sortTableShow(){
    hideAllElements();
   document.getElementById("cat-list").style.display= 'block';
    var i;
    var f=false;
    var text="<table class='tab' id='table5'><tr><th onclick='sortTable(0)'>Task Name<img src='Images/arrow.png' class='sort-arrow'></th><th onclick='sortTable(1)'>Todo date <img src='Images/arrow.png' class='sort-arrow'></th><th onclick='sortTable(2)'>Category<img src='Images/arrow.png' class='sort-arrow'></th><th onclick='sortTable(3)'>Mark as done<img src='Images/arrow.png' class='sort-arrow'></th><th onclick='sortTable(4)'>isPublic<img src='Images/arrow.png' class='sort-arrow'></th><th onclick='sortTable(5)'>Reminder<img src='Images/arrow.png' class='sort-arrow'></th><th onclick='sortTable(6)'>Reminder Date<img src='Images/arrow.png' class='sort-arrow'></th><th>Todo Image</th></tr>";
    for (i = 0; i < usertodo.length; i++) 
    {
        f = true;
        text+="<tr>"+tableShow(i)+"</tr>";
    }
    text+="</table>";
    if(f == true){
        document.getElementById("cat-list").innerHTML= text;
    }
    else{
        document.getElementById("cat-list").innerHTML = "No Data Available";
    }
            
}
