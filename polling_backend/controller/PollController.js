import { pollModel } from "../models/pollModel.js"


export const createPoll = async (req,res)=>{
     const {title, options,visibility, userAllowed, duration}=req.body
     if(duration>2) return res.status(400).json({msg:"Max duration 2 Hours "})

        const poll = new pollModel({
            title,
            options,
            votes:Array(options.length).fill(0),
            visibility,
            userAllowed,
            expiresAt:new Date(Date.now()+ duration * 60 * 60 * 1000)
        })
        await poll.save()
        res.status(200).json(poll)
        console.log("polls:",poll);
        
}
  

export const votePoll = async (req,res)=>{
    const poll = await pollModel.findById(req.params.id)
      const index = parseInt(req.params.index);

    if(!poll || new Date() > poll.expiresAt)
        return res.status(400).json({msg:"poll Expired "})

    if(poll.visibility === 'private' && ! poll.userAllowed.includes(req.user.id))
        return res.status(400).json({msg:"Not Allowed "})
      const i = parseInt(index);
  if (isNaN(i) || i < 0 || i >= poll.options.length)
    return res.status(400).json({ msg: "Invalid option index" })

   poll.votes[i] += 1;
    await poll.save()
    res.json(poll)
console.log("votedPolls",poll);

}


