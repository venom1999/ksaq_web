package com.kuangshan.riskcontrol.tool;


import java.io.BufferedWriter;  
import java.io.File;  
import java.io.FileNotFoundException;  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;  
import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.List;  
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.template.Configuration;  
import freemarker.template.Template;  
import freemarker.template.TemplateException;  
  
public class FreemarkerUtil {  
      
    private Configuration configuration = null;  

    public FreemarkerUtil(){  
        configuration = new Configuration();  
        configuration.setDefaultEncoding("UTF-8");  
    }  
      
    public static void main(String[] args) throws IOException {  
        FreemarkerUtil test = new FreemarkerUtil(); 
        Map<String,Object> dataMap=new HashMap<String,Object>();  
        test.createWord(dataMap, null, null);        
    }  
      
    public void createWord(Map<String, Object> dataMap1,HttpServletRequest request,HttpServletResponse response) throws IOException{
        String dir = request.getSession().getServletContext().getRealPath("/");
        Map<String,Object> dataMap=new HashMap<String,Object>();
        Configuration configuration = new Configuration();  
        configuration.setDefaultEncoding("utf-8");  
//        configuration.setDirectoryForTemplateLoading(new File(request.getRealPath("/")+"/templete"));//指定ftl所在目录,根据自己的改  
        response.setContentType("application/msword");     
        response.setHeader("Content-Disposition", "attachment;filename=\"" + new String(dataMap1.get("filename").toString().getBytes("GBK"), "iso8859-1") + "\"");
        response.setCharacterEncoding("utf-8");//此句非常关键,不然word文档全是乱码  
        PrintWriter out = response.getWriter(); 
        dataMap=dataMap1;
        configuration.setDirectoryForTemplateLoading(new File(dir+"ftl"));
        /*configuration.getTemplate("Base.ftl");*/
     //   configuration.setClassForTemplateLoading(this.getClass(), "/ftl");  //FTL文件所存在的位置
        System.out.println(dir);
        System.out.println(this.getClass());
        Template t=null;
        try {
//            t = configuration.getTemplate("wordModel.ftl"); //文件名
            t = configuration.getTemplate(dataMap1.get("ftlname").toString()); //文件名
        } catch (IOException e) {
            e.printStackTrace();  
        }
        

        
        
    /*    File outFile = new File("D:/outFilessa"+Math.random()*10000+".doc");
        Writer out1 = null;
        try {
            out1 = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile)));
        } catch (FileNotFoundException e1) {
            e1.printStackTrace();
        }*/
           
        try {  
            t.process(dataMap, out);
        } catch (TemplateException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  
  
    private void getData(Map<String, Object> dataMap) {  
//        dataMap.put("title", "标题说的太对了");  
//        dataMap.put("year", "2012");  
//        dataMap.put("month", "2");  
//        dataMap.put("day", "13");  
//        dataMap.put("auditor", "唐鑫");  
//        dataMap.put("phone", "13020265912");  
//        dataMap.put("weave", "占文涛");  
    	dataMap.put("username", "张三");  
        dataMap.put("sex", "男");  
//      dataMap.put("number", 1);  
//      dataMap.put("content", "内容"+2);  
          
//        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();  
//        for (int i = 0; i < 10; i++) {  
//            Map<String,Object> map = new HashMap<String,Object>();  
//            map.put("number", i);  
//            map.put("content", "内容"+i);  
//            list.add(map);  
//        }
//        dataMap.put("list", list);  
    }  
} 