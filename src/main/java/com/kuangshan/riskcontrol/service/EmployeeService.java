package com.kuangshan.riskcontrol.service;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.kuangshan.riskcontrol.dao.EmployeeInstitutionDatadictionaryviewMapper;
import com.kuangshan.riskcontrol.dao.EmployeeTMapper;
import com.kuangshan.riskcontrol.model.EmployeeInstitutionDatadictionaryview;
import com.kuangshan.riskcontrol.model.EmployeeT;
import com.kuangshan.riskcontrol.tool.DBUtils;

import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.DBo;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import static org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER;

@Service
public class EmployeeService {
	DBo dBo = new DBo();
	@Resource
	private EmployeeInstitutionDatadictionaryviewMapper eidvm;

	public List<EmployeeInstitutionDatadictionaryview> getEmployeeInfo(String conditions, int index){

		return eidvm.selectEmployeeList(conditions, (index-1)*10, 10);
	}

	public List<EmployeeInstitutionDatadictionaryview> getAll(String conditions){

		return eidvm.selectAll(conditions);
	}

	public int getEmployeeInfoNum(String conditions){

		int count=eidvm.selectAllNum(conditions);
		return count % 10 == 0 ? count / 10 : count / 10 + 1;
	}



	public Map[] getAllEmployeeInfo(String conditions, int pageindex, String username, String institution) throws SQLException
	{
		if(conditions.equals("")) {
			DBOperator dbOperator = new DBOperator("");
			return dbOperator.getAllInfo("employee_allInfoProc", pageindex, 10);
		}
		else
		{
			DBOperator dbOperator = new DBOperator("");
			String sqlQuery = "select *,row_number() over(order by employeeNum) rn  from employee_institution_datadictionaryView where "+conditions+"";
			return dbOperator.getQueryResult(sqlQuery, pageindex, 10," order by employeeNum");
		}
	}

	public Map[] getAllEmployee(String conditions) throws SQLException
	{
		if(conditions.equals("")) {
			DBOperator dbOperator = new DBOperator("");
			return dbOperator.getAllEmployeeInfo("employee_allListProc");
		}
		else
		{
			DBOperator dbOperator = new DBOperator("");
			String sqlQuery = "select *,row_number() over(order by employeeNum) rn  from employee_institution_datadictionaryView where "+conditions+"";
			return dbOperator.executeQuery(sqlQuery);
		}
	}

