const ex=require("express");
const {route}=require("express/lib/application");
const course = require("../models/course");
const Course=require("../models/course")
const {router, verifyToken} = require("../Authentication/Login");
const expressRouter=ex.Router();
// const logRoute=require("./Authentication/Login");
//for all course
expressRouter.get("/courses",async(req,res)=>{
    verifyToken(req,res);
    try{
        const courses=await Course.find();
        res.json(courses);
    }catch(err)
    {
        res.json(err);
    }
});
//for specific course
expressRouter.get("/courses/:courseID",async(req,res)=>{
    verifyToken(req,res);
    const courseID=req.params.courseID;
    console.log(courseID)
    try{
        const c=await Course.find({_id:courseID});
        res.status(200).json(c);
    }catch(err)
    {
        res.status(400).json({
            "message":err.message
        });
    }
});

//create course
expressRouter.post("/add_course",async(req,res)=>{
    verifyToken(req,res);
    const course=new Course(req.body);
    await course.save();
    res.json(Course);
})
//delete course based on courseID
expressRouter.delete("/delete/:courseID",async(req,res)=>{
    verifyToken(req,res);
    const courseID=req.params.courseID;
    if(courseID === null){
        res.status(400).json({
            "message":"Invalid Course ID"
        })
    }
    await Course.deleteOne(
        {
            _id: courseID
        }
    );
    res.status(200).json({
        "message":"Deleted successfully"
    });
})

//update course 
expressRouter.put("/update/:courseID",async(req,res)=>{
    verifyToken(req,res);
    let courseContent = req.body;
    const courseID=req.params.courseID;
    if(courseID === null){
        res.status(400).json({
            "message":"Invalid Course ID"
        })
    }
    if(courseContent === null){
        res.status(400).json({
            "message":"Invalid course object"
        })
    }
    let c= await Course.find({
        _id:courseID
    })
    courseContent=updatedDocument(courseContent,c);
    try{
        const query = {_id:courseID};
        console.log(courseContent)
        await Course.replaceOne(query,courseContent);
        res.status(200).send({
            "message":"Course updated successfully"
        })
    }catch(err){
        res.status(400).send({
            "message":"Invalid data provided"
        });
    }
})

function updatedDocument(courseContent, c){
    if(courseContent.title == null){
        courseContent.title = c[0].title;
    }
    if(courseContent.content == null){
        courseContent.content = c[0].content;
    }
    if(courseContent.videos == null){
        courseContent.videos = c[0].videos;
    }
    if(courseContent.active == null){
        courseContent.active = c[0].active;
    }
    return courseContent
}

module.exports=expressRouter;