package com.kuangshan.riskcontrol.tool;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.reflection.ExceptionUtil;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisConnectionException;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class RedisUtils {
    private static JedisPool jedispool;

    static {
        JedisPoolConfig jedisconfig = new JedisPoolConfig();
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("redis.properties");
        assert is != null;
        Properties p=new Properties();
        try {
            p.load(is);
            jedisconfig.setMaxIdle(Integer.parseInt(p.getProperty("redis.pool.maxIdle")));
            jedispool = new JedisPool(jedisconfig, p.getProperty("redis.ip"), Integer.valueOf(p.getProperty("redis.port")), 300000);
            is.close();
        }catch (IOException e) {
            e.printStackTrace();
        }

    }
    private static Jedis getJedis(){
        Jedis jedis=null;
        try {
            jedis = jedispool.getResource();
        } catch (JedisConnectionException jce) {
            jce.printStackTrace();
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            jedis = jedispool.getResource();
        }
        return jedis;
    }

    public static void setMap(String key,Map<String,Object> map){
        Jedis jedis=getJedis();
        for(Map.Entry<String,Object> entry:map.entrySet()){
            jedis.hset(key,entry.getKey(),entry.getValue().toString());
        }
    }

}
