export const authorize =(roles)=> (req,res,next)=>{

    if(!roles.includes(req.user.role))
        return res.status(400).json({msg:"Access Denied"})
    next()

}

export const isAdmin = (req,res,next)=>{

    if(req.user || req.user.role !=='admin'){
        return res.status(400).json({msg:"Acess Denied, Admin Only"})
    }
    next()
}

export const isUser = (req,res,next)=>{

    if(req.user || req.user.role !=='user'){
        return res.status(400).json({msg:"Acess Denied, User Only"})
    }
    next()
}

