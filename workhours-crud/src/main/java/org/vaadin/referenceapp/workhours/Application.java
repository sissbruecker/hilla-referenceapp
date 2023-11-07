package org.vaadin.referenceapp.workhours;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;
import org.vaadin.referenceapp.workhours.domain.primitives.UserId;

import java.util.Optional;

/**
 * The entry point of the Spring Boot application.
 * <p>
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@SpringBootApplication
@Theme(value = "workhours-crud")
@EnableJpaAuditing
public class Application implements AppShellConfigurator {

    @Bean
    public AuditorAware<UserId> auditorProvider() {
        return () -> {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                return Optional.empty();
            } else {
                return Optional.of(UserId.fromString(authentication.getName()));
            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
