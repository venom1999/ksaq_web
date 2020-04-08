
package com.kuangshan.riskcontrol.tool;
import java.beans.PropertyEditor;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.core.GenericCollectionTypeResolver;
import org.springframework.core.MethodParameter;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ValueConstants;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver;
import org.springframework.web.method.support.UriComponentsContributor;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.WebUtils;

public class RequestParamMethodArgumentResolver extends AbstractNamedValueMethodArgumentResolver
        implements UriComponentsContributor {

    private static final TypeDescriptor STRING_TYPE_DESCRIPTOR = TypeDescriptor.valueOf(String.class);

    private final boolean useDefaultResolution;

    public RequestParamMethodArgumentResolver() {
        this.useDefaultResolution = true;
    }

    public RequestParamMethodArgumentResolver(boolean useDefaultResolution) {
        this.useDefaultResolution = useDefaultResolution;
    }

    public RequestParamMethodArgumentResolver(ConfigurableBeanFactory beanFactory, boolean useDefaultResolution) {
        super(beanFactory);
        this.useDefaultResolution = useDefaultResolution;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        Class<?> paramType = parameter.getParameterType();
        if (parameter.hasParameterAnnotation(RequestParam.class)) {
            if (Map.class.isAssignableFrom(paramType)) {
                String paramName = parameter.getParameterAnnotation(RequestParam.class).name();
                return StringUtils.hasText(paramName);
            }
            else {
                return true;
            }
        }
        else {
            if (parameter.hasParameterAnnotation(RequestPart.class)) {
                return false;
            }
            else if (MultipartFile.class == paramType || "javax.servlet.http.Part".equals(paramType.getName())) {
                return true;
            }
            else if (this.useDefaultResolution) {
                return BeanUtils.isSimpleProperty(paramType);
            }
            else {
                return false;
            }
        }
    }

    @Override
    protected NamedValueInfo createNamedValueInfo(MethodParameter parameter) {
        RequestParam ann = parameter.getParameterAnnotation(RequestParam.class);
        return (ann != null ? new RequestParamNamedValueInfo(ann) : new RequestParamNamedValueInfo());
    }

    @Override
    protected Object resolveName(String name, MethodParameter parameter, NativeWebRequest webRequest) throws Exception {
        HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        MultipartHttpServletRequest multipartRequest =
                WebUtils.getNativeRequest(servletRequest, MultipartHttpServletRequest.class);
        Object arg;

        if (MultipartFile.class == parameter.getParameterType()) {
            assertIsMultipartRequest(servletRequest);
            Assert.notNull(multipartRequest, "Expected MultipartHttpServletRequest: is a MultipartResolver configured?");
            arg = multipartRequest.getFile(name);
        }
        else if (isMultipartFileCollection(parameter)) {
            assertIsMultipartRequest(servletRequest);
            Assert.notNull(multipartRequest, "Expected MultipartHttpServletRequest: is a MultipartResolver configured?");
            arg = multipartRequest.getFiles(name);
        }
        else if (isMultipartFileArray(parameter)) {
            assertIsMultipartRequest(servletRequest);
            Assert.notNull(multipartRequest, "Expected MultipartHttpServletRequest: is a MultipartResolver configured?");
            List<MultipartFile> multipartFiles = multipartRequest.getFiles(name);
            arg = multipartFiles.toArray(new MultipartFile[multipartFiles.size()]);
        }
        else if ("javax.servlet.http.Part".equals(parameter.getParameterType().getName())) {
            assertIsMultipartRequest(servletRequest);
            arg = servletRequest.getPart(name);
        }
        else if (isPartCollection(parameter)) {
            assertIsMultipartRequest(servletRequest);
            arg = new ArrayList<Object>(servletRequest.getParts());
        }
        else if (isPartArray(parameter)) {
            assertIsMultipartRequest(servletRequest);
            arg = RequestPartResolver.resolvePart(servletRequest);
        }
        else {
            arg = null;
            if (multipartRequest != null) {
                List<MultipartFile> files = multipartRequest.getFiles(name);
                if (!files.isEmpty()) {
                    arg = (files.size() == 1 ? files.get(0) : files);
                }
            }
            if (arg == null) {
                String[] paramValues = webRequest.getParameterValues(name);
                if (paramValues != null) {
//                    System.out.println("resolver:"+paramValues[0]);
                    arg = (paramValues.length == 1 ? RequestFilter.xssFilter(AES.Decrypt(paramValues[0],AES.KEY)) : paramValues);
                }
            }
        }

        return arg;
    }

    private void assertIsMultipartRequest(HttpServletRequest request) {
        String contentType = request.getContentType();
        if (contentType == null || !contentType.toLowerCase().startsWith("multipart/")) {
            throw new MultipartException("The current request is not a multipart request");
        }
    }

    private boolean isMultipartFileCollection(MethodParameter parameter) {
        return (MultipartFile.class == getCollectionParameterType(parameter));
    }

    private boolean isMultipartFileArray(MethodParameter parameter) {
        return (MultipartFile.class == parameter.getParameterType().getComponentType());
    }

    private boolean isPartCollection(MethodParameter parameter) {
        Class<?> collectionType = getCollectionParameterType(parameter);
        return (collectionType != null && "javax.servlet.http.Part".equals(collectionType.getName()));
    }

    private boolean isPartArray(MethodParameter parameter) {
        Class<?> paramType = parameter.getParameterType().getComponentType();
        return (paramType != null && "javax.servlet.http.Part".equals(paramType.getName()));
    }

    private Class<?> getCollectionParameterType(MethodParameter parameter) {
        Class<?> paramType = parameter.getParameterType();
        if (Collection.class == paramType || List.class.isAssignableFrom(paramType)){
            Class<?> valueType = GenericCollectionTypeResolver.getCollectionParameterType(parameter);
            if (valueType != null) {
                return valueType;
            }
        }
        return null;
    }

    @Override
    protected void handleMissingValue(String name, MethodParameter parameter) throws ServletException {
        throw new MissingServletRequestParameterException(name, parameter.getParameterType().getSimpleName());
    }

    @Override
    public void contributeMethodArgument(MethodParameter parameter, Object value,
                                         UriComponentsBuilder builder, Map<String, Object> uriVariables, ConversionService conversionService) {

        Class<?> paramType = parameter.getParameterType();
        if (Map.class.isAssignableFrom(paramType) || MultipartFile.class == paramType ||
                "javax.servlet.http.Part".equals(paramType.getName())) {
            return;
        }

        RequestParam requestParam = parameter.getParameterAnnotation(RequestParam.class);
        String name = (requestParam == null || StringUtils.isEmpty(requestParam.name()) ?
                parameter.getParameterName() : requestParam.name());

        if (value == null) {
            builder.queryParam(name);
        }
        else if (value instanceof Collection) {
            for (Object element : (Collection<?>) value) {
                element = formatUriValue(conversionService, TypeDescriptor.nested(parameter, 1), element);
                builder.queryParam(name, element);
            }
        }
        else {
            builder.queryParam(name, formatUriValue(conversionService, new TypeDescriptor(parameter), value));
        }
    }

    protected String formatUriValue(ConversionService cs, TypeDescriptor sourceType, Object value) {
        if (value == null) {
            return null;
        }
        else if (value instanceof String) {
            return (String) value;
        }
        else if (cs != null) {
            return (String) cs.convert(value, sourceType, STRING_TYPE_DESCRIPTOR);
        }
        else {
            return value.toString();
        }
    }


    private static class RequestParamNamedValueInfo extends NamedValueInfo {

        public RequestParamNamedValueInfo() {
            super("", false, ValueConstants.DEFAULT_NONE);
        }

        public RequestParamNamedValueInfo(RequestParam annotation) {
            super(annotation.name(), annotation.required(), annotation.defaultValue());
        }
    }


    private static class RequestPartResolver {

        public static Object resolvePart(HttpServletRequest servletRequest) throws Exception {
            return servletRequest.getParts().toArray(new Part[servletRequest.getParts().size()]);
        }
    }

}
