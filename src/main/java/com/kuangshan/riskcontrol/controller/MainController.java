package com.kuangshan.riskcontrol.controller;

import com.aspose.slides.IField;
import com.kuangshan.riskcontrol.service.EmployeeService;
import com.kuangshan.riskcontrol.tool.*;
import net.sf.json.JSONArray;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.security.acl.LastOwnerException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static com.kuangshan.riskcontrol.tool.ReturnPost.renderData;

@Controller
public class MainController {
    @Resource
    EmployeeService es;
    private Map<String, Integer> errorCount = new HashMap();
    private Map<String, Long> errorTime = new HashMap();

    @RequestMapping(value = "/push-to-users", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pushToUser(String text, String userIDs) {
        List<String> users = new ArrayList<>(Arrays.asList(userIDs.split(",")));
        JiguangPush.push(users, null, text);
        Map<String, Object> data = new HashMap<>();
        data.put("status", "ok");
        return data;
    }

    @RequestMapping(value = "/android/check-update", method = RequestMethod.GET)
    @ResponseBody
//    public String checkUpdate(String versionNum,HttpServletRequest request){
//        boolean flag=false;
//        String projectPath=request.getServletContext().getRealPath("/");
//        File project=new File(projectPath);
//        String[] files = project.list((dir, name) -> name.endsWith(".apk"));
//        if (files!=null && files.length>0){
//            String newVersionNum=files[0].substring(files[0].indexOf("-")+1,files[0].lastIndexOf(".apk"));
//            String[] vList=versionNum.split("\\.");
//            String[] nvList=newVersionNum.split("\\.");
//            for (int i=0;i<nvList.length && i<vList.length;i++){
//                if(Integer.parseInt(nvList[i])>Integer.parseInt(vList[i])){
//                    flag=true;
//                    break;
//                }
//            }
//        }
//        return flag?files[0]:"";
//    }
    public Map<String, Object> checkUpdate(Integer versionCode) {
        Map<String, Object> map = new HashMap<>();
//        ResourceBundle bundle=ResourceBundle.getBundle("version");
//        Integer newVersionCode=Integer.parseInt(bundle.getString("android.version.code"));
//        if(versionCode<newVersionCode){
//            map.put("apkName",bundle.getString("android.apk.name"));
//            map.put("versionName",bundle.getString("android.version.detail"));
//            map.put("versionDetail",bundle.getString("android.version.detail"));
//        }
        Properties prop = new Properties();
        try {
            prop.load(new BufferedReader(new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("version.properties"), StandardCharsets.UTF_8)));
        } catch (IOException e) {
            System.out.println("安卓版本记录文件缺失。");
        }
        Integer newVersionCode = Integer.parseInt(prop.getProperty("android.version.code"));
        if (versionCode < newVersionCode) {
            map.put("apkName", prop.getProperty("android.apk.name"));
            map.put("versionName", prop.getProperty("android.version.name"));
            map.put("versionDetail", prop.getProperty("android.version.detail"));
        }
        return map;
    }

