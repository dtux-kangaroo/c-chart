const path=require('path')
module.exports={
  bid:{
    pages:[
      {
        name:'pageSample',
        dest:'/Users/charlesyang/space/workspace/frontcode/product/pc-react-ant.design/src/webapp/pages',
        path:path.join(__dirname,'src/template/pages/pageSample'),
        prompts:[
          {
            type:'input',
            name:'pageSample',
            message:'确定创建 pageSample'
          }
        ]
      },
      {
        name:'pageReduce',
        path:path.join(__dirname,'src/template/pages/pageReduce'),
        prompts:[
          {
            type:'input',
            name:'pageReduce',
            message:'确定创建 pageReduce'
          }
        ]
      }
    ],
    components:[
      {
        name:'comSample',
        dest:"/Users/charlesyang/space/workspace/frontcode/product/pc-react-ant.design/src/webapp/components",
        path:path.join(__dirname,'src/template/components/comSample'),
        prompts:[
          {
            type:'input',
            name:'comSample',
            message:'确定创建 comSample'
          }
        ]
      }
    ]
  }
}
