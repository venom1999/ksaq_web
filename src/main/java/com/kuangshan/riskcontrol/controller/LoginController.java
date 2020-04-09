package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.service.EmployeeService;
import com.kuangshan.riskcontrol.tool.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;


import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.kuangshan.riskcontrol.controller.MainController.getNowTime;
import static com.kuangshan.riskcontrol.controller.MainController.pare;

@Controller
@RequestMapping("/mobile/Login")
public class LoginController {
    @Resource
    EmployeeService es;
    private Map<String, Integer> errorCount = new HashMap();
    private Map<String, Long> errorTime = new HashMap();

    @RequestMapping(value="/test", method= RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> Login(@RequestParam("userID") String userID, @RequestParam("passWord")String passWord) throws Exception {
        Map<String, Object> result = new HashMap<>();
        String key = "shirleyL";
        String _password = "";

        try {
            _password = SHA1.encode(passWord);
        }catch (Exception e) {
            e.printStackTrace();
            result.put("text", "服务器解析错误");
            return result;
        }

        DBo dbo = new DBo();

        if (!userID.equals("admin")) {
            userID = dbo.getString("select EmployeeNum from employee_t where EmployeeID = '" + userID + "'", "EmployeeNum");
        }
        String userStatus = dbo.getString(
                "SELECT case when MobileStatus " +
                        "is null  then '0'  " +
                        "when MobileStatus ='' THEN '0' " +
                        "else MobileStatus end as MobileStatus " +
                        "from userinfo_t WHERE EmployeeNum ='" + userID + "'",
                "MobileStatus");

        if (userStatus.equals("2")) {
            String LockedTime = dbo.getString("SELECT LockedTime from userinfo_t WHERE EmployeeNum ='" + userID + "'", "LockedTime");
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

            String sql = "UPDATE userinfo_t set WebStatus = '0' ,MobileStatus = '0', LockedTime = null   where EmployeeNum = '" + userID + "'";

            DBUtils.update(sql);

        }
        String sql = "select * from UserInfo_T where EmployeeNum='" + userID + "' collate Chinese_PRC_CS_AI and Password='" + _password + "'";
        List<Map<String, Object>> list = DBUtils.query(sql);
        if (list.size() > 0) {
            String userState = list.get(0).get("UserState").toString();
            if (userState.equals("1")) {
                String userRight = list.get(0).get("UserRight").toString();
                if (!userRight.equals("")) {
                    userRight = Crypt.DESDecrypt(userRight, key);
                }
                String userInstitutionCategoryNum = "";
                String userInstitution = "";
                String userInstitutionName = "";
                String EmployeeId = "";
                if (userID.equals("admin") || userID.equals("kuang")) {
                    userInstitution = "AHB";
                    userInstitutionName = "安全管理部";
                    userInstitutionCategoryNum = "3";
                } else {
                    String sql4 = "select e.*,i.InstitutionName,i.InstitutionCategoryNum from Employee_t e left join institution_t i on e.InstitutionNum=i.InstitutionNum where EmployeeNum='" + userID + "'";
                    List<Map<String, Object>> list4 = DBUtils.query(sql4);
                    if (list4.size() > 0) {
                        userInstitution = list4.get(0).get("InstitutionNum").toString();
                        userInstitutionName = list4.get(0).get("InstitutionName").toString();
                        userInstitutionCategoryNum = list4.get(0).get("InstitutionCategoryNum").toString();
                        EmployeeId = list4.get(0).get("EmployeeID").toString();
                        System.out.println("用户id："+EmployeeId);
                    } else {
                        String sql5 = "select c.*,i.InstitutionName,i.InstitutionCategoryNum from ContractorEmployee_t c left join institution_t i on c.InstitutionNum=i.InstitutionNum where EmployeeNum='" + userID + "'";
                        List<Map<String, Object>> list5 = DBUtils.query(sql5);
                        if (list5.size() > 0) {
                            userInstitution = list5.get(0).get("InstitutionNum").toString();
                            userInstitutionName = list5.get(0).get("InstitutionName").toString();
                            userInstitutionCategoryNum = list5.get(0).get("InstitutionCategoryNum").toString();
                            EmployeeId = list5.get(0).get("EmployeeID").toString();
                            System.out.println("用户id："+EmployeeId);
                        } else {
                            errorHandle(userID);
                            result.put("text", "账号或密码错误");
                            return result;
                        }
                    }
                }
                long loginTimes = (long) (list.get(0).get("LoginTimes")) + 1;
                String loginTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
                String sql3 = "update  UserInfo_T set LoginTimes='" + loginTimes + "', LoginTime='" + loginTime + "',LastLoginTime='" + loginTime + "',MobileStatus ='1' where EmployeeNum='" + userID + "'";
                int isOnline = userOnline(userID, userStatus);
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
                    result.put("userNum", userID);
                    result.put("employeeId",EmployeeId);
                    System.out.println(EmployeeId);
                    result.put("text", "成功");
                    return result;
                } else {
                    result.put("text", "数据更新错误");
                    return result;
                }
            } else {
                result.put("text", "用户无权限登录该系统，请联系管理员");
                return result;
            }
        }
        errorHandle(userID);
        result.put("text", "账号或密码错误");
        return result;
    }

