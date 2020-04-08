package com.kuangshan.riskcontrol.tool;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

/**
 * @author gm
 * 用于文件上传、删除、下载、移动、复制
 */
public class FileIO {
    /**
     * 上传文件
     */
    public static void uploadFile(MultipartFile resource, String destPath) throws IOException {
        File destFile = new File(destPath);
        if (!destFile.getParentFile().exists()) {
            makeParentFile(destFile.getParentFile());
        }
        if (destFile.exists()) {
            destFile.delete();
        }
        resource.transferTo(destFile);
    }

    public static void makeParentFile(File file) {
        if (!file.getParentFile().exists()) {
            makeParentFile(file.getParentFile());
        }
        if (!file.exists()) {
            file.mkdir();
        }
    }

    /**
     * 判断文件时候被包含在upload目录下
     */
    public static boolean isContainsFile(File file) throws IOException {
        File uploadFile = new File("upload");
        if (file.getCanonicalPath().contains(uploadFile.getCanonicalPath())) {
            return true;
        }
        return false;
    }


    /**
     * 文件转移 将文件复制之后 删除源文件
     */
    public static void doCopyFile(String srcFile, String destFile) throws IOException {
        File file = new File(srcFile);
        if (file.exists()) {
            File dest = new File(destFile);
            if (!dest.getParentFile().exists()) {
                makeParentFile(dest.getParentFile());
            }
            if (dest.exists()) {
                dest.delete();
            }
            Files.copy(file.toPath(), dest.toPath());
            if (file.exists()) {
                file.delete();
            }

        }
    }

    /**
     * 复制签名照 将文件复制之后 不删除源文件
     */
    public static void copySignPhoto(String srcFile, String destFile) throws IOException {
        File file = new File(srcFile);
        if (file.exists()) {
            File dest = new File(destFile);
            if (!dest.getParentFile().exists()) {
                makeParentFile(dest.getParentFile());
            }

            if (dest.exists()) {
                dest.delete();
            }
            Files.copy(file.toPath(), dest.toPath());

        }
    }

    /**
     * 删除n条记录后删除对应的文件
     *
     * @param path 路径
     * @param ID   ID
     */
    public void deleteRecords(String path, String ID) {
        String filepath = path + "/" + ID;
        deleteDirectory(filepath);
    }

    /**
     * 删除单个文件
     *
     * @param path 路径
     * @param ID   ID
     */
    public static void deleteFiles(String path, String ID, String filename) {
        String filepath = path + ID + "/" + filename;
        String contentType = getContentType(filepath);
        String previewFilepath = "";
        String name = filename.substring(0, filename.lastIndexOf("."));
        //原始文件
        File file = new File(filepath);
        if (file.exists()) {
            file.delete();
        }

        switch (contentType) {
            case "docx":
            case "doc":
            case "txt":
            case "ppt":
            case "xls":
            case "xlsx":
            case "pptx":
                previewFilepath = path + ID + "/preview/" + name + ".pdf";
                File previewFile = new File(previewFilepath);
                if (previewFile.exists()) {
                    previewFile.delete();
                }
                break;
/*                previewFilepath = path  + ID + "/preview/" + name + ".html";
                File xlspreviewFile = new File(previewFilepath);
                if (xlspreviewFile.exists()) {
                    xlspreviewFile.delete();
                }
                previewFilepath = path  + ID + "/preview/" + name + ".files";
                deleteDirectory(previewFilepath);
                break;*/
            default://
        }


    }

    /**
     * 删除单个文件
     *
     * @param path 路径
     */
    public static void deleteFile(String path, String filename) {
        String filepath = path + "/" + filename;
        //原始文件
        File file = new File(filepath);
        if (file.exists()) {
            file.delete();
        }
    }

    /**
     * 删除整个文件夹
     */
    public static void deleteDirectory(String path) {
        File dirfile = new File(path);
        if (dirfile.isDirectory()) {
            for (File file : dirfile.listFiles()) {
                deleteDirectory(file.getPath());
            }
        }
        dirfile.delete();
    }

