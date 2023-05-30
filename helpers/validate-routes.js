const collectionsAllowed =async(collection='',collections=[])=>{
    console.log("validando: ",collection)
    const existCollection=collections.includes(collection);
    
    if(!existCollection){
        throw new Error(`The collection: ${collection} , not allowed, ${collections}`)
    }
    return true
}


module.exports={
    collectionsAllowed
}