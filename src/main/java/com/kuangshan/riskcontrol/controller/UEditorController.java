package com.kuangshan.riskcontrol.controller;

import com.baidu.ueditor.ActionEnter;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *  百度编辑器控制类
 */
@Controller
@RequestMapping("static/ueditor")
public class UEditorController {

    @RequestMapping("/")
    public ModelAndView uediotr() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/ueditortest");
        return mv;
    }


    @RequestMapping("/controller")
    public void config(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json");
        String rootPath = request.getSession().getServletContext().getRealPath("/");
        try {
            String exec = new ActionEnter(request, rootPath).exec();
            PrintWriter writer = response.getWriter();
            writer.write(exec);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/save")
    @ResponseBody
    public String save(String editorValue) {
        System.out.println(editorValue);
        return editorValue;
    }


}