    /**
     * 获取文件的类型
     */
    public static String getContentType(String filePath) {
        Path path = Paths.get(filePath);
        System.out.println("文件类型：" + filePath);
        String contentType = "";
        System.out.println("文件类型：" + contentType);
        try {
            contentType = Files.probeContentType(path);
            System.out.println("文件类型：" + contentType);
        } catch (IOException e) {
            //  e.printStackTrace();
        }
        try {
            switch (contentType) {
                case "application/msword":
                    contentType = "doc";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    contentType = "docx";
                    break;
                case "application/vnd.ms-excel":
                    contentType = "xls";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    contentType = "xlsx";
                    break;
                case "application/vnd.ms-powerpoint":
                    contentType = "ppt";
                    break;
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    contentType = "pptx";
                    break;
                case "text/plain":
                    contentType = "txt";
                    break;
                default:
                    System.out.println("文件类型：" + contentType);
            }
            return contentType;
        } catch (Exception e) {
            return "error";
        }

    }


    public static void downloadFile(HttpServletResponse response, String path, String fileName) throws Exception {
        File file = new File(path + "\\" + fileName);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=" + new String(fileName.getBytes(), "ISO-8859-1"));
        //打开本地文件流
        InputStream inputStream = new FileInputStream(path + "\\" + fileName);
        //激活下载操作
        OutputStream os = response.getOutputStream();
        //循环写入输出流
        try {
            byte[] b = new byte[2048];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 这里主要关闭。
            os.close();
            inputStream.close();
        }

    }


    private final static Map<String, String> FILE_TYPE_MAP = new HashMap<String, String>();

    /**
     * 日志操作类
     */
    private final static Logger logger = LoggerFactory.getLogger(FileIO.class);

    static {
        getAllFileType(); // 初始化文件类型信息
    }

    private static void getAllFileType() {
        //图片
        FILE_TYPE_MAP.put("ffd8ffe000104a464946", "jpg");
        FILE_TYPE_MAP.put("89504e470d0a1a0a0000", "png");
        FILE_TYPE_MAP.put("47494638396126026f01", "gif");
        FILE_TYPE_MAP.put("49492a00227105008037", "tif");
        FILE_TYPE_MAP.put("424d228c010000000000", "bmp"); // 16色位图(bmp)
        FILE_TYPE_MAP.put("424d8240090000000000", "bmp"); // 24位位图(bmp)
        FILE_TYPE_MAP.put("424d8e1b030000000000", "bmp"); // 256色位图(bmp)
        //音频、视频
        FILE_TYPE_MAP.put("49443303000000002176", "mp3");
        FILE_TYPE_MAP.put("00000020667479706d70", "mp4");
        FILE_TYPE_MAP.put("52494646d07d60074156", "avi");
        FILE_TYPE_MAP.put("2e524d46000000120001", "rmvb"); // rmvb、rm
        FILE_TYPE_MAP.put("6D6F6F76", "mov");
        FILE_TYPE_MAP.put("000001ba210001000180", "mpg");
        FILE_TYPE_MAP.put("3026b2758e66cf11a6d9", "wmv"); // wmv、asf
        FILE_TYPE_MAP.put("52494646e27807005741", "wav");
        FILE_TYPE_MAP.put("464c5601050000000900", "flv"); // flv、f4v
        //压缩包
        FILE_TYPE_MAP.put("504b0304140000000800", "zip");
        FILE_TYPE_MAP.put("526172211a0700cf9073", "rar");
        //文档
        FILE_TYPE_MAP.put("d0cf11e0a1b11ae10000", "doc"); // MS Excel、Word、Msi doc;xls;dot;ppt;xla;ppa;pps;pot;msi;sdw;db
        FILE_TYPE_MAP.put("504b0304140006000800", "docx");
        FILE_TYPE_MAP.put("d0cf11e0a1b11ae10000", "wps");// WPS(wps、et、dps)

        FILE_TYPE_MAP.put("504B0304", "xlsx");//excel2007以上版本文件
        FILE_TYPE_MAP.put("255044462d312e350d0a", "pdf");
        FILE_TYPE_MAP.put("7b5c727466315c616e73", "rtf");
        //      FILE_TYPE_MAP.put("41433130313500000000", "dwg");
        //    FILE_TYPE_MAP.put("3c21444f435459504520", "html");
        //    FILE_TYPE_MAP.put("3c21646f637479706520", "htm");
        //   FILE_TYPE_MAP.put("48544d4c207b0d0a0942", "css");
        //   FILE_TYPE_MAP.put("696b2e71623d696b2e71", "js");
      /*  FILE_TYPE_MAP.put("38425053000100000000", "psd");
        FILE_TYPE_MAP.put("46726f6d3a203d3f6762", "eml");
        FILE_TYPE_MAP.put("d0cf11e0a1b11ae10000", "vsd");
        FILE_TYPE_MAP.put("5374616E64617264204A", "mdb");*/
        //   FILE_TYPE_MAP.put("4d546864000000060001", "mid");
        //   FILE_TYPE_MAP.put("235468697320636f6e66", "ini");
        //  FILE_TYPE_MAP.put("504b03040a0000000000", "jar");
        //   FILE_TYPE_MAP.put("4d5a9000030000000400", "exe");
        //   FILE_TYPE_MAP.put("3c25402070616765206c", "jsp");
        //   FILE_TYPE_MAP.put("494e5345525420494e54", "sql");
        //   FILE_TYPE_MAP.put("7061636b616765207765", "java");
        //   FILE_TYPE_MAP.put("406563686f206f66660d", "bat");
        //   FILE_TYPE_MAP.put("1f8b0800000000000000", "gz");
        //   FILE_TYPE_MAP.put("6c6f67346a2e726f6f74", "properties");
        //     FILE_TYPE_MAP.put("cafebabe0000002e0041", "class");
        //  FILE_TYPE_MAP.put("49545346030000006000", "chm");
        //    FILE_TYPE_MAP.put("04000000010000001300", "mxp");
        //   FILE_TYPE_MAP.put("6431303a637265617465", "torrent");
        //   FILE_TYPE_MAP.put("6D6F6F76", "mov");
        //   FILE_TYPE_MAP.put("FF575043", "wpd");
        //   FILE_TYPE_MAP.put("CFAD12FEC5FD746F", "dbx");
        //   FILE_TYPE_MAP.put("2142444E", "pst");
        //    FILE_TYPE_MAP.put("AC9EBD8F", "qdf");
        //    FILE_TYPE_MAP.put("E3828596", "pwl");
        //   FILE_TYPE_MAP.put("2E7261FD", "ram");
    }

