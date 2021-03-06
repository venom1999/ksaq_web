package com.kuangshan.riskcontrol.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EducationResourceTExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public EducationResourceTExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
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
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
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

        public Criteria andEdu_resource_idIsNull() {
            addCriterion("edu_resource_id is null");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idIsNotNull() {
            addCriterion("edu_resource_id is not null");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idEqualTo(Integer value) {
            addCriterion("edu_resource_id =", value, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idNotEqualTo(Integer value) {
            addCriterion("edu_resource_id <>", value, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idGreaterThan(Integer value) {
            addCriterion("edu_resource_id >", value, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idGreaterThanOrEqualTo(Integer value) {
            addCriterion("edu_resource_id >=", value, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idLessThan(Integer value) {
            addCriterion("edu_resource_id <", value, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idLessThanOrEqualTo(Integer value) {
            addCriterion("edu_resource_id <=", value, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idIn(List<Integer> values) {
            addCriterion("edu_resource_id in", values, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idNotIn(List<Integer> values) {
            addCriterion("edu_resource_id not in", values, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idBetween(Integer value1, Integer value2) {
            addCriterion("edu_resource_id between", value1, value2, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andEdu_resource_idNotBetween(Integer value1, Integer value2) {
            addCriterion("edu_resource_id not between", value1, value2, "edu_resource_id");
            return (Criteria) this;
        }

        public Criteria andResource_categoryIsNull() {
            addCriterion("resource_category is null");
            return (Criteria) this;
        }

        public Criteria andResource_categoryIsNotNull() {
            addCriterion("resource_category is not null");
            return (Criteria) this;
        }

        public Criteria andResource_categoryEqualTo(Integer value) {
            addCriterion("resource_category =", value, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryNotEqualTo(Integer value) {
            addCriterion("resource_category <>", value, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryGreaterThan(Integer value) {
            addCriterion("resource_category >", value, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryGreaterThanOrEqualTo(Integer value) {
            addCriterion("resource_category >=", value, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryLessThan(Integer value) {
            addCriterion("resource_category <", value, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryLessThanOrEqualTo(Integer value) {
            addCriterion("resource_category <=", value, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryIn(List<Integer> values) {
            addCriterion("resource_category in", values, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryNotIn(List<Integer> values) {
            addCriterion("resource_category not in", values, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryBetween(Integer value1, Integer value2) {
            addCriterion("resource_category between", value1, value2, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_categoryNotBetween(Integer value1, Integer value2) {
            addCriterion("resource_category not between", value1, value2, "resource_category");
            return (Criteria) this;
        }

        public Criteria andResource_nameIsNull() {
            addCriterion("resource_name is null");
            return (Criteria) this;
        }

        public Criteria andResource_nameIsNotNull() {
            addCriterion("resource_name is not null");
            return (Criteria) this;
        }

        public Criteria andResource_nameEqualTo(String value) {
            addCriterion("resource_name =", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameNotEqualTo(String value) {
            addCriterion("resource_name <>", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameGreaterThan(String value) {
            addCriterion("resource_name >", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameGreaterThanOrEqualTo(String value) {
            addCriterion("resource_name >=", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameLessThan(String value) {
            addCriterion("resource_name <", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameLessThanOrEqualTo(String value) {
            addCriterion("resource_name <=", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameLike(String value) {
            addCriterion("resource_name like", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameNotLike(String value) {
            addCriterion("resource_name not like", value, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameIn(List<String> values) {
            addCriterion("resource_name in", values, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameNotIn(List<String> values) {
            addCriterion("resource_name not in", values, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameBetween(String value1, String value2) {
            addCriterion("resource_name between", value1, value2, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_nameNotBetween(String value1, String value2) {
            addCriterion("resource_name not between", value1, value2, "resource_name");
            return (Criteria) this;
        }

        public Criteria andResource_introductionIsNull() {
            addCriterion("resource_introduction is null");
            return (Criteria) this;
        }

        public Criteria andResource_introductionIsNotNull() {
            addCriterion("resource_introduction is not null");
            return (Criteria) this;
        }

        public Criteria andResource_introductionEqualTo(String value) {
            addCriterion("resource_introduction =", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionNotEqualTo(String value) {
            addCriterion("resource_introduction <>", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionGreaterThan(String value) {
            addCriterion("resource_introduction >", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionGreaterThanOrEqualTo(String value) {
            addCriterion("resource_introduction >=", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionLessThan(String value) {
            addCriterion("resource_introduction <", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionLessThanOrEqualTo(String value) {
            addCriterion("resource_introduction <=", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionLike(String value) {
            addCriterion("resource_introduction like", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionNotLike(String value) {
            addCriterion("resource_introduction not like", value, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionIn(List<String> values) {
            addCriterion("resource_introduction in", values, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionNotIn(List<String> values) {
            addCriterion("resource_introduction not in", values, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionBetween(String value1, String value2) {
            addCriterion("resource_introduction between", value1, value2, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andResource_introductionNotBetween(String value1, String value2) {
            addCriterion("resource_introduction not between", value1, value2, "resource_introduction");
            return (Criteria) this;
        }

        public Criteria andIs_releasedIsNull() {
            addCriterion("is_released is null");
            return (Criteria) this;
        }

        public Criteria andIs_releasedIsNotNull() {
            addCriterion("is_released is not null");
            return (Criteria) this;
        }

        public Criteria andIs_releasedEqualTo(Integer value) {
            addCriterion("is_released =", value, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedNotEqualTo(Integer value) {
            addCriterion("is_released <>", value, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedGreaterThan(Integer value) {
            addCriterion("is_released >", value, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_released >=", value, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedLessThan(Integer value) {
            addCriterion("is_released <", value, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedLessThanOrEqualTo(Integer value) {
            addCriterion("is_released <=", value, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedIn(List<Integer> values) {
            addCriterion("is_released in", values, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedNotIn(List<Integer> values) {
            addCriterion("is_released not in", values, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedBetween(Integer value1, Integer value2) {
            addCriterion("is_released between", value1, value2, "is_released");
            return (Criteria) this;
        }

        public Criteria andIs_releasedNotBetween(Integer value1, Integer value2) {
            addCriterion("is_released not between", value1, value2, "is_released");
            return (Criteria) this;
        }

        public Criteria andResource_creditIsNull() {
            addCriterion("resource_credit is null");
            return (Criteria) this;
        }

        public Criteria andResource_creditIsNotNull() {
            addCriterion("resource_credit is not null");
            return (Criteria) this;
        }

        public Criteria andResource_creditEqualTo(Integer value) {
            addCriterion("resource_credit =", value, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditNotEqualTo(Integer value) {
            addCriterion("resource_credit <>", value, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditGreaterThan(Integer value) {
            addCriterion("resource_credit >", value, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditGreaterThanOrEqualTo(Integer value) {
            addCriterion("resource_credit >=", value, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditLessThan(Integer value) {
            addCriterion("resource_credit <", value, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditLessThanOrEqualTo(Integer value) {
            addCriterion("resource_credit <=", value, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditIn(List<Integer> values) {
            addCriterion("resource_credit in", values, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditNotIn(List<Integer> values) {
            addCriterion("resource_credit not in", values, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditBetween(Integer value1, Integer value2) {
            addCriterion("resource_credit between", value1, value2, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andResource_creditNotBetween(Integer value1, Integer value2) {
            addCriterion("resource_credit not between", value1, value2, "resource_credit");
            return (Criteria) this;
        }

        public Criteria andUpload_personIsNull() {
            addCriterion("upload_person is null");
            return (Criteria) this;
        }

        public Criteria andUpload_personIsNotNull() {
            addCriterion("upload_person is not null");
            return (Criteria) this;
        }

        public Criteria andUpload_personEqualTo(String value) {
            addCriterion("upload_person =", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personNotEqualTo(String value) {
            addCriterion("upload_person <>", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personGreaterThan(String value) {
            addCriterion("upload_person >", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personGreaterThanOrEqualTo(String value) {
            addCriterion("upload_person >=", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personLessThan(String value) {
            addCriterion("upload_person <", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personLessThanOrEqualTo(String value) {
            addCriterion("upload_person <=", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personLike(String value) {
            addCriterion("upload_person like", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personNotLike(String value) {
            addCriterion("upload_person not like", value, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personIn(List<String> values) {
            addCriterion("upload_person in", values, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personNotIn(List<String> values) {
            addCriterion("upload_person not in", values, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personBetween(String value1, String value2) {
            addCriterion("upload_person between", value1, value2, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_personNotBetween(String value1, String value2) {
            addCriterion("upload_person not between", value1, value2, "upload_person");
            return (Criteria) this;
        }

        public Criteria andUpload_timeIsNull() {
            addCriterion("upload_time is null");
            return (Criteria) this;
        }

        public Criteria andUpload_timeIsNotNull() {
            addCriterion("upload_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpload_timeEqualTo(Date value) {
            addCriterion("upload_time =", value, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeNotEqualTo(Date value) {
            addCriterion("upload_time <>", value, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeGreaterThan(Date value) {
            addCriterion("upload_time >", value, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeGreaterThanOrEqualTo(Date value) {
            addCriterion("upload_time >=", value, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeLessThan(Date value) {
            addCriterion("upload_time <", value, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeLessThanOrEqualTo(Date value) {
            addCriterion("upload_time <=", value, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeIn(List<Date> values) {
            addCriterion("upload_time in", values, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeNotIn(List<Date> values) {
            addCriterion("upload_time not in", values, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeBetween(Date value1, Date value2) {
            addCriterion("upload_time between", value1, value2, "upload_time");
            return (Criteria) this;
        }

        public Criteria andUpload_timeNotBetween(Date value1, Date value2) {
            addCriterion("upload_time not between", value1, value2, "upload_time");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table education_resource_t
     *
     * @mbg.generated do_not_delete_during_merge Tue Jan 14 16:26:03 CST 2020
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table education_resource_t
     *
     * @mbg.generated Tue Jan 14 16:26:03 CST 2020
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