const fs = require('fs'); //文件管理模块
const gui = require("gui"); //视图模块
const html = gui.open("fs:res/index.html"); //加载视图
const origin = "./origin"; //源目录

html.onload = evt => {
    let e = fs.exists(origin); //检测源目录
    if(!e){
        console.log("源目录不存在");
    }else{
        let files = fs.readdir(origin); //读取所有行
        if(files.length > 0){
            files.forEach((file,index) => {
                    let content = fs.readLines(origin+"/"+file);
                    let lines = content[0].split("\n");
                    if(lines.length > 0){
                        html.postMessage(JSON.stringify({
                            file : file,
                            lines : lines
                        }));
                    }
                }
            );
        }else{
            console.log("源目录中无文件!")
        }
    }
}

html.wait();