export const authorize =(roles)=> (req,res,next)=>{

    if(!roles.includes(req.user.role))
        return res.status(400).json({msg:"Access Denied"})
    next()

}