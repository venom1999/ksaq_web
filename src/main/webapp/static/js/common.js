

/**
 * 判断用户输入的条件是否存在SQL注入风险
 * @param conditions 用户输入的条件
 * @returns {boolean} 是否存在SQL注入风险
 */
function isSQLValid( conditions ) {
    let rules = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|"
        + "(\\b(select|update|union|and|or|delete|insert|trancate|char|into|" +
        "substr|ascii|declare|exec|count|master|into|drop|execute)\\b)";

    let reg = new RegExp(rules);
    return reg.test(conditions);
}