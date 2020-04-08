package com.kuangshan.riskcontrol.tool;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.StreamUtils;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.regex.Pattern;

public class RequestFilter implements Filter {
      public static Map<Integer,String> equipmentId=new HashMap<>();

//    public static void paramToMap(String paramStr,Map map) {
//        if(paramStr==null||paramStr.isEmpty()){
//            return;
//        }
//        Arrays.stream(paramStr.split("&")).forEach(val->{
//            String[] param = val.split("=");
//            String key = param[0];
//            String value = param[1];
//            if(!value.isEmpty()){
//                map.put(key, value);
//            }
//        });
//    }

    public static class ReplicateWrapper extends HttpServletRequestWrapper {

        //        private byte[] body;
//        private static String AES_KEY="";
//        private String bodyStr;
        private HttpServletRequest request;
//        private Charset charset;

//        public Map<String, String> getParams() {
//            return params;
//        }

        private boolean hasRead=false;

        private Map<String,String> params=new HashMap<>();

        public ReplicateWrapper(HttpServletRequest request) {
            super(request);
            this.request=request;

//            String charSetStr = request.getCharacterEncoding();
//            if (charSetStr == null) {
//                charSetStr = "UTF-8";
//            }
//            charset = Charset.forName(charSetStr);

//            Enumeration paramNames = request.getParameterNames();
//            while (paramNames.hasMoreElements()) {
//                String paramName = (String) paramNames.nextElement();
//                String paramValue=request.getParameter(paramName);
//                params.put(paramName,paramValue);
//            }
//            params.put("a","2");
//            bodyStr = StreamUtils.copyToString(request.getInputStream(), charset);
//            System.out.println("params:"+JSON.toJSONString(params));
//            System.out.println("bodyStr:"+bodyStr);
//            System.out.println("bodyStr:"+StreamUtils.copyToString(request.getInputStream(), charset));
//            try {
//                bodyStr = AES.Decrypt(getRequestBody(request),AES_KEY);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            if(StringUtils.isNotBlank(bodyStr)){
//                body = bodyStr.getBytes(StandardCharsets.UTF_8);
//            }else{
//                body=new byte[0];
//            }
        }

//        public String getBodyStr(){
//            return bodyStr;
//        }

//        @Override
//        public ServletRequest getRequest() {
//            return this.request;
//        }

