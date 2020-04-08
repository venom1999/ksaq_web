package com.kuangshan.riskcontrol.tool;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.io.IOUtils;


public class GZIPUtils {

    public static final String GZIP_ENCODE_UTF_8 = "UTF-8";

    public static final String GZIP_ENCODE_ISO_8859_1 = "ISO-8859-1";

    /**
     * 字符串压缩为GZIP字节数组
     *
     * @param str
     * @return
     */
    public static byte[] compress(String str) {
        return compress(str, GZIP_ENCODE_UTF_8);
    }

    /**
     * 字符串压缩为GZIP字节数组
     *
     * @param str
     * @param encoding
     * @return
     */
    public static byte[] compress(String str, String encoding) {
        if (str == null || str.length() == 0) {
            return null;
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        GZIPOutputStream gzip;
        try {
            gzip = new GZIPOutputStream(out);
            gzip.write(str.getBytes(encoding));
            gzip.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return out.toByteArray();
    }

    /**
     * GZIP解压缩
     *
     * @param bytes gzip格式byte数组
     * @param charset 字符集
     * @return
     */
    public static String uncompress(byte[] bytes, String charset) {
        if (bytes == null || bytes.length == 0) {
            return null;
        }

        ByteArrayOutputStream out = null;
        ByteArrayInputStream in = null;
        GZIPInputStream gzipIn = null;

        try {
            out = new ByteArrayOutputStream();
            in = new ByteArrayInputStream(bytes);
            gzipIn = new GZIPInputStream(in);

            //使用org.apache.commons.io.IOUtils 简化流的操作
            IOUtils.copy(gzipIn, out);
            return out.toString(charset);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //释放流资源
            IOUtils.closeQuietly(gzipIn);
            IOUtils.closeQuietly(in);
            IOUtils.closeQuietly(out);
        }
        return null;
    }

    /**
     *
     * @param bytes
     * @return
     */
    public static String uncompressToString(byte[] bytes) {
        return uncompressToString(bytes, GZIP_ENCODE_UTF_8);
    }

    /**
     *
     * @param bytes
     * @param encoding
     * @return
     */
    public static String uncompressToString(byte[] bytes, String encoding) {
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ByteArrayInputStream in = new ByteArrayInputStream(bytes);
        try {
            GZIPInputStream ungzip = new GZIPInputStream(in);
            byte[] buffer = new byte[256];
            int n;
            while ((n = ungzip.read(buffer)) >= 0) {
                out.write(buffer, 0, n);
            }
            return out.toString(encoding);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
        String str =
                "%5B%7B%22lastUpdateTime%22%3A%222011-10-28+9%3A39%3A41%22%2C%22smsList%22%3A%5B%7B%22liveState%22%3A%221";
        System.out.println("原长度：" + str.length());
        System.out.println("压缩后字符串：" + GZIPUtils.compress(str).toString().length());
//        System.out.println("解压缩后字符串：" + StringUtils.newStringUtf8(GZIPUtils.uncompress(GZIPUtils.compress(str, "UTF"))));
        System.out.println("解压缩后字符串：" + GZIPUtils.uncompressToString(GZIPUtils.compress(str)));
    }

}