	// 通过视图查询员工详细信息
	public List<Map<String, Object>> getEmployeeDetailByView(String num) throws SQLException
	{
		String sql = "select * from employee_institution_datadictionaryView where employeeNum='" + num + "' union select * from Contractor_employee_institution_datadictionaryView where employeeNum='" + num + "'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}

	//查询得到某一个特种员工的信息，包括预警信息，主要用来显示员工的证书信息
	public Map[] getTableSp(String num)
	{
		if (num.contains("'")) num = num.replace("'", "''");
		//就是在有效日期的基础上减去参数日期，得到了预警日期，再将预警日期和当前日期比较，如果预警日期在当前日期的后面--安全，如果预警日期在当前日期和有效日期之间--预警，如果有效日期在当前日期之--报警
		String sql = "select SpecialID,EmployeeName,OpCategoryNum,OpItemNum,CertificateNum,CertificateName,IssueInstitute,GetTime,ReexamineTime,Validity, WarningDate,FirstDate, currentDate, SpeciExperience ,OpCategoryValue,OpItemValue,institutionName,employeeSex,UploadPerson,UploadTime from special_EmployeeView where employeeName='" + num + "'";
		DBOperator db=new DBOperator("");
		return db.getTableByOneProc("commonQueryProc", sql);
	}

	//查询得到某一个安全员工的信息，包括预警信息
	public Map[] getTableSe(String num)
	{
		if (num.contains("'")) num = num.replace("'", "''");
		//得到整数类型的参数值，作为需要加的日期参数
		//就是在有效日期的基础上减去参数日期，得到了预警日期，再将预警日期和当前日期比较，如果预警日期在当前日期的后面--安全，如果预警日期在当前日期和有效日期之间--预警，如果有效日期在当前日期之--报警
		String sql = "select id,EmployeeNum,EmployeeName,CertificateNum,CertificateName, IssueDate,IssueInstitute, Validity,FirstDate, WarningDate,currentDate,UploadFileName,UploadPerson,UploadTime from security_employeeView where employeeNum='" + num + "'";
		DBOperator db=new DBOperator("");
		return db.getTableByOneProc("commonQueryProc", sql);
	}




	@Resource
	private EmployeeTMapper etm;
	public boolean checkUserRight(String right) {
		return right!=null;
	}

	public List<Map<String,Object>> getEmployees(){
		String sql="select *,EmployeeName+'-'+EmployeeID as EmployeeAlias from Employee_t where OutCompanyOrNot<>'1' or IsRetire<>'1'";
		return DBUtils.query(sql);
	}

	public Map[] getEmployeeList(){
		DBOperator dbOperator=new DBOperator("select EmployeeNum,EmployeeName+'-'+EmployeeID as EmployeeMark from Employee_t");
		return dbOperator.executeQuery();
	}

	public Map[] getEmployeeTelList() {
		DBOperator dbOperator = new DBOperator("select EmployeeNum,EmployeeName+'-'+EmployeeTel as EmployeePhone from Employee_t");
		return dbOperator.executeQuery();
	}

	public Map[] getEmployeeList(String institution){
		String condition = "";
		if(StringUtils.isNotBlank(institution)){
			condition = "where InstitutionNum in ("+institution+")";
		}
		DBOperator dbOperator=new DBOperator("select EmployeeNum,EmployeeName+'-'+EmployeeID as EmployeeMark from Employee_t "+condition);
		return dbOperator.executeQuery();
	}
	public List<EmployeeT> getEmployeeByID(String num){
		return etm.getEmployeeByID(num);
	}

	/**
	 * 通过员工表主键EmployeeNum查询到单个员工
	 * @param userNum
	 * @return
	 */
	public EmployeeT selectByPrimaryKey(String userNum) {
		return etm.selectByPrimaryKey(userNum);
	}

	//获取特种设备操作证书
	public List<Map<String, Object>> getSpecialEquip(String employeenum)throws SQLException{
		String sql = "select * from SpecialEquiementEmployee_V where EmployeeNum = '"+employeenum+"'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}
	public List<Map<String, Object>> getSpecialEquipID(String employeenum) throws SQLException{
		String sql = "select SpecialEquiementEmployeeID from SpecialEquiementEmployee_V where EmployeeNum = '"+employeenum+"'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}
	//获取特种作业操作证
	public List<Map<String, Object>> getSpecialMan(String employeenum)throws SQLException{
		String sql = "select * from Specialmanager_v where EmployeeNum = '"+employeenum+"'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}
	public List<Map<String, Object>> getSpecialID(String employeenum) throws SQLException{
		String sql = "select SpecialID from Specialmanager_v where EmployeeNum = '"+employeenum+"'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}
	//获取安全管理操作证
	public List<Map<String, Object>> getSecurityMan(String employeenum)throws SQLException{
		String sql = "select * from Securitymanager_v where EmployeeNum = '"+employeenum+"'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}
	public List<Map<String, Object>> getSecurityID(String employeenum) throws SQLException{
		String sql = "select id from Securitymanager_v where EmployeeNum = '"+employeenum+"'";
		DBo dbo = new DBo();
		return dbo.executeQuery(sql);
	}

	//修改员工数据
	public boolean submitEditEmployeeInfo(EmployeeT record){
		return etm.updateByPrimaryKey(record)>0;
	}

	//添加员工数据
    public boolean submitAddEmployeeInfo(EmployeeT record){
	    return etm.insert(record)>0;
    }

    //导出表格
    public void export(String fileName, String title, String
            secondRow, Map<String, String> columnHead, Map[] dataList, HttpServletResponse response) throws Exception {
        int collumnNum = columnHead.size();

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(CENTER);
        sheet.setDefaultColumnStyle(collumnNum, style);

        HSSFRow row0 = sheet.createRow(0);
        for (int i = 0; i < columnHead.size(); i++) {
            row0.createCell(i);
        }
        row0.getCell(0).setCellValue(title);

        HSSFRow row1 = sheet.createRow(1);
        for (int i = 0; i < columnHead.size(); i++) {
            row1.createCell(i);
        }
        row1.getCell(0).setCellValue(secondRow);

        CellRangeAddress title_cell = new CellRangeAddress(0, 0, 0, collumnNum - 1);
        CellRangeAddress conditions_cell = new CellRangeAddress(1, 1, 0, collumnNum - 1);// 起始行,结束行,起始列,结束列
        sheet.addMergedRegion(title_cell);
        sheet.addMergedRegion(conditions_cell);

        // 表头行
        int headRow = sheet.getLastRowNum() + 1;
        HSSFRow row_head = sheet.createRow(headRow);
        int k = 0;
        for (Map.Entry<String, String> entry : columnHead.entrySet()) {
            HSSFCell cell = row_head.createCell(k);
            cell.setCellValue(entry.getKey());
            k++;
        }

        // 数据行
        int startRow = headRow + 1;
        for (int i = startRow; i < startRow + dataList.length; i++) {
            HSSFRow row = sheet.createRow(i);
            int j = 0;
            for (Map.Entry<String, String> entry : columnHead.entrySet()) {
                HSSFCell cell = row.createCell(j);
                if (entry.getValue().equals("rn")) {
                    cell.setCellValue(Integer.toString(i - startRow + 1));
                } else if (entry.getValue().equals("Onstate")) {
                    if (dataList[i - startRow].get(entry.getValue()).toString().equals("1")) {
                        cell.setCellValue("是");
                    } else {
                        cell.setCellValue("否");
                    }

                } else if (entry.getValue().equals("OutCompanyOrNot")) {
                    if (dataList[i - startRow].get(entry.getValue()).toString().equals("1")) {
                        cell.setCellValue("是");
                    } else {
                        cell.setCellValue("否");
                    }

                } else if (entry.getValue().equals("IsRetire")) {
                    if (dataList[i - startRow].get(entry.getValue()).toString().equals("1")) {
                        cell.setCellValue("是");
                    } else {
                        cell.setCellValue("否");
                    }

                } else if (entry.getValue().equals("JoinCompanyDate")) {
                    if (dataList[i - startRow].get(entry.getValue()) == null || dataList[i - startRow].get(entry.getValue()).toString().equals("1970-01-01")) {
                        cell.setCellValue("");
                    } else {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    }


                } else if (entry.getValue().equals("OutCompanyDate")) {
                    if (dataList[i - startRow].get(entry.getValue()) == null || dataList[i - startRow].get(entry.getValue()).toString().equals("1970-01-01")) {
                        cell.setCellValue("");
                    } else {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    }


                } else if (entry.getValue().equals("RetireTime")) {
                    if (dataList[i - startRow].get(entry.getValue()) == null || dataList[i - startRow].get(entry.getValue()).toString().equals("1970-01-01")) {
                        cell.setCellValue("");
                    } else {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    }


                } else if (entry.getValue().equals("EmployeeBirth")) {
                    if (dataList[i - startRow].get(entry.getValue()) == null || dataList[i - startRow].get(entry.getValue()).toString().equals("1970-01-01")) {
                        cell.setCellValue("");
                    } else {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    }

                } else if(entry.getValue().equals("EmployeeTel")){
                    if (dataList[i - startRow].get(entry.getValue()) == null) {
                        cell.setCellValue("");
                    } else {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    }
                }else if(entry.getValue().equals("EmployeeIDNum")){
                    if (dataList[i - startRow].get(entry.getValue()) == null) {
                        cell.setCellValue("");
                    } else {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    }
                }
                else {
                    try {
                        cell.setCellValue(dataList[i - startRow].get(entry.getValue()).toString());
                    } catch (NullPointerException e) {
                        // TODO: handle exception
                        cell.setCellValue("");
                    }

                }
                j++;

            }
        }
        for (int i = 0; i < columnHead.size(); i++) {
            sheet.setColumnWidth(i, 3500);
        }
        sheet.setColumnWidth(0, 2000);

        HSSFCellStyle titlestyle = wb.createCellStyle();
        titlestyle.setBorderLeft(BorderStyle.THIN);
        titlestyle.setBorderRight(BorderStyle.THIN);
        titlestyle.setBorderTop(BorderStyle.THIN);
        titlestyle.setBorderBottom(BorderStyle.THIN);
        titlestyle.setWrapText(true);
        titlestyle.setAlignment(CENTER);
        titlestyle.setVerticalAlignment(VerticalAlignment.CENTER);
        HSSFFont titlefont = wb.createFont();
        titlefont.setFontName("宋体");
        titlefont.setFontHeightInPoints((short) 16);
        titlefont.setBold(true);
        titlestyle.setFont(titlefont);
        for (int i = 0; i < columnHead.size(); i++) {
            sheet.getRow(0).getCell(i).setCellStyle(titlestyle);
        }
        sheet.getRow(0).setHeightInPoints((short) 16);

        HSSFCellStyle headstyle = wb.createCellStyle();
        headstyle.cloneStyleFrom(titlestyle);
        HSSFFont headfont = wb.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short) 12);
        headfont.setBold(true);
        headstyle.setFont(headfont);
        for (int i = 0; i < columnHead.size(); i++) {
            sheet.getRow(2).getCell(i).setCellStyle(headstyle);
        }

        HSSFCellStyle datastyle = wb.createCellStyle();
        datastyle.cloneStyleFrom(titlestyle);
        HSSFFont datafont = wb.createFont();
        datafont.setFontName("宋体");
        datafont.setFontHeightInPoints((short) 12);
        datastyle.setFont(datafont);
        for (int i = 0; i < columnHead.size(); i++) {
            sheet.getRow(1).getCell(i).setCellStyle(datastyle);
        }

        for (int i = 3; i < 3 + dataList.length; i++) {
            for (int j = 0; j < columnHead.size(); j++) {
                sheet.getRow(i).getCell(j).setCellStyle(datastyle);
            }

        }

        String filename = fileName + ".xls";
        response.setContentType("application/ms-excel;charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=".concat(String.valueOf(URLEncoder.encode(filename, "UTF-8"))));
        OutputStream out = response.getOutputStream();
        try {
            wb.write(out);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            out.close();
            wb.close();
        }

    }

    public List<Map<String, Object>> getEmployeeByInstitutionNum(String institution_num){
	    return etm.getEmployeeByInstitutionNum(institution_num);
    }
}
