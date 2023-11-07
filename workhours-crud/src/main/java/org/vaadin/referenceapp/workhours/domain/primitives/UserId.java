package org.vaadin.referenceapp.workhours.domain.primitives;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;

import java.io.Serializable;
import java.util.Objects;

/**
 * Immutable domain primitive / value object for a user ID.
 */
public final class UserId implements Serializable, Comparable<UserId> {
    public static final int MAX_LENGTH = 255;
    private final String userId;

    private UserId(String userId) {
        Validate.notEmpty(userId, "UserId cannot be empty");
        Validate.isTrue(userId.length() <= MAX_LENGTH, "UserId is too long");
        if (!StringUtils.containsOnly(userId, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_")) {
            throw new IllegalArgumentException("UserID contains illegal characters");
        }
        this.userId = userId;
    }

    public static UserId fromString(String userId) {
        return new UserId(userId);
    }

    @Override
    public String toString() {
        return userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserId userId1 = (UserId) o;
        return Objects.equals(userId, userId1.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

    @Override
    public int compareTo(UserId o) {
        return userId.compareTo(o.userId);
    }
}
