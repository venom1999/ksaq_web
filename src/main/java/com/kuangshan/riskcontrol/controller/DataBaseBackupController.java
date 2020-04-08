package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.tool.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RequestMapping("SystemMaintenance")
@Controller
public class DataBaseBackupController {

    private DBo DBo = new DBo();                        // 工具类

    private String servletPath = "";                    // 服务器部署路径
    private String uploadDir = "";                      // 上传文件所在的文件夹路径
    private String backupDir = "";                   // 数据库文件备份后所在的文件夹

    private String databaseName = "";                   // 要进行还原和备份的数据库名字
    private String backupDirByUser = "";                   // 用户手动备份的文件夹

    private volatile Object autoBackup = new Object();         // 是否进行自动备份
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-hh"); // 转化为日月日时分秒

    private ScheduledExecutorService serviceT = null;
    private static boolean hasBackuped = false;         // 扫描一次后就不执行

    public DataBaseBackupController() {
        init();
    }

    @RequestMapping("/DataBaseBackup/page")
    public String page(HttpServletRequest request) {
        return "DataBaseBackup";
    }

    /**
     * 备份数据库并复制.bak到目标文件夹
     * @param backupName 备份数据库名
     * @param sql 备份sql
     */
    private void backupDatabase(String backupName, String sql) {

        // 如果sql操作为更新，返回false， 返回结果集为true
        try {
            DBo.execute(sql);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("数据库备份失败.......");
        }

        String proDir = uploadDir + "\\SystemMaintenance\\DataBaseBackup";
        File filepath = new File(proDir, "/ppsMD5.properties");
        if (!filepath.getParentFile().exists()) {
            filepath.getParentFile().mkdirs();//如果目录不存在，创建目录
        }

        String ppsDir = proDir + "/ppsMD5.properties";
        File file = new File(ppsDir);

        // 对备份的文件进行加密，并保存相关信息
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            FileInputStream fis = new FileInputStream(new File(backupDir + backupName));

            String md5AsHex = DigestUtils.md5DigestAsHex(fis);
            Properties pps = OperatePropertiesUtil.loadProperties(ppsDir);
            Map<String, String> keyMap = OperatePropertiesUtil.getMapByProperties(pps);

            if (!keyMap.containsKey(md5AsHex)) {
                OperatePropertiesUtil.addProperties(ppsDir, pps, md5AsHex, sdf.format(new Date()));
            }
            fis.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 自动备份zip
     * @param backupZipName 要备份的名字
     */
    private void backupZipAuto(String backupZipName) {

        File targetDir = new File(backupDirByUser);
        if (!targetDir.exists()) {
            targetDir.mkdirs();
        }

        String targetFile = backupDirByUser + backupZipName;
        try {
            CompressUtils.zip(uploadDir, targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 自动备份（项目启动后自动执行）
     */
    @PostConstruct
    public void autoBackup() {
        if(hasBackuped){
            return;
        }
        autoBackup = true;

        System.out.println("-------服务器根目录绝对地址：" + servletPath);

        serviceT = Executors.newSingleThreadScheduledExecutor();
        long initialDelayT = getSecondsNextEarlyMorning() + 7200;    // 开始时间
        long periodT = 1 * 24 * 60 * 60;                             // 每个多少时间执行 单位s

//        long initialDelayT = 0;    // 测试用
//        long periodT = 60;    // 测试用

        serviceT.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {

                synchronized (autoBackup) {

                    Date date = new Date();
                    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");

                    System.out.println("开始数据库备份了： " + sdf2.format(date));
                    String backupName = databaseName + sdf2.format(date) + ".bak";    // 备份数据库的文件名
                    String backupPath = backupDir + backupName;                // 具体的备份路径

                    String sql = "BACKUP DATABASE [" + databaseName + "] To DISK = N'" + backupPath +
                            "' WITH  NOFORMAT, INIT, NAME =  N'" + backupName + "', " +
                            "SKIP, NOREWIND, NOUNLOAD, STATS = 10";

                    backupDatabase(backupName, sql);


                    SimpleDateFormat sdf3 = new SimpleDateFormat("yyyyMMdd");
                    int today = Integer.parseInt(sdf3.format(date));

                    if (today % 2 == 0) {
                        String backupZipName = databaseName + "Auto0.zip";
                        backupZipAuto(backupZipName);
                        System.out.println("数据库备份完成： " + new Date());
                    } else {
                        String backupZipName = databaseName + "Auto1.zip";
                        backupZipAuto(backupZipName);
                        System.out.println("数据库备份完成： " + new Date());
                    }

                }
            }

        }, initialDelayT, periodT, TimeUnit.SECONDS);
        hasBackuped=true;
    }

    // 初始化变量
    private void init() {
        Properties pro  = new Properties();
        InputStreamReader isr = null;
        try {
            isr = new InputStreamReader(DataBaseBackupController.class.getClassLoader().getResourceAsStream("db.properties"), "UTF-8");
            pro.load(isr);

            // 初始化
            servletPath = pro.getProperty("servlet_path");    // 自动备份上传文件的目录
            uploadDir = servletPath + "\\upload";             // 上传文件所在文件夹
            backupDir = pro.getProperty("backup_dir");     // 数据库文件备份后所在的文件夹

            databaseName = pro.getProperty("database_name");  // 要进行还原和备份的数据库名字
            backupDirByUser = pro.getProperty("backupDir_ByUser");    //用户手动备份的文件夹
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 关闭自动备份
     */
    @PreDestroy
    public void closeAuto() {
//        service.shutdown();
        serviceT.shutdown();
    }

    /**
     * 到凌晨的秒数
     * @return 秒数
     */
    public Long getSecondsNextEarlyMorning() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, 1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return (cal.getTimeInMillis() - System.currentTimeMillis()) / 1000;
    }

    /**
     * 获取默认数据库备份文件的时间
     * @return
     */
    @RequestMapping("/DataBaseBackup/getBakTime")
    @ResponseBody
    public Map<String, Object> getBakTime() {
        Map<String, Object> res = new HashMap<>();
        File targetDir = new File(backupDir);
        if (!targetDir.exists()) {
            res.put("status", "error");
            res.put("msg", "请默认安装SQL SERVER的备份地址。");
            return res;
        }
        File[] baks = targetDir.listFiles();

        if (baks.length == 0) {
            res.put("status", "error");
            res.put("msg", "不存在数据库本备份文件，请按相关帮助文档操作。");
            return res;
        }

        // 获取备份的数据库所在的文件夹下的备份时间
        String regex = databaseName + "\\d{4}[-]\\d{1,2}[-]\\d{1,2}";
        Pattern pattern = Pattern.compile(regex);
        List<String> timeList = new ArrayList<>();

        for (File bak : baks) {
            Matcher matcher = pattern.matcher(bak.getName());
            if (matcher.find()) {
                timeList.add(matcher.group(0));
            }
        }

        res.put("timeList", timeList);
        res.put("status", "success");
        return res;
    }


    /**
     * 还原数据库
     * @return 是否成功
     */
    @RequestMapping("/DataBaseBackup/restoreByServer")
    @ResponseBody
    public String restoreByServer(@RequestParam("time") String time) {
//        String backupName = databaseName + time + ".bak";
        String backupName = time + ".bak";
        String backupPath = backupDir + backupName;
        System.out.println(backupPath);

        File backupFile = new File(backupPath);
        if (!backupFile.exists()) {
            return "error";
        }

        String sql = "ALTER DATABASE ["+ databaseName + "] SET offline WITH ROLLBACK IMMEDIATE\n" +
                "RESTORE DATABASE [" + databaseName + "] FROM  " +
                "DISK = N'"+ backupPath + "'" +
                "WITH  FILE = 1,  NOUNLOAD,  STATS = 5" +
                "ALTER DATABASE [" + databaseName + "] SET online WITH ROLLBACK IMMEDIATE";

        try {
            DBo.execute(sql);
        } catch (Exception e) {
            System.out.println("还原失败......");
            e.printStackTrace();
            return "error";
        }
        return "success";
    }


    /**
     * 恢复upload（不删除原本的）
     */
    @RequestMapping("/DataBaseBackup/restoreUpload")
    @ResponseBody
    private String restoreUpload(@RequestParam("resUpTime") String resUpTime) {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        int today = Integer.parseInt(sdf.format(date));

        String num = (today % 2 == 0)? "0" : "1";
        if (resUpTime.equals("1")) {
            resUpTime = num;
        } else {
            resUpTime = "0".equals(num)? "1" : "0";
        }
        String zipFileName = backupDirByUser + databaseName + "Auto" + resUpTime +".zip";       // 需要要还原的压缩包文件
        File zip = new File(zipFileName);
        if (!zip.exists()) {
            return "error";
        }

        try {
            CompressUtils.unzip(zipFileName.replace("\\", "/"), uploadDir);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "success";
    }





//    private String fileDir = "";                         // 备份压缩后的完整路径
//    private String srcDir = "";                          // 要压缩的文件夹路径
//    private String rootDir = "";                         // 压缩包保存的路径

//    private ScheduledExecutorService service = null;
//    private double[] progress = new double[] {0.0};     // 压缩进度条 2019.11.15 弃用
//    private Map<String, String> proMap = new HashMap(); // 实时进度条返回的数据 2019.11.15 弃用

    // 将.bak放入upload中 2019.11.17弃用
//        try {
//            FileIO.copySignPhoto((backupDir + backupName).replace("\\", "/"),
//                    srcDir + "/" + backupName);
//        } catch (Exception e) {
//            System.out.println("复制文件失败.......");
//            e.printStackTrace();
//        }


    /**
     * 下载备份压缩包
     * @param response 返回
     * @param filePath 文件路径
     * @param fileName 文件名
     * @throws Exception 处理异常
     * 2019.11.15弃用
     */
//    @RequestMapping("/DataBaseBackup/downloadBackup")
//    public void downloadBackup(
//            HttpServletResponse response,
//            @RequestParam("filePath") String filePath,
//            @RequestParam("fileName") String fileName
//    ) throws Exception {
//        FileIO.downloadFile(response, filePath, fileName);
//    }

    /**
     * 手动备份
     * @return 对应的备份方式
     * @throws Exception 异常处理
     * 2019.11.15 弃用
     */
//    @RequestMapping("/DataBaseBackup/backup")
//    @ResponseBody
//    public Map<String, String> backupByUser(
//            @RequestParam("seek") String seek
//    ) {
//        Date date = new Date();
//
//        String backupName = databaseName + sdf.format(date) + ".bak";                // 备份数据库的文件名
//        String backupPath = backupFolder + backupName;                  // 具体的备份路径
//
//        synchronized (autoBackup) {
//            String sql = "BACKUP DATABASE [" + databaseName + "] To DISK = N'" + backupPath +
//                    "' WITH NOFORMAT, INIT, NAME =  N'" + backupName + "', " +
//                    "SKIP, NOREWIND, NOUNLOAD, STATS = 10";
//            backupDatabase(backupName, sql);
//
//            String backupZipName = databaseName + sdf.format(date) +".zip";    // 备份的zip名
//            backupZip(backupZipName);
//
//            File delFile = new File(srcDir + "/" + backupName);
//            if (delFile.exists()) {
//                delFile.delete();
//            }
//
//            File targetFile = new File(fileDir);
//            Map<String, String> result = new HashMap<>();
//            if (targetFile.length() < (1024 * 1024 * 1024)) {
//                progress[0] = 0.0;
//                result.put("state", "1");
//                result.put("filePath", rootDir);
//                result.put("fileName", backupZipName);
//                result.put(seek, "100");
//                return result;
//            } else {
//                progress[0] = 0.0;
//                result.put("state", "2");
//                result.put(seek, "100");
//                return result;
//            }
//        }
//
//    }

    /**
     * 上传数据库备份文件
     * @param request 请求
     * @param file 文件
     * @return 空
     * 2019.11.15 弃用
     */
//    @RequestMapping("/DataBaseBackup/upload")
//    @ResponseBody
//    public String upload(
//            HttpServletRequest request,
//            @RequestParam("file") MultipartFile file
//    ) {
//        try {
//            request.setCharacterEncoding("utf-8");
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//
//        // 直接将文件传到sql server默认备份数据库的地方
//        String fileName = file.getOriginalFilename();
//        try {
//            File targetFle = new File(backupFolder + fileName);
//            //把文件写入目标文件地址
//            file.transferTo(targetFle);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//
//        return "";
//    }

    /**
     * 上传进度条
     * @param seek 随机值，兼容并发
     * @return 压缩进度
     * 2019.11.15 弃用
     */
//    @RequestMapping("/DataBaseBackup/backupProgress")
//    @ResponseBody
//    public Map<String, String> backupProgress(@RequestParam("seek") String seek) {
//        proMap.put(seek, String.valueOf(Math.floor(progress[0] * 100) / 100));
//        return proMap;
//    }

    /**
     * 备份数据库和上传的图片
     * 2019.11.15 弃用
     */
//    private void backupZip(String backupZipName) {
//
//        progress[0] = 0.0;
//        srcDir = path + "upload";
//        rootDir = "F:/数据文件备份/";  // 压缩包保存的路径
//
//        File targetDir = new File(rootDir);
//        if (!targetDir.exists()) {
//            targetDir.mkdirs();
//        }
//
//        File file = new File(srcDir);
//        long fileSize = FileUtils.sizeOfDirectory(file);    // 总共要压缩的大小
//        //System.out.println("要压缩的文件大小：" + fileSize);
//
//        fileDir =  rootDir + backupZipName;
//
//        try {
//            CompressUtils.zip(srcDir, fileDir, fileSize, progress);
//            progress[0] = 0.0;
//        } catch (Exception e) {
//            progress[0] = 0.0;
//            System.out.println("压缩失败..........." );
//            e.printStackTrace();
//        }
//
//    }

    /**
     * 本地上传文件还原数据库
     * @param filename 上传的文件名
     * @return 是否成功
     * 2019.11.15 弃用
     */
//    @RequestMapping("/DataBaseBackup/restore")
//    @ResponseBody
//    public String restore(@RequestParam("filename") String filename) {
//        if (!filename.contains(".bak")) {
//            return "error";
//        }
//        String resFile = backupFolder + filename;
//
//        try {
//            FileInputStream fis = new FileInputStream(new File(resFile));
//            String md5AsHex = DigestUtils.md5DigestAsHex(fis);
//            System.out.println("restore: " + md5AsHex);
//
//            Properties pps = OperatePropertiesUtil.loadProperties(srcDir +
//                    "/SystemMaintenance/DataBaseBackup/ppsMD5.properties");
//            Map<String, String> keyMap = OperatePropertiesUtil.getMapByProperties(pps);
//
//            if (!keyMap.containsKey(md5AsHex)) {
//                return "error";
//            }
//            fis.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        String sql = "ALTER DATABASE ["+ databaseName + "] SET offline WITH ROLLBACK IMMEDIATE\n" +
//                "RESTORE DATABASE ["+ databaseName + "] FROM  " +
//                "DISK = N'"+ resFile + "'" +
//                "WITH  FILE = 1,  NOUNLOAD,  STATS = 5" +
//                "ALTER DATABASE [" + databaseName + "] SET online WITH ROLLBACK IMMEDIATE";
//
//        restoreUpload();
//
//
//        try {
//            DBo.execute(sql);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "error";
//        }
//        return "success";
//    }

}
