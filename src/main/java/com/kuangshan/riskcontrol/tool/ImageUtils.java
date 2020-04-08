package com.kuangshan.riskcontrol.tool;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

/**
 * 图片操作工具类
 */
public class ImageUtils {


    // 将图片转换成BASE64字符串
    public static String getImageString(String path) throws IOException {
        // 1、校验是否为空
        if (path == null || path.trim().length() <= 0) {
            return "";
        }

        // 2、校验文件是否为目录或者是否存在
        File picFile = new File(path);
        if (picFile.isDirectory() || (!picFile.exists())) {
            return "";
        }

        // 3、校验是否为图片
        try {
            BufferedImage image = ImageIO.read(picFile);
            if (image == null) {
                return "";
            }
        } catch (IOException ex) {
            ex.printStackTrace();
            return "";
        }

        // 4、转换成base64编码
        InputStream in = null;
        byte[] data = null;
        try {
            in = new FileInputStream(path);
            data = new byte[in.available()];
            in.read(data);


            in.close();
        } catch (IOException e) {
            throw e;
        } finally {
            if (in != null)
                in.close();
        }

        return data != null ? Base64.getEncoder().encodeToString(data) : "";
    }
}
