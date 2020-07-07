const express = require("express");// TO use express we need to require this ;
const fs = require("fs");
const bodyParser = require('body-parser');
const { stringify } = require("querystring");
const app = express();
app.use(express.json());  //  This allows the express to use json format;
app.use(bodyParser.json()); //
 
const read =JSON.parse(fs.readFileSync("saral.json"));


//`1. This is first end point which will show the homepage and all the main courses availabe notes:-
app.get("/",(req,res)=>{
    var list1 = [];
    for (i of read){
        let dictt = {};
        dictt["id"]=i.id;
        dictt["name"]=i.name;
        dictt["description"]=i.description;
        list1.push(dictt);
    }
    res.send(list1);

});

// these are the post points 


// 9. post 
app.post("/hello",(req,res)=>{
    let duct = {
        "id" : req.body.id,
        "name" : req.body.name,
        "description-" : req.body.description,
    };
//stringify //  this method converts a JavaScript value (JSON object) to a JSON string representation
    read.push(duct);
    fs.writeFileSync('saral.json',JSON.stringify(read ,null,4));
    console.log("woriking it has been done");
    res.send("Working done!!!!!!!!!!!!!!!11")
});

// 10. post point for the subcourse;
app.post("/main/:id",(req,res)=>{
    let id_from  = req.params.id;
    

    for (i of read){
        var sub = i.id;
        if(!('submission' in i)){
            i.submission=[]
        };
        if (sub==id_from){
            let su = i.submission;
            var finaldict = {
                "id":req.params.id,
                "name": req.body.name,
                "description":req.body.description,
                "courseid":su.length+1
            };
            console.log(i.submission);
            i.submission.push(finaldict);
            
            for (j of su){


            };
        };
    }
    
    fs.writeFileSync('saral.json',JSON.stringify(read ,null,4));
    res.send("Wow! working:-  ");
});
//post point
// 11. This will allow you to add comments in the subcourse
app.post("/comm/:id/:cm",(req,res)=>{
    let idname = req.params.id;
    let cname = req.params.cm;
    for (i of read){
        let sub =i.submission;
        // console.log(sub);
        for (j of sub){
            if (idname==i.id & j.courseid==cname){
                if (!("usersummision" in j)){
                    j.usersummision=[];
                };
                console.log("Hurry!!");
                var dodki = {
                    "id":idname,
                    "courseid":cname,
                    "username":req.body.username,
                    "usersubmissions":req.body.usersubmissions
                };
                j.usersummision.push(dodki);
                console.log(j.usersummision);
                fs.writeFileSync("saral.json",JSON.stringify(read,null,4))
            };
        };
    };  
    res.send("yes over an out!");
});

// These are the points for put methods:--
//12. put method for updating main course:
app.put("/mainnn/:id",(req,res)=>{
    var id1 = req.params.id;
    for (i of read){
        if(i.id==id1){         
            i["name"] = req.body.name;
            i["description"] =  req.body.description;
            console.log(i.id,id1);
            console.log(i.name);
            console.log(i.description);
        }
    }
    fs.writeFileSync("saral.json",JSON.stringify(read,null,4));
    res.send("yes done !")
})

// 13. this will work for updating the subcourse by using put methods:-
app.put("/update_the_subcourse/:subid/:id",(req,res)=>{
    var subid = req.params.subid;
    var id1 = req.params.id;
    for (i of read){
        var sub = i.submission;
        for (j of sub){
            if(i.id==id1 & j.courseid==subid){
                j.name = req.body.name;
                j.description = req.body.description;
                console.log(i.id,j.courseid);
                console.log(j.name);
                console.log(j.description);
            }
        }
    }
    res.send("hurrrrry!!!!!!!!!!!!!!!!!            super!"); // This is just my response for the checking
})


