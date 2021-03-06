let customerName = document.getElementById('customerName');
let customerId = 500200300;
let customerBalance = document.getElementById('customerBalance');

document.getElementById("show").addEventListener("click", (e) => {
    document.getElementById("form").classList.toggle("d-none");
    e.target.textContent == "show customers"
    ? e.target.textContent = "hide customers"
    : e.target.textContent = "show customers";
});
let customers=[];

localStorage.getItem("customer") == null? customers = [] : customers = JSON.parse(localStorage.getItem("customer")),display();

document.getElementById('addCustomer').addEventListener('click',()=> {
    if(customerName.value == '' || customerBalance.value==''){
        Array.from(document.querySelectorAll('.alert'))[0].style.display = 'block'
        Array.from(document.querySelectorAll('.alert'))[1].style.display = 'block'
        //to remove console error
        return 0
    }else if(!isNaN(customerName.value)){
        // to prevent numbers
        Array.from(document.querySelectorAll('.alert'))[0].style.display = 'block'
        // Array.from(document.querySelectorAll('.alert'))[0].innerHTML = 'name not contains numbers'
        //to remove console error
        return 0
    }else if(customerBalance.value<0){
        Array.from(document.querySelectorAll('.alert'))[1].style.display = 'block'
        //to remove console error
        return 0
    } else
        customer = {
            customerName: customerName.value,
            customerId: customerId + customers.length+1,
            customerBalance: customerBalance.value,
        }
        customers.push(customer)
        localStorage.setItem('customer',JSON.stringify(customers))
        display();
        //clear inputs
        clrInput()
    }
)
function display() {
    let content = ``
        for(let i=0; i<customers.length;i++){
        content += `
        <tr>
            <td>${i+1}</td>
            <td>${customers[i].customerName}</td>
            <td>${customers[i].customerId}</td>
            <td>${customers[i].customerBalance}</td>
            <td><button type="button" class="btn btn-warning" id="addBalance" onclick="addBalance(${i})"> Add Balance</button></td>
            <td><button type="button" class="btn btn-secondary" id="withDraw" onclick="withDraw(${i})"> Withdraw</button></td>
            <td><button type="button" class="btn btn-primary" id="edite" onclick="edite(${i})">Edite</button></td>
            <td><button type="button" class="btn btn-danger" id="delete" onclick="deleteCustomer(${i})"> Delete</button></td>
        </tr>
        `
    
    }
    console.log(content);
    document.getElementById('tBoody').innerHTML = content;
}
function clrInput(){
    customerName.value = ''
    customerBalance.value=''
}
// m4 henf3 a7taha bl dom 3shan el element lesa matcreatsh
function addBalance(index){
    customerName.value = customers[index].customerName 
    customerName.setAttribute("disabled", "");
    addedBalance = Number(customers[index].customerBalance) + Number(customerBalance.value)
    customers[index].customerBalance = addedBalance
    localStorage.setItem('customer',JSON.stringify(customers))
    customerBalance.value=''
    document.getElementById('addCustomer').setAttribute("disabled", "")
    display();
}
function withDraw(index){
    customerBalance.setAttribute('placeholder','Enter amount')
    customerName.value = customers[index].customerName 
    customerName.setAttribute("disabled",'');
    Number(customers[index].customerBalance) >= Number(customerBalance.value)?
    addedBalance = Number(customers[index].customerBalance) - Number(customerBalance.value): customerBalance.setAttribute('placeholder','not valid')
    customers[index].customerBalance = addedBalance
    localStorage.setItem('customer',JSON.stringify(customers))
    customerBalance.value=''
    document.getElementById('addCustomer').setAttribute("disabled", "")
    display();
}

function edite(index){
    document.getElementById('addCustomer').setAttribute("disabled", "")
    lastNamed =  customers[index].customerName
    customerName.value =  customers[index].customerName
    customerBalance.value = customers[index].customerBalance
    customerBalance.setAttribute("disabled",'');
    localStorage.setItem('customer',JSON.stringify(customers))
    display();

}
function deleteCustomer(index) {
    customers.splice(index,1)
    localStorage.setItem('customer',JSON.stringify(customers))
    display();
}