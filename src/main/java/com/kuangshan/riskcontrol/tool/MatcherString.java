package com.kuangshan.riskcontrol.tool;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherString {

    // 获取src upload/ueditor/video...
    public List<String> getSrc(String str) {
        List<String> list = new ArrayList<>();

        String regex = "\\s?src=\"?.*/upload/([^\"]*)";
        Pattern p = Pattern.compile(regex);

        Matcher m = p.matcher(str);
        while (m.find()) {
            if (!list.contains(m.group(1))) {
                list.add("upload/" + m.group(1));
            }
        }

        return list;
    }

    // 去掉list列表中的temp/
    public List<String> delTemp(List<String> list) {
        List<String> newList = new LinkedList<>();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).contains("/temp/")) {
                newList.add(list.get(i).replace("/temp/", "/"));
            } else {
                list.remove(i);
                i--;
            }

        }
        return newList;
    }

    /**
     * 去除字符串中所有的<>
     * @param str 需要去除的字符串
     * @return 去除后的字符串
     */
    public String delHtmlTag(String str) {
        String pattern = "<[^>]+>";
        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(str);

        String newStr = m.replaceAll("");
        return newStr;
    }

    /**
     * 将字符串中的<img />标签换为【图片】
     * @param str 目标字符串
     * @return 转换后的字符串
     */
    public String replaceImg(String str){
        return str.replaceAll("<img src\\s*=\\s*(.*?)[^>]*?>", "【图片】");
    }

    public String replaceVA(String str){
        if (str.contains("<audio class")) {
            str = str.replaceAll("<audio class\\s*=\\s*(.*?)[^>]*?>", "【音频/视频】");
        }
        System.out.println(str);

        if (str.contains("<video class")) {
            str = str.replaceAll("<video class\\s*=\\s*(.*?)[^>]*?>", "【音频/视频】");
        }
        System.out.println(str);

        return str;
    }


    public static void main(String[] args) {
        String str = "<img src=\"/kuangshanEdu/upload/ueditor/image/c003200215131052092.png\" title=\"c003200215131052092.png\" alt=\"c003200215131052092.png\" width=\"68\" height=\"68\" style=\"width: 68px; height: 68px;\"/>";

        MatcherString ms = new MatcherString();
        System.out.println(ms.getSrc(str));


    }
}
