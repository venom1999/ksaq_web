package com.kuangshan.riskcontrol.tool;

import java.io.*;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * 操作properties文件工具类
 */
public class OperatePropertiesUtil {

    //加载、读取Properties文件
    public static Properties loadProperties(String propertiesPath){
        Properties pps = new Properties();
        try {
            InputStream in = new FileInputStream(propertiesPath);
            pps.load(in);
            in.close();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return pps;
    }

    // 获取Properties文件中键值对
    public static Map<String, String> getMapByProperties(Properties pps) {
        Map<String, String> map = new HashMap<>();
        Enumeration en = pps.propertyNames();
        while (en.hasMoreElements()) {
            String strKey = (String)en.nextElement();
            String strValue = pps.getProperty(strKey);
            map.put(strKey, strValue);
        }

        return map;
    }

    //向Properties文件中加入数据
    public static Properties addProperties(String propertiesPath, Properties pps, String key, String value){
        try {
            OutputStream fos = new FileOutputStream(propertiesPath);
            pps.setProperty(key, value);
            pps.store(fos, "Update '" + key + "' value");
            fos.close();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return pps;
    }

    //从Properties文件中根据key删除
    public static Properties removeProperties(String propertiesPath, Properties pps, String key){
        try {
            OutputStream oFile = new FileOutputStream(propertiesPath);
            pps.remove(key);
            pps.store(oFile, "Delete '" + key);
            oFile.close();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return pps;
    }

    //Properties文件中根据key更新value
    public static Properties updatePropertiesByKey(String propertiesPath, Properties pps, String key, String value){
        try {
            OutputStream oFile = new FileOutputStream(propertiesPath);
            pps.setProperty(key, value);
            pps.store(oFile, "Update '" + key);
            oFile.close();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return pps;
    }

    //update Properties文件,以byte[]的形式，重新向properties中写入，特殊情况用
    public static Properties updateProperties(String propertiesPath, Properties pps, byte [] str){
        try {
            File file = new File(propertiesPath);
            FileOutputStream oFile = new FileOutputStream(file);
            oFile.write(str);
            oFile.close();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return pps;
    }

}