        @Override
        public String getParameter(String name) {
            if(!hasRead){
                Enumeration paramNames = request.getParameterNames();
                while (paramNames.hasMoreElements()) {
                    String paramName = (String) paramNames.nextElement();
                    String paramValue=request.getParameter(paramName);
                    try {
                        params.put(paramName,xssFilter(AES.Decrypt(paramValue,AES.KEY)));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                hasRead=true;
            }
//            System.out.println("wrapper:"+params.get(name));
            return params.get(name);
        }

//        @Override
//        public BufferedReader getReader() throws IOException {
//            System.out.println("myReader:");
//            return new BufferedReader(new InputStreamReader(getInputStream(), getCharacterEncoding()));
//        }

//        public String getRequestBodyStr() throws IOException {
//            return StreamUtils.copyToString(request.getInputStream(), charset);
//        }

//        @Override
//        public ServletInputStream getInputStream() {
//            System.out.println("myInputStream:");
//            final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body);
//            return new ServletInputStream() {
//                public boolean isFinished() {
//                    return false;
//                }
//
//                public boolean isReady() {
//                    return false;
//                }
//
//                public void setReadListener(ReadListener readListener) {
//
//                }
//
//                @Override
//                public int read() {
//                    return byteArrayInputStream.read();
//                }
//            };
//        }
    }

    @Override
    public void init(FilterConfig filterConfig){

    }

//    public static boolean hasXssInParams(ReplicateWrapper request){
//        for (Map.Entry<String,String> entry:request.getParams().entrySet()){
//            if(pattern.matcher(entry.getValue()).find()){
//                return true;
//            }
//        }
//        return false;
//    }
//
//    private static String xssEncode(String s) {
//        if (s == null || s.isEmpty()) {
//            return s;
//        }
//        StringBuilder sb = new StringBuilder(s.length() + 16);
//        for (int i = 0; i < s.length(); i++) {
//            char c = s.charAt(i);
//            switch (c) {
//                case '>':
//                    sb.append('＞');// 全角大于号
//                    break;
//                case '<':
//                    sb.append('＜');// 全角小于号
//                    break;
//                case '\'':
//                    sb.append('‘');// 全角单引号
//                    break;
//                case '\"':
//                    sb.append('“');// 全角双引号
//                    break;
//                case '&':
//                    sb.append('＆');// 全角
//                    break;
//                case '\\':
//                    sb.append('＼');// 全角斜线
//                    break;
//                case '#':
//                    sb.append('＃');// 全角井号
//                    break;
//                case '(':
//                    sb.append('（');//
//                    break;
//                case ')':
//                    sb.append('）');//
//                    break;
//                default:
//                    sb.append(c);
//                    break;
//            }
//        }
//        return sb.toString();
//    }

    public static String xssFilter(String src){
        if(src==null){
            return null;
        }
        return src.replaceAll(pattern.pattern(),"");
    }

    public static boolean isFromMobile(HttpServletRequest request){
        return request.getHeader("User-Agent").contains("okhttp")||request.getHeader("User-Agent").contains("PostmanRuntime");
    }

    public static boolean isStaticResources(HttpServletRequest request){
        String servletPath=request.getServletPath();
        if(servletPath.contains(".")){
            String suffix=servletPath.substring(servletPath.lastIndexOf(".")+1);
            return !suffix.equals("html") && !suffix.equals("jsp");
        }
        return false;
    }
    public static boolean isSessionValid(HttpServletRequest request){
        HttpSession session=request.getSession();
        if(session==null){
            return false;
        }
        Enumeration enumeration =session.getAttributeNames();
        if(!enumeration.hasMoreElements()){
            return false;
        }
        while(enumeration.hasMoreElements()){
            String key=enumeration.nextElement().toString();
            if(session.getAttribute(key)==null){
                return false;
            }
        }
        return true;
    }
    public static boolean isFromAjax(HttpServletRequest request){
        return request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equals("XMLHttpRequest");
    }
    public static boolean isStartPages(HttpServletRequest request){
        String[] allowedURI={"","/","/login.jsp","/access_rejected.jsp","/404.jsp","/user_login"};
        String servletPath=request.getServletPath();
        return Arrays.asList(allowedURI).contains(servletPath);
    }

    private static Pattern pattern=Pattern.compile("<(script|iframe).*>.*</(script|iframe)>|javascript:|alert\\(.*\\)|confirm\\(.*\\)".replaceAll("<","%3C").replaceAll(">","%3E"));

    public static boolean hasXSSInURL(HttpServletRequest request){
        String url=request.getRequestURL()+"?"+request.getQueryString();
        return pattern.matcher(url).find();
    }

    public static boolean hasUeditor(HttpServletRequest request){
        return request.getRequestURL().toString().contains("ueditor");
    }

//    private static String getRequestBody(HttpServletRequest request) {
//        try {
//            BufferedReader reader = request.getReader();
//            StringBuilder sb = new StringBuilder();
//            String line;
//            while ((line = reader.readLine()) != null) {
//                sb.append(line);
//            }
//            return sb.toString();
//        } catch (IOException e) {
//            return "";
//        }
//    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response =(HttpServletResponse)servletResponse;

        System.out.println(new Date().toString()+" - "+request.getRequestURL());
        if (request.getQueryString() != null){
            filterChain.doFilter(request, response);
        }
        if(hasXSSInURL(request)){
            if(isFromMobile(request)||isFromAjax(request)){
                response.sendError(450);
            }else{
                response.sendRedirect(request.getContextPath()+"/access_rejected.jsp");
            }
            return;
        }
        if(isStaticResources(request)||isStartPages(request)){
            filterChain.doFilter(request,response);
            return;
        }else if(isFromMobile(request)){
            ReplicateWrapper _request=new ReplicateWrapper(request);
            filterChain.doFilter(_request,response);
        }
        else if(isSessionValid(request)){
            ReplicateWrapper _request=new ReplicateWrapper(request);
            filterChain.doFilter(_request,response);
        }else{
            if(isFromAjax(request)){
                response.sendError(450);
            }else{
                response.sendRedirect(request.getContextPath()+"/access_rejected.jsp");
            }
        }
    }

    @Override
    public void destroy() {

    }
}
