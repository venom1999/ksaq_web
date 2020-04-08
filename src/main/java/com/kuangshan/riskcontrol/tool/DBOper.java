package com.kuangshan.riskcontrol.tool;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Logger;

import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.dbutils.*;

import javax.sql.DataSource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class DBOper {

    private static Logger log=Logger.getLogger("com.kuangshan.riskcontrol.tool.DBOper");
    private static int capacity=10;



    public static Connection getConn() throws SQLException {
        ApplicationContext ac = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
        DataSource datasource = (DataSource) ac.getBean("dataSource");
        Connection conn=datasource.getConnection();
        return conn;
    }
    public static int update(String sql){
        QueryRunner queryRunner=new QueryRunner();
        int row=0;
        try {
            Connection conn=getConn();
            row=queryRunner.update(conn,sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return row;
    }

    public static int update(List<String> sqls){
        QueryRunner queryRunner=new QueryRunner();
        int[] rows=null;
        try {
            Connection conn=getConn();
            conn.setAutoCommit(false);
            Statement statement = conn.createStatement();
            for(String sql:sqls){
                statement.addBatch(sql);
            }
            rows=statement.executeBatch();
            conn.setAutoCommit(true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        if(rows==null){
            return 0;
        }else{
            int count=0;
            for (int row:rows){
                count+=row;
            }
            return count;
        }

    }

    public static List<Map<String,Object>> query(String sql){

        //System.out.println(sql);
        QueryRunner queryRunner=new QueryRunner();
        List<Map<String,Object>> map=new ArrayList<Map<String, Object>>();
        try {
            Connection conn=getConn();
            map=queryRunner.query(conn,sql,new MapListHandler());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return map;
    }

    public static List<Map<String,Object>> getListByPage(String sql,int pageIndex){
        if(pageIndex!=0) {
            sql="select * from ("+sql+") A where rn>"+ (pageIndex-1)*capacity+" and rn<="+pageIndex*capacity;
        }

        return query(sql);
    }

    public static int getListNum(String sql) {
        sql="select count(*) as _sum from ("+sql+") A;";
        List<Map<String,Object>> map=query(sql);
        String _sum=map.get(0).get("_sum").toString();
        int count=Integer.parseInt(_sum);
        return count % capacity == 0 ? count / capacity : count / capacity + 1;
    }

    public static int execProc(String name,String[] params){
        String sql=String.format("{call dbo.%s(%s)}",name,String.join(",",params));
        return update(sql);
    }
}
