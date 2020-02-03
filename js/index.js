window.addEventListener('DOMContentLoaded',function (){
    const submit = document.querySelector("[name='submit']")
    const search = document.querySelector("[name='search']")
    const nameUl = document.querySelector("#user-list")
    const repoUl = document.querySelector("#repos-list")

    function renderRepos (ele){
        let li = document.createElement("li")
        repoUl.appendChild(li)
        let repoName = document.createElement("h4")
        repoName.innerHTML = ele.name
        li.appendChild(repoName)
     }

    function renderUsers(element){
        let li = document.createElement("li")
        nameUl.appendChild(li)
        let caption = document.createElement("h4")
        caption.innerHTML = element.login
        li.appendChild(caption)

        let img = document.createElement("img")
        img.setAttribute("src",element.avatar_url)
        li.appendChild(img)

        li.addEventListener("click",()=>{
            let url = `https://api.github.com/users/${caption.innerText}/repos`
            fetch(url).then(e=>e.json()).then(arr => {
                repoUl.innerHTML = ""
                arr.forEach(element => renderRepos(element))})
        })
    }

    submit.addEventListener("click",function(e){
        e.preventDefault()
        let url = `https://api.github.com/search/users?q=${search.value}`
        fetch(url).then(e=>e.json()).then(obj => obj.items.forEach(element => renderUsers(element)))
    })
})