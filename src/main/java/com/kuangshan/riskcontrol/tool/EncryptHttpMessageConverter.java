package com.kuangshan.riskcontrol.tool;

import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.http.converter.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.*;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class EncryptHttpMessageConverter extends MappingJackson2HttpMessageConverter {
    @Override
    protected void writeInternal(Object object, Type type, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        if(object instanceof String){
            StreamUtils.copy((String)object, DEFAULT_CHARSET, outputMessage.getBody());
        }else{
            super.writeInternal(object, type, outputMessage);
        }
    }
}
