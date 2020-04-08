package com.kuangshan.riskcontrol.tool;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.Properties;

public class  DBConnectionPoll {
    /*
    * 用户名
    */
    private static String user;
    /*密码*/
    private static String password;
    /*
    数据库链接
    * */
    private static String url;
    /*
    * 连接池
    * 规定最大连接数量*/
    private static LinkedList<Connection> pool;
    private static int maxActive=20;
    /*
    *数据库驱动*/
    private static String driver;

    /*
    * 从属性文件中加载数据库驱动，初始化连接池
    * */
    static {
        try {
            ApplicationContext ac = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
            DataSource datasource = (DataSource) ac.getBean("dataSource");
           /* Properties properties=new Properties();
            ClassLoader classLoader=DBConnectionPoll.class.getClassLoader();
            InputStream inputStream=classLoader.getResourceAsStream("db.properties");
            properties.load(inputStream);
            driver=properties.getProperty("driver_class");
            user=properties.getProperty("database_username");
            password=properties.getProperty("database_password");
            url=properties.getProperty("database_url");
            Class.forName(driver);*/
            pool=new LinkedList<Connection>();
            //创建 连接对象放入连接池中
            for (int i=0;i<maxActive;i++){
                Connection connection= datasource.getConnection();
                pool.add( connection);
//                Connection connectionWrapper=new ConnectionWapper(connection,pool);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    public  Connection getConnection() throws SQLException{
        Connection connection;
        if(pool.size()>0){
            connection=pool.removeFirst();
        }else {
            connection=DriverManager.getConnection(url,user,password);
        }
      //  System.out.println("当前池子有"+pool.size()+"个对象");
        return connection;

    }
    public void releaseConnection(Connection connection){
        pool.add(connection);
      //  System.out.println("当前池子有"+pool.size()+"个对象");
    }
}
