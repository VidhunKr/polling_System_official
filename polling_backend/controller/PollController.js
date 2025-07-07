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

export const getPoll = async (req,res)=>{
  try{
    const polls = await pollModel.find() 
  }catch(err){
    res.status(400).json({msg:"Fetch polls Failed"})
  }
}

export const editPoll = async (req,res)=>{
   try{
    const poll =await pollModel.findById(req.params.id)
    // if(!poll) return res.status(400).json({msg:"poll not found"})
    //   if(new Date()> poll.expiresAt)
    //     return res.status(400).json({msg:"expired "})
    //   Object.assign(poll,req,body)
      await poll.save()
      res.json({msg:"poll updated ", poll})

   }catch(err){
return res.status(400).json({msg:"eroor editing poll"})
   }
}

export const deletePoll = async (req, res) => {
  try {
    const poll = await pollModel.findByIdAndDelete(req.params.id);
    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    res.json({ msg: "Poll deleted", poll });
  } catch (err) {
    return res.status(400).json({ msg: "Error deleting poll" });
  }
};
