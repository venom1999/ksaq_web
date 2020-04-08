
import javax.xml.ws.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.*;


public class test {

    public class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
        }
    }

  /*  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

    }*/


    public static boolean robot(String command, int[][] obstacles, int x, int y) {
        command = "URR";

        x = 3;
        y = 2;
        int[] location = new int[2];
        int i = 0;
        int index =0;
        for(int m=0;m<obstacles.length;m++)
        {
            if(obstacles[m][0]<=x&&obstacles[m][1]<=y)
            {
                obstacles[index][0]=obstacles[m][0];
                obstacles[index++][1]=obstacles[m][1];
            }
        }
        while (location[0] <= x && location[1] <= y) {
            if (i == command.length()) {
                i = 0;
            }
            if (command.substring(i, i + 1).equals("U")) {
                location[1] = location[1] + 1;
            } else {
                location[0] = location[0] + 1;
            }
            if (location[0] == x && location[1] == y) {
                return true;
            }
            for (int m = 0; m < index; m++) {
                if (location[0] == obstacles[m][0] && location[1] == obstacles[m][1]) {
                    return false;
                }
            }
            i++;
        }
        return false;
    }
/*
    public int kConcatenationMaxSum(int[] arr, int k) {

    }*/

    public static boolean uniqueOccurrences(int[] arr) {
        Arrays.sort(arr);
        int cnt=1;
        int k =0;

        int[] count=new int[arr.length];
        if(arr.length==1)
        {
            return true;
        }
        else
        {
            if(arr[0]!=arr[1])
            {
                count[k++]=cnt;
                cnt=1;
            }
            else
            {
                cnt=2;
            }
            for(int i=1;i<arr.length-1;i++)
            {
                if(arr[i]==arr[i+1])
                {
                    cnt++;
                }
                else
                {
                    count[k++]=cnt;
                    cnt=1;
                }
            }
            if(arr[arr.length-1]!=arr[arr.length-2])
            {
                count[k++]=1;
            }
        }

        Arrays.sort(count);
        for(int j=0;j<k;j++)
        {
            if(j!=k-1)
            {
                if(count[j]!=0&&count[j]==count[j+1])
                {
                    return false;
                }
            }

        }
        return true;
    }

    public static void main(String[] args) {
        int[] arr = {26,2,16,16,5,5,26,2,5,20,20,5,2,20,2,2,20,2,16,20,16,17,16,2,16,20,26,16};
        uniqueOccurrences(arr);
        String test;
    }
}