    @RequestMapping(value = "/supreme-institutions", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getSupremeInsts() {
        String sql = "SELECT * FROM InstitutionToChecktable_T";
        return DBUtils.query(sql).stream().map(val -> val.get("InsNum").toString()).collect(Collectors.toList());
    }

    @RequestMapping(value = "/push-to-institutions", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> pushToInstitution(String text, String userInstitutions) {
        List<String> insts = new ArrayList<>(Arrays.asList(userInstitutions.split(",")));
        JiguangPush.push(null, insts, text);
        Map<String, Object> data = new HashMap<>();
        data.put("status", "ok");
        return data;
    }

    @RequestMapping(value = "/users-n-institutions", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> update() {
        Map<String, Object> result = new HashMap<>();
        String sql1 = "select *,InstitutionCategoryNum as iCategoryNum from institution_t";
        String sql2 = "select * from userinfo_view";
        result.put("institutions", DBUtils.query(sql1));
        result.put("users", DBUtils.query(sql2));
        return result;
    }

    @RequestMapping("/user_login")
    @ResponseBody
    public Map<String, Object> Login(@RequestParam("userid") String userid, @RequestParam("password") String password, HttpSession session) throws Exception {
//    public Map<String, Object> Login(HttpServletRequest request, HttpSession session) throws  Exception {
//        String userid = request.getParameter("userid");
//        String password = request.getParameter("password");
//        String ipAddress = IpUtils.getIpAddr(request);
//        System.out.println("-----------------------------ip"+ipAddress);

        Map<String, Object> result = new HashMap<>();
        String key = "shirleyL";
        String _password = "";
        try {
//            _password = Crypt.DESEncrypt(password, key);
            _password = SHA1.encode(password);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("text", "服务器解析错误");
            return result;
        }
        DBo dbo = new DBo();
        session.setAttribute("UserID", userid);
        if (!userid.equals("admin")) {
            userid = dbo.getString("select EmployeeNum from employee_t where EmployeeID = '" + userid + "'", "EmployeeNum");
        }
        String userStatus = dbo.getString(
                "SELECT case when WebStatus " +
                        "is null  then '0'  " +
                        "when WebStatus ='' THEN '0' " +
                        "else WebStatus end as WebStatus " +
                        "from userinfo_t WHERE EmployeeNum ='" + userid + "'",
                "WebStatus");

        if (userStatus.equals("2")) {
            String LockedTime = dbo.getString("SELECT LockedTime from userinfo_t WHERE EmployeeNum ='" + userid + "'", "LockedTime");
            System.out.println(pare(LockedTime));
            String LockTime = dbo.getString("SELECT ParameterValue from parameter_t WHERE ParameterItem ='LockTime'", "ParameterValue");

            DecimalFormat df = new DecimalFormat("######0.00");
            System.out.println(df.format((float) (pare(getNowTime()) - pare(LockedTime)) / 3600000));

            if (df.format((float) (pare(getNowTime()) - pare(LockedTime)) / 3600000).compareTo(LockTime) < 0) {

                String remdTime = (df.format(Double.valueOf(LockTime) - (float) (pare(getNowTime()) - pare(LockedTime)) / 3600000));
                System.out.println(Double.valueOf(remdTime));
                result.put("text", "由于密码输入错误已超过三次，账号已被锁定,解锁剩余时间:" + (int) (Double.valueOf(remdTime) * 60) + "分钟");
                return result;
            }

            String sql = "UPDATE userinfo_t set WebStatus = '0' ,MobileStatus = '0', LockedTime = null   where EmployeeNum = '" + userid + "'";

            DBUtils.update(sql);

        }


        String sql = "select * from UserInfo_T where EmployeeNum='" + userid + "' collate Chinese_PRC_CS_AI and Password='" + _password + "'";
        List<Map<String, Object>> list = DBUtils.query(sql);
        if (list.size() > 0) {
            String userState = list.get(0).get("UserState").toString();
            if (userState.equals("1")) {
                String userRight = list.get(0).get("UserRight").toString();
                if (!userRight.equals("")) {
                    userRight = Crypt.DESDecrypt(userRight, key);
                }
                /*if (userid.equals("admin")) {
                    try {
                        //userRight = userRight;
                    } catch (Exception e) {
                        e.printStackTrace();
                        result.put("text", "服务器解析错误");
                        return result;
                    }
                }
                else
                {
                    String sql2 = "select * from RoleInfo_T, RoleUserInfo_T where RoleInfo_T.RoleID=RoleUserInfo_T.RoleID and RoleUserInfo_T.EmployeeNum='" + userid + "'";
                    List<Map<String, Object>> list2 = DBUtils.query(sql2);
                    String roleRight = "";
                    for (Map<String, Object> map : list2) {
                        String t = map.get("RoleRight").toString();
                        if (StringUtils.isNotBlank(t)) {
                            try {
                                t = Crypt.DESDecrypt(t, key);
                            } catch (Exception e) {
                                e.printStackTrace();
                                result.put("text", "服务器解析错误");
                                return result;
                            }
                            roleRight = roleRight + t ;
                        }
                    }
                    userRight = userRight + roleRight;
                }*/
                session.setAttribute("UserRight", userRight);
                session.setAttribute("UserNum", userid);
                session.setAttribute("UserName", list.get(0).get("EmployeeName").toString());
                //System.out.println(session.getAttribute("UserName"));
                String userInstitutionCategoryNum = "";
                String userInstitution = "";
                String userInstitutionName = "";
                if (userid.equals("admin") || userid.equals("kuang")) {
                    session.setAttribute("UserInstitution", "AHB");
                    session.setAttribute("UserInstitutionName", "安全管理部");
                    session.setAttribute("UserInstitutionCategoryNum", "3");
                    userInstitution = "AHB";
                    userInstitutionName = "安全管理部";
                    userInstitutionCategoryNum = "3";
                } else {
                    String sql4 = "select e.*,i.InstitutionName,i.InstitutionCategoryNum from Employee_t e left join institution_t i on e.InstitutionNum=i.InstitutionNum where EmployeeNum='" + userid + "'";
                    List<Map<String, Object>> list4 = DBUtils.query(sql4);
                    if (list4.size() > 0) {
                        userInstitution = list4.get(0).get("InstitutionNum").toString();
                        userInstitutionName = list4.get(0).get("InstitutionName").toString();
                        userInstitutionCategoryNum = list4.get(0).get("InstitutionCategoryNum").toString();
                    } else {
                        String sql5 = "select c.*,i.InstitutionName,i.InstitutionCategoryNum from ContractorEmployee_t c left join institution_t i on c.InstitutionNum=i.InstitutionNum where EmployeeNum='" + userid + "'";
                        List<Map<String, Object>> list5 = DBUtils.query(sql5);
                        if (list5.size() > 0) {
                            userInstitution = list5.get(0).get("InstitutionNum").toString();
                            userInstitutionName = list5.get(0).get("InstitutionName").toString();
                            userInstitutionCategoryNum = list5.get(0).get("InstitutionCategoryNum").toString();

                        } else {
                            errorHandle(userid);
                            result.put("text", "账号或密码错误");
                            return result;
                        }
                    }
                    session.setAttribute("UserInstitution", userInstitution);
                    session.setAttribute("UserInstitutionName", userInstitutionName);
                    session.setAttribute("UserInstitutionCategoryNum", userInstitutionCategoryNum);
                }

                long loginTimes = (long) (list.get(0).get("LoginTimes")) + 1;
                String loginTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                String sql3 = "update  UserInfo_T set LoginTimes='" + loginTimes + "', LoginTime='" + loginTime + "',LastLoginTime='" + loginTime + "',WebStatus ='1' where EmployeeNum='" + userid + "'";
                int isOnline = userOnline(userid, userStatus);
                if (isOnline == 2) {
                    result.put("text", "系统已达到最大登录人数");
                    return result;
                }
                if (isOnline == 0) {
                    result.put("text", "请勿重复登录");
                    return result;
                }
                if (DBUtils.update(sql3) > 0) {

                    result.put("status", "ok");
                    result.put("userRight", userRight);
                    result.put("userName", list.get(0).get("Employe" +
                            "eName").toString());
                    result.put("userInstitutionCategoryNum", userInstitutionCategoryNum);
                    result.put("userInstitution", userInstitution);
                    result.put("userInstitutionName", userInstitutionName);
                    result.put("userNum", userid);
//                    result.put("text", "成功");
                    return result;

                } else {
                    result.put("text", "数据更新错误");
                    return result;
                }
            } else {
                result.put("text", "用户无权限登录该系统，请联系管理员");
                return result;
            }
        } else {
            String sql7 = "select u.*,i.InstitutionName from USER_ASSESS_EXPERT_T u left join institution_t i on u.professorInstitution=i.InstitutionNum where professorID='" + userid + "' and professorPWD='" + _password + "'";
            List<Map<String, Object>> list7 = DBUtils.query(sql7);
            if (list7.size() > 0) {
                session.setAttribute("UserRight", "220200-1;220400-1");
                session.setAttribute("UserNum", userid);
                session.setAttribute("UserName", list.get(0).get("EmployeeName").toString());
                session.setAttribute("UserInstitution", list7.get(0).get("professorInstitution").toString());
                session.setAttribute("UserInstitutionName", list7.get(0).get("InstitutionName").toString());
            }
        }
        errorHandle(userid);
        result.put("text", "账号或密码错误");
        return result;
    }

    /**
     *前端每隔十分钟传一次
     * @param userNum
     * @param nowTime
     */
    @RequestMapping("/user_status")
    @ResponseBody
    public void status(@RequestParam("userNum") String userNum,
                       @RequestParam("nowTime") String nowTime) throws Exception {
        if (userNum != null && nowTime != null) {
            System.out.println(userNum+" "+nowTime);
            DBo dBo = new DBo();
            dBo.execute("UPDATE userinfo_t SET LoginTime = '" + nowTime + "' WHERE EmployeeNum = '" + userNum + "'");
        }
    }


    /**
     * 用户十分钟不操作传一次
     * @param userNum
     */
    @RequestMapping("/user_offline")
    @ResponseBody
    public void offline(@RequestParam("userNum") String userNum) throws Exception {
        if (userNum != null ) {
            DBo dBo = new DBo();
            dBo.execute("UPDATE userinfo_t SET WebStatus = '0' WHERE EmployeeNum = '" + userNum + "'");
        }
    }
    /**
     * 安卓退出登录
     * @param userNum
     */
    @RequestMapping("/android_offline")
    @ResponseBody
    public String androidOffline(@RequestParam("userid") String userNum) throws Exception {
        if (userNum != null ) {
            userNum=AES.Decrypt(userNum,"shirleyLshirleyL");
            String sql="UPDATE userinfo_t SET MobileStatus='0' WHERE EmployeeNum = '" + userNum + "'";
            DBUtils.update(sql);
        }
        return "OK";
    }
    private void errorHandle(String userid) {
        if (!errorCount.containsKey(userid)) {
            errorCount.put(userid, 1);
            errorTime.put(userid, pare(getNowTime()));
        } else {
            if (pare(getNowTime()) - errorTime.get(userid) < 600000) {
                //十分钟以内再错
                errorCount.put(userid, errorCount.get(userid) + 1);
            } else {
                errorCount.put(userid, 1);
            }
            errorTime.put(userid, pare(getNowTime()));
        }
        if (errorCount.get(userid) >= 3) {
            String sql = "UPDATE userinfo_t set WebStatus = '2', MobileStatus='2',LockedTime = '" + getNowTime() + "'  where EmployeeNum = '" + userid + "'";
            if (DBUtils.update(sql) > 0) {
                errorCount.remove(userid);
            }
        }
    }

    //String类型的日期转换成long毫秒
    public static long pare(String time) {
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long s = 0;
        try {
            s = sim.parse(time).getTime();
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s;
    }


    //获取当前的时间
    public static String getNowTime() {
        Date d = new Date();
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sim.format(d);
        return time;
    }

    /**
     * @param userId
     * @return 1登录成功 2登录失败(人数上限) 0同账号多设备登录
     */
    public int userOnline(String userId, String userStatus) throws Exception {
        System.out.println("---userStatus" + userStatus);
        System.out.println("---userStatus" + userStatus);
        DBo dbo = new DBo();

        int MaxOnlineUsers = (int) Double.parseDouble(dbo.getString("SELECT ParameterValue from parameter_t WHERE ParameterItem ='MaxOnlineUsers'", "ParameterValue"));
        int nowOnlineUsers = Integer.parseInt(dbo.getString("select count(*) as sum from (SELECT EmployeeNum FROM userinfo_t WHERE WebStatus = '1') A", "sum"));
        errorCount.remove(userId);
        if (nowOnlineUsers >= MaxOnlineUsers) {
            return 2;
        }

        if (userStatus.equals("1")) {
            String loginTime = dbo.getString("SELECT LoginTime FROM userinfo_t WHERE EmployeeNum = '" + userId + "'", "LoginTime");
            if (pare(getNowTime()) - pare(loginTime) <= 10 * 1000) {
                return 0;
            }
        }
        return 1;
    }


    @RequestMapping("get_userstate")
    @ResponseBody
    public Map<String, Object> a31(HttpSession session) {
        Map<String, Object> state = new HashMap<>();
        state.put("userID", session.getAttribute("UserNum"));
        state.put("userName", session.getAttribute("UserName"));
        state.put("userRight", session.getAttribute("UserRight"));
        state.put("userInstitution", session.getAttribute("UserInstitution"));
        state.put("userInstitutionName", session.getAttribute("UserInstitutionName"));
        Map<String, Object> result = new HashMap<>();
        result.put("state", state);
        return result;
    }

    @RequestMapping(value = "session/user", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> a32(HttpSession session) {

        Map<String, Object> user = new HashMap<>();
        user.put("userId", session.getAttribute("UserNum"));
        user.put("userName", session.getAttribute("UserName"));
        user.put("userRight", session.getAttribute("UserRight"));
        user.put("userInstitution", session.getAttribute("UserInstitution"));
        user.put("userInstitutionName", session.getAttribute("UserInstitutionName"));
        String sql = "SELECT i1.InstitutionNum inst1,i2.InstitutionNum inst2,i1.InstitutionCategoryNum level1,i2.InstitutionCategoryNum level2 from Employee_t e left join institution_t i1 on e.InstitutionNum=i1.InstitutionNum left join institution_t i2 on i1.InstitutionPrefix=i2.InstitutionNum where e.EmployeeNum=" + session.getAttribute("UserNum");
        Map<String, Object> map = DBUtils.getRecord(sql);
        user.put("inst1", map.get("inst1"));
        user.put("inst2", map.get("inst2"));
        user.put("level1", map.get("level1"));
        user.put("level2", map.get("level2"));

        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        return result;
    }

    @RequestMapping(value = "employee", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> a33(HttpSession session) {
        List<Map<String, Object>> list = es.getEmployees();
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    @RequestMapping(value = "institution", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> a39() {
        String sql = "select * from institution_t";
        List<Map<String, Object>> list = DBUtils.query(sql);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    @RequestMapping(value = "accident", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> a6() {
        String sql = "select DDItemID as accidentID,DDItemValue as accidentName from DataDictionary_T where DataDictionary_T.DDCategoryNum='AccidentCategoryNum' and DataDictionary_T.IsDelete = '否'";
        List<Map<String, Object>> list = DBUtils.query(sql);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    @RequestMapping("/FileDelete")
    public void FileDelete(HttpServletRequest request, HttpServletResponse response) {
        String _path = null;
        String realname = null;
        String allfilename = null;
        try {
            _path = URLDecoder.decode(request.getParameter("path"), "utf-8");
            realname = URLDecoder.decode(request.getParameter("realname"), "utf-8");
            allfilename = URLDecoder.decode(request.getParameter("allfilename"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String tablename = request.getParameter("tablename");
        String idname = request.getParameter("idname");
        String id = request.getParameter("id");
        String dir = request.getSession().getServletContext().getRealPath("/");
        String path = dir + "Files/" + _path;
        System.out.print(_path + " " + path + " " + realname);
        int i = FileManager.deleteFile(path, realname);
        if (i == 0 || i == 2) {
            if (StringUtils.isNotBlank(id)) {
                String sql = "update " + tablename + " set UploadFileName='" + allfilename + "' where " + idname + "=" + id;
                DBOperator dbOperator = new DBOperator(sql);
                if (dbOperator.executeUpdate() == 0) {
                    i = 3;
                }
            }
        }
        try {
            response.setContentType("charset=utf-8");
            response.getWriter().write(Integer.toString(i));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    @RequestMapping("/FileView")
    public ModelAndView FileView(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        String path = null;
        try {
            path = URLDecoder.decode(request.getParameter("path"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String tablename = request.getParameter("tablename");
        String idname = request.getParameter("idname");
        String id = request.getParameter("id");
        DBOperator dbOperator = new DBOperator("select UploadFileName from " + tablename + " where " + idname + "=" + id);
        String allfilename = dbOperator.getString("UploadFileName");

        Map<String, String>[] maps = null;
        if (StringUtils.isNotBlank(allfilename)) {
            String[] realnamelist = allfilename.split("[?]");
            maps = new HashMap[realnamelist.length];
            for (int i = 0; i < realnamelist.length; i++) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("realname", realnamelist[i]);
                map.put("uploadname", getUploadName(realnamelist[i]));
                maps[i] = map;
            }
        }

        mv.addObject("path", path);
        mv.addObject("filelist", maps);
        mv.setViewName("/CommonPages/FileView");
        return mv;
    }

    @RequestMapping("/FileDownload")
    public ModelAndView FileDownload(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView();
        String path = null;
        try {
            path = URLDecoder.decode(request.getParameter("path"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String tablename = request.getParameter("tablename");
        String idname = request.getParameter("idname");
        String id = request.getParameter("id");
        DBOperator dbOperator = new DBOperator("select UploadFileName from " + tablename + " where " + idname + "=" + id);
        String allfilename = dbOperator.getString("UploadFileName");

        Map<String, String>[] maps = null;
        if (StringUtils.isNotBlank(allfilename)) {
            String[] realnamelist = allfilename.split("[?]");
            maps = new HashMap[realnamelist.length];
            for (int i = 0; i < realnamelist.length; i++) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("realname", realnamelist[i]);
                map.put("uploadname", getUploadName(realnamelist[i]));
                maps[i] = map;
            }
        }

        mv.addObject("path", path);
        mv.addObject("filelist", maps);
        mv.setViewName("/CommonPages/FileDownload");
        return mv;
    }

    @RequestMapping("/FileSubmitDownload")
    public void FileSubmitDownload(HttpServletRequest request, HttpServletResponse response) {
        System.out.print("delete all success");
        String path = null;
        try {
            path = URLDecoder.decode(request.getParameter("path"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String dir = request.getSession().getServletContext().getRealPath("/");
        path = dir + "Files/" + path;
        String realname = request.getParameter("realname");
        try {
            response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(getUploadName(realname), "UTF-8"));
            File file = new File(path, realname);
            OutputStream ops = response.getOutputStream();
            FileInputStream fis = new FileInputStream(file);
            byte[] buffer = new byte[8192];
            int bytesRead = 0;
            while ((bytesRead = fis.read(buffer, 0, 8192)) != -1) {
                ops.write(buffer, 0, bytesRead);
            }
            ops.flush();
            ops.close();
            fis.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @RequestMapping("/FileSubmitView")
    public ModelAndView FileSubmitView(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mView = new ModelAndView();
        String _path = null;
        String realname = null;
        try {
            _path = URLDecoder.decode(request.getParameter("path"), "utf-8");
            realname = URLDecoder.decode(request.getParameter("realname"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        System.out.println("_path:" + _path);
        String dir = request.getSession().getServletContext().getRealPath("/");
        String path = dir + "Files/" + _path;
        System.out.println(path + " " + realname);

        int dot = realname.lastIndexOf(".");
        String leftname = realname.substring(0, dot);
        String ext = realname.substring(dot + 1).toLowerCase();
        String location = null;
        String showPage = null;
        try {
            switch (ext) {
                case "pdf":
                    location = "../../../Files/" + _path + "/" + realname;
                    showPage = "/CommonPages/PDFViewer";
                    break;
                case "ppt":
                case "pptx":
                    FileManager.PPT2Pdf_Office(path + "/" + realname, path + "/" + leftname + ".pdf");
                    location = "../../../Files/" + _path + "/" + leftname + ".pdf";
                    showPage = "/CommonPages/PDFViewer";
                    break;
                case "xls":
                case "xlsx":
                    //	FileManager.Xls2Pdf_Office(path+"/"+realname, path+"/"+leftname+".pdf");
                    location = "../../../Files/" + _path + "/" + leftname + ".pdf";
                    showPage = "/CommonPages/PDFViewer";
                    break;
                case "doc":
                case "docx":
                    FileManager.Doc2Pdf_Office(path + "/" + realname, path + "/" + leftname + ".pdf");
                    location = "../../../Files/" + _path + "/" + leftname + ".pdf";
                    showPage = "/CommonPages/PDFViewer";
                    break;
                case "txt":
                    FileManager.Txt2Pdf(path + "/" + realname, path + "/" + leftname + ".pdf");
                    location = "../../../Files/" + _path + "/" + leftname + ".pdf";
                    showPage = "/CommonPages/PDFViewer";
                    break;
                case "mp4":
                    location = "Files/" + _path + "/" + realname;
                    showPage = "/CommonPages/VideoShow";
                    break;
                case "gif":
                case "jpg":
                case "png":
                    location = "Files/" + _path + "/" + realname;
                    showPage = "/CommonPages/PicViewer";
                    break;
                default:
                    location = "";
                    showPage = "/CommonPages/PicViewer";

            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        mView.addObject("location", location);
        mView.setViewName(showPage);
        return mView;
    }


    @RequestMapping("/CheckSingleFile")
    public void CheckSingleFile(HttpServletRequest request, HttpServletResponse response) {

        String path = null;
        System.out.println(request.getParameter("path"));
        System.out.println(request.getParameter("tablename"));
        try {
            path = URLDecoder.decode(request.getParameter("path"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String tablename = request.getParameter("tablename");
        String idname = request.getParameter("idname");
        String id = request.getParameter("id");
        DBOperator dbOperator = new DBOperator("select UploadFileName from " + tablename + " where " + idname + "=" + id);
        String allfilename = dbOperator.getString("UploadFileName");
        System.out.println(allfilename);
        if (allfilename != null) {
            String[] filelist = allfilename.split("[?]");
            if (filelist.length == 1) {
                try {
                    System.out.println(filelist[0]);
                    response.getWriter().write(filelist[0]);
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }


    }

    @RequestMapping("/FileUpload")
    public void FileUpload(@RequestParam("filedata") MultipartFile file, HttpServletRequest request, HttpServletResponse response) {

        String path = null;
        try {
            path = URLDecoder.decode(request.getParameter("path"), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        // String basePath =
        // request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";

        String dir = request.getSession().getServletContext().getRealPath("/");
        path = dir + "Files/" + path;
        System.out.println(path);
        if (!file.isEmpty()) {
            String filename = file.getOriginalFilename();
            if (StringUtils.isNotBlank(filename)) {
                String realname = getRealName(filename);
                //realname=realname.replaceAll("/\\?|？/", "");
                File path_dir = new File(path);
                if (!path_dir.exists()) {
                    path_dir.mkdirs();
                }
                File uploadfile = new File(path, realname);
                try {
                    file.transferTo(uploadfile);
                    response.setContentType("charset=utf-8");
                    response.getWriter().write(realname);
                } catch (IllegalStateException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } // 开始上传

            }
        }

    }

    public String getRealName(String filename) {
        if (!StringUtils.isNotBlank(filename)) {
            return "";
        }
        int dot = filename.indexOf(".");
        int length = filename.length();
        return filename.substring(0, dot) + new SimpleDateFormat("yyMMddHHmmssSSS").format(new Date()) + filename.substring(dot, length);
    }

    public String getUploadName(String filename) {
        if (!StringUtils.isNotBlank(filename)) {
            return "";
        }
        int dot = filename.indexOf(".");
        int length = filename.length();
        return filename.substring(0, dot - 15) + filename.substring(dot, length);
    }

    @RequestMapping(value = "/MobileLogin", method = RequestMethod.POST)
    public void MobileLogin(@RequestParam(value = "userid", required = false, defaultValue = "") String userid,
                            @RequestParam(value = "password", required = false, defaultValue = "") String password, HttpServletRequest request, HttpServletResponse response) throws SQLException {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss:SSS");
        System.out.println("login start time:" + format.format(new Date()));
        String sql = "select count(*) as re from UserInfo_T where EmployeeNum='" + userid + "' collate Chinese_PRC_CS_AI and Password='" + password + "'";
        DBo dbop = new DBo();
        String re = dbop.getString(sql, "re");
        String result = "false";
        String userRight = "";
        userRight = dBo.getString("select UserRight from userinfo_t where EmployeeNum='" + userid + "'", "UserRight");
        //  String temp=   dBo.getString("select UserRight from userinfo_t where EmployeeNum='552528'","UserRight");
        String right = null;
        try {
            right = Crypt.DESDecrypt(userRight, "shirleyL");
        } catch (Exception e) {
            e.printStackTrace();
        }
        HashMap<String, String> map = new HashMap<>();
        for (String s : right.split(";")
        ) {
            if (s.contains("090100")) {
                map.put("090100", s.split("-")[s.split("-").length - 1]);
            }
            if (s.contains("090300")) {
                map.put("090300", s.split("-")[s.split("-").length - 1]);
            }
            if (s.contains("090400")) {
                map.put("090400", s.split("-")[s.split("-").length - 1]);
            }
            if (s.contains("090500")) {
                map.put("090500", s.split("-")[s.split("-").length - 1]);
            }
            if (s.contains("090700")) {
                map.put("090700", s.split("-")[s.split("-").length - 1]);
            }
            if (s.contains("090800")) {
                map.put("090800", s.split("-")[s.split("-").length - 1]);
            }

        }

        if (Integer.parseInt(re) == 1) {
            result = "true";
            userRight = "";
            userRight += map.get("090100") + ";";
            userRight += map.get("090300") + ";";
            userRight += map.get("090400") + ";";
            userRight += map.get("090500") + ";";
            userRight += map.get("090700") + ";";
            userRight += map.get("090800") + ";";
        }
        String num = dBo.getString("SELECT COUNT(*) as num from SignatureInfo_T where EmployeeNum =" + userid, "num");
        if (Integer.parseInt(num) > 0) {
            userRight += "1;";
        } else {
            userRight += "0;";
        }

        renderData(response, "{\"result\":\"" + result + "\",\"userRight\":\"" + userRight + "\"}");

        System.out.println("login end time:" + format.format(new Date()));
    }

    @RequestMapping(value = "/android-login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> a1(String userID, String password)throws Exception{
        Map<String,String> resultMap=new HashMap<>();
//        userID=userID.replace("\"","");
        String userstatus=(String)DBUtils.getColumn("select MobileStatus from userinfo_t where EmployeeNum='"+userID+"' collate Chinese_PRC_CS_AI","MobileStatus");
        System.out.println("用户状态    ==="+userstatus);
        Integer count = (Integer) DBUtils.getColumn("select count(*) as _count from UserInfo_T where EmployeeNum='" + userID + "' collate Chinese_PRC_CS_AI and Password='" + password + "'", "_count");
            if(userstatus!=null&&userstatus.equals("2")){  //账号锁定
                DBo dbo = new DBo();
                String LockedTime = dbo.getString("SELECT LockedTime from userinfo_t WHERE EmployeeNum ='" + userID + "'", "LockedTime");
                System.out.println(pare(LockedTime));
                String LockTime = dbo.getString("SELECT ParameterValue from parameter_t WHERE ParameterItem ='LockTime'", "ParameterValue");

                DecimalFormat df   = new DecimalFormat("######0.00");
                System.out.println(df.format((float) (pare(getNowTime()) - pare(LockedTime)) / 3600000));

                if (df.format((float) (pare(getNowTime()) - pare(LockedTime)) / 3600000).compareTo(LockTime) < 0) {

                    String remdTime = (df.format(Double.valueOf(LockTime) - (float) (pare(getNowTime()) - pare(LockedTime)) / 3600000));
                    System.out.println( Double.valueOf(remdTime));
                    resultMap.put("text", "由于密码输入错误已超过三次，账号已被锁定,解锁剩余时间:" + (int)(Double.valueOf(remdTime) * 60) + "分钟");
                    resultMap.put("result","locked");
                }else{//锁定时间过了
                    if(count>0) {//密码正确
                        resultMap.put("result", "ok");
                    }else {//密码错误
                        errorHandle(userID);
                        resultMap.put("result", "");
                    }
                    String sql = "UPDATE userinfo_t set MobileStatus = '0' , LockedTime = null   where EmployeeNum = '" + userID + "'";
                    DBUtils.update(sql);
                }
            }else {//未被锁定账号
                if(count>0) {//密码正确
                    String sql = "UPDATE userinfo_t set MobileStatus = '1' where EmployeeNum = '" + userID + "'";
                    DBUtils.update(sql);
                    resultMap.put("result", "ok");
                }else {//密码错误
                    errorHandle(userID);
                    resultMap.put("result", "");
                }
            }
        if(!resultMap.get("result").equals("ok")){
            errorHandle(userID);
            return resultMap;
        }else{
            String sql = "UPDATE userinfo_t set MobileStatus = '1' where EmployeeNum = '" + userID + "'";
            DBUtils.update(sql);
        }

        String userRight = (String) DBUtils.getColumn("select UserRight from userinfo_t where EmployeeNum='" + userID + "'", "UserRight");
        String right;
        try {
            right = Crypt.DESDecrypt(userRight, "shirleyL");
        } catch (Exception e) {
            e.printStackTrace();
            return resultMap;
        }
        List<String> moduleIDs = new ArrayList<>(Arrays.asList("090100", "090300", "090400", "090500", "050700", "050800"));
        HashMap<String, String> map = new HashMap<>();
        Arrays.stream(right.split(";")).forEach(val -> {
            moduleIDs.forEach(id -> {
                if (val.contains(id)) {
                    map.put(id, val.substring(val.indexOf("-") + 1));
                }
            });
        });
        userRight = moduleIDs.stream().map(val -> map.get(val) + ";").collect(Collectors.joining());
        userRight += "1;";
        count = (Integer)DBUtils.getColumn("SELECT COUNT(*) as _count from SignatureInfo_T where EmployeeNum ='" + userID+"'", "_count");
        userRight += count > 0 ? "1;" : "0;";
        resultMap.put("userRight", userRight);
        return resultMap;
    }


    private DBo dBo = new DBo();

    /**
     * 数据字典相关信息更新
     */
    @RequestMapping(value = "/MobileDatadictionary", method = RequestMethod.POST)
    public void MobileDatadictionary(HttpServletRequest request, HttpServletResponse response) throws SQLException {
        List<Map<String, Object>> taskList = dBo.executeQuery("select * from datadictionary_t WHERE DDCategoryNum in ('CompanyDangerTask','WorkShopDangerTask','CheckTableCategory','HiddenDangerCategory') and IsDelete='否'\t");
        JSONArray json = JSONArray.fromObject(taskList);
        System.out.println(json.toString());
        renderData(response, json.toString());
    }

    @RequestMapping(value = "/dictionaries", method = RequestMethod.GET)
    @ResponseBody
    public List<Map<String, Object>> getDictionaries(HttpServletRequest request, HttpServletResponse response) throws SQLException {
        String sql = "select * from datadictionary_t WHERE DDCategoryNum in ('CompanyDangerTask','WorkShopDangerTask','CheckTableCategory','HiddenDangerCategory') and IsDelete='否'";
        return DBUtils.query(sql);
    }


    //主界面 ————待办事宜  （待审批申请信息）
    @RequestMapping("/getApprovalList")
    @ResponseBody
    public Map<String, Object> getApprovalList(HttpSession session) throws SQLException {
        String username = session.getAttribute("UserNum").toString();
        DBOperator dbOperator = new DBOperator("");
        String sqlQuery = "select row_number() over(order by ApprovalID desc) as rn, * from DangerApproval_View where (Finished='0' or Finished='3') and ApproveInstitution='" + username + "'";

        Map[] approvalList = dbOperator.getQueryResult(sqlQuery, 1, 10, "");

        Map<String, Object> result = new HashMap<>();
        result.put("approvalList", approvalList);
        return result;

    }


}
