import { Submission } from "../models/submission.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createSubmission = async(req,res) =>{
    try {
        const {hackathonId , teamId} = req.params
        const {Link} = req.body

        if(hackathonId ===""||teamId==="") return res.status(404).json({message:"Fill all the enteries"})
        
        const submissionCheck = await Submission.findById(teamId);

        if(submissionCheck) return res.status(409).json({message:"Submission already exists"})

        const bannerLocalPath = req.file.path;

            if(!bannerLocalPath){
                throw new Error("Please upload an banner");
            }
        
            const banner = await uploadOnCloudinary(bannerLocalPath)
        
            if(!banner.url){
                throw new Error("Error while uploading banner");
            }

        const submission = await Submission.create({
            hackathonId:hackathonId ,
            teamId:teamId ,
            submissionUrl:banner.url,
            gitUrl:Link
        })
        return res.status(200).json({message:"Submission created successfully",submission})

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSubmissions = async(req,res) =>{
    try {
        const {hackathonId} = req.params;
        const submissions = await Submission.find({hackathonId:hackathonId});
        if(!submissions) return res.status(404).json({message:"No submissions are done yet!"})

        return res.status(200).json({Submissions:submissions})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteSubmissions = async(req,res)=>{
    try {
        const {hackathonId} = req.params;
        await Submission.deleteMany({hackathonId:hackathonId});
        return res.status(200).json({message:"Submissions deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}