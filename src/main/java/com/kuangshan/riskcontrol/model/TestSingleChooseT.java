package com.kuangshan.riskcontrol.model;

public class TestSingleChooseT {

    private Integer single_choose_id;


    private Integer edu_category_id;


    private Integer edu_knowledge_point_id;


    private String choose_content;


    private String single_choose_a;


    private String single_choose_b;


    private String single_choose_c;


    private String single_choose_d;


    private String answer;


    private Integer deleted;


    private String explanation;


    public Integer getSingle_choose_id() {
        return single_choose_id;
    }


    public void setSingle_choose_id(Integer single_choose_id) {
        this.single_choose_id = single_choose_id;
    }


    public Integer getEdu_category_id() {
        return edu_category_id;
    }


    public void setEdu_category_id(Integer edu_category_id) {
        this.edu_category_id = edu_category_id;
    }


    public Integer getEdu_knowledge_point_id() {
        return edu_knowledge_point_id;
    }


    public void setEdu_knowledge_point_id(Integer edu_knowledge_point_id) {
        this.edu_knowledge_point_id = edu_knowledge_point_id;
    }


    public String getChoose_content() {
        return choose_content;
    }


    public void setChoose_content(String choose_content) {
        this.choose_content = choose_content;
    }


    public String getSingle_choose_a() {
        return single_choose_a;
    }


    public void setSingle_choose_a(String single_choose_a) {
        this.single_choose_a = single_choose_a;
    }


    public String getSingle_choose_b() {
        return single_choose_b;
    }


    public void setSingle_choose_b(String single_choose_b) {
        this.single_choose_b = single_choose_b;
    }


    public String getSingle_choose_c() {
        return single_choose_c;
    }


    public void setSingle_choose_c(String single_choose_c) {
        this.single_choose_c = single_choose_c;
    }


    public String getSingle_choose_d() {
        return single_choose_d;
    }


    public void setSingle_choose_d(String single_choose_d) {
        this.single_choose_d = single_choose_d;
    }


    public String getAnswer() {
        return answer;
    }


    public void setAnswer(String answer) {
        this.answer = answer;
    }


    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    @Override
    public String toString() {
        return "TestSingleChooseT{" +
                "single_choose_id=" + single_choose_id +
                ", edu_category_id=" + edu_category_id +
                ", edu_knowledge_point_id=" + edu_knowledge_point_id +
                ", choose_content='" + choose_content + '\'' +
                ", single_choose_a='" + single_choose_a + '\'' +
                ", single_choose_b='" + single_choose_b + '\'' +
                ", single_choose_c='" + single_choose_c + '\'' +
                ", single_choose_d='" + single_choose_d + '\'' +
                ", answer='" + answer + '\'' +
                ", deleted=" + deleted +
                ", explanation='" + explanation + '\'' +
                '}';
    }



}