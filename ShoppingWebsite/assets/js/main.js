function Common(data){
    let html=''
    data.forEach(item => {
        let name=item.title.length>20?item.title.slice(0,20)+'...':item.title;
        let content=item.description.length>40?item.description.slice(0,40)+'...':item.description
        html+=`
        <div class="col-lg-3">
        <div class=${item.rating.rate>4.0 ? 'pro':' '}>
          <div class="card">
              <img src=${item.image} class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 data-id=${item.id} id="c-name"class="card-title">${name}</h5>
                  <p class="card-text text-secondary">${content}</p>
                  <p class="card-text" >${item.price} $</p>
                  <div class="d-flex justify-content-between align-items-center">
                      <p class=${item.rating.rate>4.0 ?'special':'secondary'}>${item.rating.rate}</p>
                      <i id="delBtn" class="bi bi-x-square"></i>
                  </div>
              </div>
            </div>
        </div>
      </div>
        `
    });
    document.querySelector('#products').innerHTML=html 
   
    let cards=document.querySelectorAll('#products .card');
    for (let card of cards) {
       let delBtn=card.querySelector('#delBtn')
       let c_id=card.querySelector('#c-name').getAttribute('data-id')
       delBtn.onclick=function(){
        fetch(`https://fakestoreapi.com/products/${c_id}`,{
            method:"DELETE"
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            card.parentElement.parentElement.remove()
        })
        .catch(error=>console.log(error))
       }
    }
    
}
function AllProducts(){
    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=>{
       Common(data)
    })
    .catch(error=>console.log(error))
}
AllProducts()
let input =document.querySelector('#First .form-control')
input.addEventListener('keyup',()=>{
    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=>{
        let available=document.querySelector('.available')
        let exist=data.filter(item=>item.title.toLowerCase().includes(input.value.toLowerCase()))
        if (exist.length===0) {
            document.querySelector('#show').classList.remove('d-none')
            available.classList.add('d-none')
        }else if(input.value.trim().length===0){
            available.classList.add('d-none')
        }
        else {
            document.querySelector('#show').classList.add('d-none')
            available.classList.remove('d-none')
            available.querySelector('#count').innerHTML=exist.length
            available.querySelector('#val').innerHTML=input.value
            Common(exist)
        }   
    })
    .catch(error=>console.log(error))
})
function AllCategories(){
    fetch('https://fakestoreapi.com/products/categories')
    .then(response=>response.json())
    .then(data=>{
        let html=''
        data.forEach(item=>{
            html+=`
                   <li><a class="dropdown-item" href="#">${item}</a></li>
                `
        })
        document.querySelector('#categories').innerHTML=html
        let categories=document.querySelectorAll('#categories .dropdown-item');
        categories.forEach(category=>{
            category.onclick=function(){
                fetch(`https://fakestoreapi.com/products/category/${this.innerHTML}`)
                .then(response=>response.json())
                .then(data=>{
                    Common(data)
                })
                .catch(error=>console.log(error))
            }
        })
  })
    .catch(error=>console.log(error))
}
AllCategories()
function SortProduct(){
   let sortBtn=document.querySelector('#sortBtn')
   sortBtn.addEventListener('click',()=>{
    let sortIcon=sortBtn.querySelector('i')
    if (sortIcon.className==='bi bi-sort-up') {
        fetch('https://fakestoreapi.com/products?sort=desc')
        .then(res=>res.json())
        .then(data=>{
            Common(data)
            sortBtn.querySelector('i').className='bi bi-sort-down'
        })
        .catch(error=>console.log(error))
    } else {
        fetch('https://fakestoreapi.com/products?sort=asc')
        .then(res=>res.json())
        .then(data=>{
            Common(data)
            sortBtn.querySelector('i').className='bi bi-sort-up'
        })
        .catch(error=>console.log(error))
    } 
   })
}

SortProduct()