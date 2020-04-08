package com.kuangshan.riskcontrol.tool;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ReturnPost {
    public static void renderData(HttpServletResponse response, String data) {
        PrintWriter printWriter = null;
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html;charset=utf-8");
            response.setHeader("Content-type", "textml;charset=UTF-8");
            printWriter = response.getWriter();
            printWriter.print(data);
        } catch (IOException ex) {

        } finally {
            if (null != printWriter) {
                printWriter.flush();
                printWriter.close();
            }
        }
    }
}