// 14 . this will let you update the my comments whatever comments you want to make change
app.put("/update_comments/:id/:courseid/:user",(req,res)=>{
    var mainid = req.params.id;
    var courseid = req.params.courseid;
    var user = req.params.user;
    for (i of read){
        let sub  = i.submission;
        for (k of sub){
            let insie =  k.usersummision;
            for (j of insie){
                if (mainid == i.id & courseid == k.courseid & user == j.username){
                    
                    j.username = req.body.name;
                    j.usersubmissions = req.body.usersubmissions;
                    console.log(j.username,j.usersubmissions);
                    break;

                }
            }
        }
    }
    fs.writeFileSync("saral.json",JSON.stringify(read,null,4));
    res.send("Right working in a right way!!");
})

// 2. Second end point subcourse
app.get("/maincourseid",(req,res)=>{
    var list = [];
    for (i of read){
        let dub = i.submission;
        for (sub of dub){
            let dictt = {};
            dictt["id"]=sub.id;
            dictt["courseid"]=sub.courseid;
            dictt["name"]=sub.name;
            dictt["description"]=sub.description;
            list.push(dictt);
        };
    };
    res.send(list);
});

//3. Third is to show the full content whatever is there in the file
app.get("/comeplet",(req,res)=>{
    res.send(read);
});

//4. To show the  main coureses by id
app.get("/maincourse/:id/",(req,res)=>{
    let id_from_server = req.params.id;
    console.log(id_from_server);
    for (j of read){
        if (id_from_server==j.id){
            let dictt = {};
            dictt["id"]=j.id;
            dictt["name"]=j.name;
            dictt["description"]=j.description;
            res.send(dictt);
        };
    };
    
});

//5. To show the sub course by their id

app.get("/subcourse/:id/:id2/",(req,res)=>{
    var id = req.params.id;
    var id2 = req.params.id2;
    for(i of read){
        var sub = i.submission;
        for (j of sub){
            let id1 = j.id;
            let idd2 = j.courseid;

            // res.send("Done!");
            if ((id==id1) & (id2==idd2)){
                dictt = {};
                dictt["id"]=j.id;
                dictt["courseid"]=j.courseid;
                dictt["name"]=j.name;
                dictt["description"]=j.description;
                res.send(dictt);
            };
        };
    };
});

// 6. It will show all the comments :-
app.get("/comments",(req,res)=>{
    var list = [];
    for (sub of read){
        var subm = sub.submission;
        for (user of subm){
            var userr = user.usersummision;
            for (com of userr){
                var dictt = {};
                dictt["id"]=com.id;
                dictt["courseid"]=com.courseid;
                dictt["username"]=com.username;
                dictt["usersubmissions"]= com.usersubmissions;
                list.push(dictt);
            };
        };
    };
    res.send(list);
});

// // 7. This will show you the comments by the specific main couse id;

app.get("/comments/:id/",(req,res)=>{
    var idd = req.params.id;
    var ylist = [];
    for(i of read){
        var id1 = i.id;
        if (idd==id1){
            var sub = i.submission;
            for (j of sub){
                var user =j.usersummision
    
                for (d of user){
    
                    console.log("hello");
                    // console.log(d);
                    ylist.push(d);
                };
            };
            console.log(ylist);
            res.send(ylist); 
        };
  
    };

});

// 8.   This will show you the comments by the specific subcouse ic:
app.get("/comments/:id/:idd/",(req,res)=>{
    var id1 = req.params.id;
    var id2 = req.params.idd;
    var listt = [];
    for (i of read){
        var sub = i.submission;
        for (j of sub){
            var user = j.usersummision;
            var id11 = j.id;
            var id22 = j.courseid;
            if (id1==id11 & id2==id22){
                console.log(id11);
                console.log(id22);
                for (k of user){
                    console.log(k);
                    listt.push(k);
                };    
            };
            
        };
    };
    
    res.send(listt);
});



app.listen(8788,function(){
    console.log("Thanks it's woriking!");

});