    public int userOnline(String userId, String userStatus) throws Exception {
        System.out.println("---userStatus" + userStatus);
        System.out.println("---userStatus" + userStatus);
        DBo dbo = new DBo();

        int MaxOnlineUsers = (int) Double.parseDouble(dbo.getString("SELECT ParameterValue from parameter_t WHERE ParameterItem ='MaxOnlineUsers'", "ParameterValue"));
        int nowOnlineUsers = Integer.parseInt(dbo.getString("select count(*) as sum from (SELECT EmployeeNum FROM userinfo_t WHERE MobileStatus = '1') A", "sum"));
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

    @RequestMapping("/getEduTime")
    @ResponseBody
    public Map<String,Object> getEduTime(@RequestParam("userId") String userId) throws SQLException {
        int tempCount = 0;
        DBo dbo = new DBo();
        String sql = "select total_time from online_edu_time_t where employee_num = "+userId;
        List<Map<String,Object>> temp = dbo.executeQuery(sql);
        for(int i = 0; i<temp.size(); i++){
            tempCount += (Integer)temp.get(i).get("total_time");
        }
        tempCount = tempCount/60;
        Map<String, Object> result = new HashMap<>();
        result.put("edu_time",tempCount);
        return result;
    }

    @RequestMapping("/getEduScore")
    @ResponseBody
    public Map<String,Object> getEduScore(@RequestParam("userId") String userId) throws SQLException {
        String sql1 = "select total_time,upload_file_name from online_edu_time_t where employee_Num = "+userId;
        String sql2 = "select upload_file_name,content_credit,min_learning_time from resource_content_t";
        int scoreCount = 0;
        DBo dbo = new DBo();
        List<Map<String,Object>> tempUserLearn = dbo.executeQuery(sql1);
        List<Map<String,Object>> tempResource = dbo.executeQuery(sql2);
        for(int i = 0; i<tempUserLearn.size(); i++){
            for (int j = 0; j<tempResource.size(); j++){
                if(tempUserLearn.get(i).get("upload_file_name").equals(tempResource.get(j).get("upload_file_name"))){
                    if((Integer)tempUserLearn.get(i).get("total_time")>(Integer)tempResource.get(j).get("min_learning_time")){
                        scoreCount += (Integer) tempResource.get(j).get("content_credit");
                    }
                }
            }
        }
        System.out.println(scoreCount);
        Map<String, Object> result = new HashMap<>();
        result.put("edu_score",scoreCount);
        return result;
    }

}
