//package com.example.apigateway.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsWebFilter;
//import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
////@Configuration
////public class CorsGlobalConfiguration {
////
////    @Value("${frontend.url}")
////    private String FRONTEND_URL;
////
////    @Bean
////    public CorsWebFilter corsWebFilter() {
////        CorsConfiguration config = new CorsConfiguration();
////        config.addAllowedOrigin(FRONTEND_URL);
////        config.addAllowedMethod("*");
////        config.addAllowedHeader("*");
////        config.setAllowCredentials(true);
////
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        source.registerCorsConfiguration("/**", config);
////
////        return new CorsWebFilter(source);
////    }
////}
//
//@Configuration
//public class CorsGlobalConfiguration {
//
//    @Value("${frontend.url}")
//    private String FRONTEND_URL;
//
//    @Bean
//    public CorsWebFilter corsWebFilter() {
//        CorsConfiguration corsConfig = new CorsConfiguration();
//        corsConfig.setAllowedOrigins(List.of(FRONTEND_URL));
//        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
////        corsConfig.setAllowedHeaders(List.of("*"));
////        corsConfig.setAllowCredentials(false);
//        corsConfig.setAllowCredentials(true);
//        corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", corsConfig);
//
//        return new CorsWebFilter(source);
//    }
//}