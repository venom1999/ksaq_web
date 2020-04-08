package com.kuangshan.riskcontrol.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class RollEducationTExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public RollEducationTExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andRoll_education_idIsNull() {
            addCriterion("roll_education_id is null");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idIsNotNull() {
            addCriterion("roll_education_id is not null");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idEqualTo(Integer value) {
            addCriterion("roll_education_id =", value, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idNotEqualTo(Integer value) {
            addCriterion("roll_education_id <>", value, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idGreaterThan(Integer value) {
            addCriterion("roll_education_id >", value, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idGreaterThanOrEqualTo(Integer value) {
            addCriterion("roll_education_id >=", value, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idLessThan(Integer value) {
            addCriterion("roll_education_id <", value, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idLessThanOrEqualTo(Integer value) {
            addCriterion("roll_education_id <=", value, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idIn(List<Integer> values) {
            addCriterion("roll_education_id in", values, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idNotIn(List<Integer> values) {
            addCriterion("roll_education_id not in", values, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idBetween(Integer value1, Integer value2) {
            addCriterion("roll_education_id between", value1, value2, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andRoll_education_idNotBetween(Integer value1, Integer value2) {
            addCriterion("roll_education_id not between", value1, value2, "roll_education_id");
            return (Criteria) this;
        }

        public Criteria andEmployee_numIsNull() {
            addCriterion("employee_num is null");
            return (Criteria) this;
        }

        public Criteria andEmployee_numIsNotNull() {
            addCriterion("employee_num is not null");
            return (Criteria) this;
        }

        public Criteria andEmployee_numEqualTo(String value) {
            addCriterion("employee_num =", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numNotEqualTo(String value) {
            addCriterion("employee_num <>", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numGreaterThan(String value) {
            addCriterion("employee_num >", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numGreaterThanOrEqualTo(String value) {
            addCriterion("employee_num >=", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numLessThan(String value) {
            addCriterion("employee_num <", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numLessThanOrEqualTo(String value) {
            addCriterion("employee_num <=", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numLike(String value) {
            addCriterion("employee_num like", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numNotLike(String value) {
            addCriterion("employee_num not like", value, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numIn(List<String> values) {
            addCriterion("employee_num in", values, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numNotIn(List<String> values) {
            addCriterion("employee_num not in", values, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numBetween(String value1, String value2) {
            addCriterion("employee_num between", value1, value2, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEmployee_numNotBetween(String value1, String value2) {
            addCriterion("employee_num not between", value1, value2, "employee_num");
            return (Criteria) this;
        }

        public Criteria andEducation_idIsNull() {
            addCriterion("education_id is null");
            return (Criteria) this;
        }

        public Criteria andEducation_idIsNotNull() {
            addCriterion("education_id is not null");
            return (Criteria) this;
        }

        public Criteria andEducation_idEqualTo(Integer value) {
            addCriterion("education_id =", value, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idNotEqualTo(Integer value) {
            addCriterion("education_id <>", value, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idGreaterThan(Integer value) {
            addCriterion("education_id >", value, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idGreaterThanOrEqualTo(Integer value) {
            addCriterion("education_id >=", value, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idLessThan(Integer value) {
            addCriterion("education_id <", value, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idLessThanOrEqualTo(Integer value) {
            addCriterion("education_id <=", value, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idIn(List<Integer> values) {
            addCriterion("education_id in", values, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idNotIn(List<Integer> values) {
            addCriterion("education_id not in", values, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idBetween(Integer value1, Integer value2) {
            addCriterion("education_id between", value1, value2, "education_id");
            return (Criteria) this;
        }

        public Criteria andEducation_idNotBetween(Integer value1, Integer value2) {
            addCriterion("education_id not between", value1, value2, "education_id");
            return (Criteria) this;
        }

        public Criteria andTest_idIsNull() {
            addCriterion("test_id is null");
            return (Criteria) this;
        }

        public Criteria andTest_idIsNotNull() {
            addCriterion("test_id is not null");
            return (Criteria) this;
        }

        public Criteria andTest_idEqualTo(Integer value) {
            addCriterion("test_id =", value, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idNotEqualTo(Integer value) {
            addCriterion("test_id <>", value, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idGreaterThan(Integer value) {
            addCriterion("test_id >", value, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idGreaterThanOrEqualTo(Integer value) {
            addCriterion("test_id >=", value, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idLessThan(Integer value) {
            addCriterion("test_id <", value, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idLessThanOrEqualTo(Integer value) {
            addCriterion("test_id <=", value, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idIn(List<Integer> values) {
            addCriterion("test_id in", values, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idNotIn(List<Integer> values) {
            addCriterion("test_id not in", values, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idBetween(Integer value1, Integer value2) {
            addCriterion("test_id between", value1, value2, "test_id");
            return (Criteria) this;
        }

        public Criteria andTest_idNotBetween(Integer value1, Integer value2) {
            addCriterion("test_id not between", value1, value2, "test_id");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdIsNull() {
            addCriterion("examinee_pwd is null");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdIsNotNull() {
            addCriterion("examinee_pwd is not null");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdEqualTo(String value) {
            addCriterion("examinee_pwd =", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdNotEqualTo(String value) {
            addCriterion("examinee_pwd <>", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdGreaterThan(String value) {
            addCriterion("examinee_pwd >", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdGreaterThanOrEqualTo(String value) {
            addCriterion("examinee_pwd >=", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdLessThan(String value) {
            addCriterion("examinee_pwd <", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdLessThanOrEqualTo(String value) {
            addCriterion("examinee_pwd <=", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdLike(String value) {
            addCriterion("examinee_pwd like", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdNotLike(String value) {
            addCriterion("examinee_pwd not like", value, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdIn(List<String> values) {
            addCriterion("examinee_pwd in", values, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdNotIn(List<String> values) {
            addCriterion("examinee_pwd not in", values, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdBetween(String value1, String value2) {
            addCriterion("examinee_pwd between", value1, value2, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andExaminee_pwdNotBetween(String value1, String value2) {
            addCriterion("examinee_pwd not between", value1, value2, "examinee_pwd");
            return (Criteria) this;
        }

        public Criteria andScoreIsNull() {
            addCriterion("score is null");
            return (Criteria) this;
        }

        public Criteria andScoreIsNotNull() {
            addCriterion("score is not null");
            return (Criteria) this;
        }

        public Criteria andScoreEqualTo(BigDecimal value) {
            addCriterion("score =", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotEqualTo(BigDecimal value) {
            addCriterion("score <>", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThan(BigDecimal value) {
            addCriterion("score >", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("score >=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThan(BigDecimal value) {
            addCriterion("score <", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThanOrEqualTo(BigDecimal value) {
            addCriterion("score <=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreIn(List<BigDecimal> values) {
            addCriterion("score in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotIn(List<BigDecimal> values) {
            addCriterion("score not in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("score between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("score not between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeIsNull() {
            addCriterion("test_submit_time is null");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeIsNotNull() {
            addCriterion("test_submit_time is not null");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeEqualTo(Date value) {
            addCriterion("test_submit_time =", value, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeNotEqualTo(Date value) {
            addCriterion("test_submit_time <>", value, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeGreaterThan(Date value) {
            addCriterion("test_submit_time >", value, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeGreaterThanOrEqualTo(Date value) {
            addCriterion("test_submit_time >=", value, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeLessThan(Date value) {
            addCriterion("test_submit_time <", value, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeLessThanOrEqualTo(Date value) {
            addCriterion("test_submit_time <=", value, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeIn(List<Date> values) {
            addCriterion("test_submit_time in", values, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeNotIn(List<Date> values) {
            addCriterion("test_submit_time not in", values, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeBetween(Date value1, Date value2) {
            addCriterion("test_submit_time between", value1, value2, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andTest_submit_timeNotBetween(Date value1, Date value2) {
            addCriterion("test_submit_time not between", value1, value2, "test_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeIsNull() {
            addCriterion("makeup_grade is null");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeIsNotNull() {
            addCriterion("makeup_grade is not null");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeEqualTo(BigDecimal value) {
            addCriterion("makeup_grade =", value, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeNotEqualTo(BigDecimal value) {
            addCriterion("makeup_grade <>", value, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeGreaterThan(BigDecimal value) {
            addCriterion("makeup_grade >", value, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("makeup_grade >=", value, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeLessThan(BigDecimal value) {
            addCriterion("makeup_grade <", value, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeLessThanOrEqualTo(BigDecimal value) {
            addCriterion("makeup_grade <=", value, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeIn(List<BigDecimal> values) {
            addCriterion("makeup_grade in", values, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeNotIn(List<BigDecimal> values) {
            addCriterion("makeup_grade not in", values, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("makeup_grade between", value1, value2, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_gradeNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("makeup_grade not between", value1, value2, "makeup_grade");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeIsNull() {
            addCriterion("makeup_submit_time is null");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeIsNotNull() {
            addCriterion("makeup_submit_time is not null");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeEqualTo(Date value) {
            addCriterion("makeup_submit_time =", value, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeNotEqualTo(Date value) {
            addCriterion("makeup_submit_time <>", value, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeGreaterThan(Date value) {
            addCriterion("makeup_submit_time >", value, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeGreaterThanOrEqualTo(Date value) {
            addCriterion("makeup_submit_time >=", value, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeLessThan(Date value) {
            addCriterion("makeup_submit_time <", value, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeLessThanOrEqualTo(Date value) {
            addCriterion("makeup_submit_time <=", value, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeIn(List<Date> values) {
            addCriterion("makeup_submit_time in", values, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeNotIn(List<Date> values) {
            addCriterion("makeup_submit_time not in", values, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeBetween(Date value1, Date value2) {
            addCriterion("makeup_submit_time between", value1, value2, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andMakeup_submit_timeNotBetween(Date value1, Date value2) {
            addCriterion("makeup_submit_time not between", value1, value2, "makeup_submit_time");
            return (Criteria) this;
        }

        public Criteria andScore_modeIsNull() {
            addCriterion("score_mode is null");
            return (Criteria) this;
        }

        public Criteria andScore_modeIsNotNull() {
            addCriterion("score_mode is not null");
            return (Criteria) this;
        }

        public Criteria andScore_modeEqualTo(String value) {
            addCriterion("score_mode =", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeNotEqualTo(String value) {
            addCriterion("score_mode <>", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeGreaterThan(String value) {
            addCriterion("score_mode >", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeGreaterThanOrEqualTo(String value) {
            addCriterion("score_mode >=", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeLessThan(String value) {
            addCriterion("score_mode <", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeLessThanOrEqualTo(String value) {
            addCriterion("score_mode <=", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeLike(String value) {
            addCriterion("score_mode like", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeNotLike(String value) {
            addCriterion("score_mode not like", value, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeIn(List<String> values) {
            addCriterion("score_mode in", values, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeNotIn(List<String> values) {
            addCriterion("score_mode not in", values, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeBetween(String value1, String value2) {
            addCriterion("score_mode between", value1, value2, "score_mode");
            return (Criteria) this;
        }

        public Criteria andScore_modeNotBetween(String value1, String value2) {
            addCriterion("score_mode not between", value1, value2, "score_mode");
            return (Criteria) this;
        }

        public Criteria andIs_finishedIsNull() {
            addCriterion("is_finished is null");
            return (Criteria) this;
        }

        public Criteria andIs_finishedIsNotNull() {
            addCriterion("is_finished is not null");
            return (Criteria) this;
        }

        public Criteria andIs_finishedEqualTo(Integer value) {
            addCriterion("is_finished =", value, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedNotEqualTo(Integer value) {
            addCriterion("is_finished <>", value, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedGreaterThan(Integer value) {
            addCriterion("is_finished >", value, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_finished >=", value, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedLessThan(Integer value) {
            addCriterion("is_finished <", value, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedLessThanOrEqualTo(Integer value) {
            addCriterion("is_finished <=", value, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedIn(List<Integer> values) {
            addCriterion("is_finished in", values, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedNotIn(List<Integer> values) {
            addCriterion("is_finished not in", values, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedBetween(Integer value1, Integer value2) {
            addCriterion("is_finished between", value1, value2, "is_finished");
            return (Criteria) this;
        }

        public Criteria andIs_finishedNotBetween(Integer value1, Integer value2) {
            addCriterion("is_finished not between", value1, value2, "is_finished");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table roll_education_t
     *
     * @mbg.generated do_not_delete_during_merge Thu Mar 05 16:03:08 CST 2020
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table roll_education_t
     *
     * @mbg.generated Thu Mar 05 16:03:08 CST 2020
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}