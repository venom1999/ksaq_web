package com.kuangshan.riskcontrol.tool;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * excel读写工具类
 */
public class PoiReadExcel {
    private Workbook wb;
    private Sheet sheet;
    private Row row;

    public PoiReadExcel(String filepath) {
        if (filepath == null) {
            return;
        }
        String ext = filepath.substring(filepath.lastIndexOf("."));
        try {
            InputStream is = new FileInputStream(filepath);
            if (".xls".equals(ext)) {
                this.wb = new HSSFWorkbook(is);
            } else if (".xlsx".equals(ext)) {
                this.wb = new XSSFWorkbook(is);
            } else {
                this.wb = null;
            }
        } catch (FileNotFoundException e) {

        } catch (IOException e) {

        }
    }

    /**
     * 读取Excel表格表头的内容
     *
     * @return String 表头内容的数组
     */
    public String[] readExcelTitle() throws Exception {
        if (wb == null) {
            throw new Exception("Workbook对象为空！");
        }
        sheet = wb.getSheetAt(0);
        row = sheet.getRow(0);
        // 标题总列数
        int colNum = row.getPhysicalNumberOfCells();

        String[] title = new String[colNum];
        for (int i = 0; i < colNum; i++) {
            title[i] = row.getCell(i).getStringCellValue();
        }
        return title;
    }

    /**
     * 读取Excel数据内容
     *
     * @return Map 包含单元格数据内容的Map对象
     */

    public List<List<String>> readExcelContent() throws Exception {
        if (wb == null) {
            throw new Exception("Workbook对象为空！");
        }

        sheet = wb.getSheetAt(0);
        // 得到总行数
        int rowNum = sheet.getLastRowNum();
        row = sheet.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();

        List<List<String>> dataValue = new ArrayList<>();
        List<String> rowValue = null;

        // 正文内容应该从第二行开始,第一行为表头的标题
        for (int i = 1; i <= rowNum; i++) {
            rowValue = new ArrayList<>();
            row = sheet.getRow(i);
            int j = 0;
            while (j < colNum) {
                if (row.getCell(j) == null) {
                    rowValue.add(null);
                } else {
                    row.getCell(j).setCellType(CellType.STRING);
                    rowValue.add(row.getCell(j).getStringCellValue());
                }
                j++;
            }
            dataValue.add(rowValue);
        }

        return dataValue;
    }

}
