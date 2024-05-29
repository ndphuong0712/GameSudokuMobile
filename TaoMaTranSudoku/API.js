var api = "https://645e6a9912e0a87ac0efd331.mockapi.io/users"
var API = (id,options)=>{
    let newapi = api + "/" +id
    return fetch(newapi,options)
        .then(function(res){
            return res.json()
        })
}
export default API