    /**
     * 上传判断文件是否处于白名单中
     */
    public static boolean isLegalFile(MultipartFile file) {

        String fileName = file.getOriginalFilename();
        String fileType = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase(Locale.ENGLISH);
        if ("txt".equalsIgnoreCase(fileType)) {
            //txt文件没有标准的头文件
            return true;
        } else {
            String value = null;
            InputStream is = null;
            try {
                is = file.getInputStream();
                byte[] b = new byte[2];
                is.read(b, 0, b.length);
                value = bytesToHexString(b);
            } catch (IOException e) {
                logger.error("获取文件头失败");
            } finally {
                if (null != is) {
                    try {
                        is.close();
                    } catch (IOException e) {
                        logger.error("关闭输入流失败");
                    }
                }
            }
            Iterator<String> keyIter = FILE_TYPE_MAP.keySet().iterator();
            while (keyIter.hasNext()) {
                String key = keyIter.next();
                if (value != null) {
                    if (key.toLowerCase(Locale.ENGLISH).startsWith(value.toLowerCase(Locale.ENGLISH))
                            || value.toLowerCase(Locale.ENGLISH).startsWith(key.toLowerCase(Locale.ENGLISH))) {
                        return FILE_TYPE_MAP.containsKey(key);

                    }
                }
            }
            return false;
        }
    }

    /**
     * 下载判断文件是否合法
     */

    public static boolean isLegalFile(File file) throws IOException {
        //文件是否存在
        if (!file.exists()) {
            return false;
        }
        //判断文件是否在upload目录下
        if (!isContainsFile(file)) {
            return false;
        }
        //是否是文件夹
        if (file.isDirectory()) {
            return false;
        }
        FileItem fileItem = new DiskFileItem(file.getName(), Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());
        byte[] buffer = new byte[4096];
        int n;
        InputStream inputStream = new FileInputStream(file);
        OutputStream os = fileItem.getOutputStream();
        while ((n = inputStream.read(buffer, 0, 4096)) != -1) {
            os.write(buffer, 0, n);
        }
        if (!isLegalFile(new CommonsMultipartFile(fileItem))) {
            return false;
        }
        return true;

    }

    /**
     * 得到上传文件的文件头
     *
     * @param src
     * @return
     */
    public static String bytesToHexString(byte[] src) {
        StringBuilder stringBuilder = new StringBuilder();
        if (null == src || src.length <= 0) {
            return null;
        }
        for (int i = 0; i < src.length; i++) {
            int v = src[i] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }

}
