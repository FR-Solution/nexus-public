/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
package org.sonatype.nexus.repository.pypi.internal;

import java.io.IOException;
import java.io.InputStream;
import java.util.function.Supplier;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.goodies.common.ComponentSupport;
import org.sonatype.nexus.mime.MimeRulesSource;
import org.sonatype.nexus.repository.mime.ContentValidator;
import org.sonatype.nexus.repository.mime.DefaultContentValidator;
import org.sonatype.nexus.repository.pypi.PyPiFormat;

import static com.google.common.base.Preconditions.checkNotNull;
import static org.apache.commons.lang.StringUtils.endsWith;

/**
 * PyPI-specific {@link ContentValidator} that treats accesses to index pages as being HTML content.
 *
 * @since 3.1
 */
@Named(PyPiFormat.NAME)
@Singleton
public class PyPiContentValidator
    extends ComponentSupport
    implements ContentValidator
{
  protected static final String ASC_FILE_EXTENSION = ".asc";

  protected static final String TEXT_FILE_EXTENSION = ".txt";

  private final DefaultContentValidator defaultContentValidator;

  @Inject
  public PyPiContentValidator(final DefaultContentValidator defaultContentValidator) {
    this.defaultContentValidator = checkNotNull(defaultContentValidator);
  }

  @Nonnull
  @Override
  public String determineContentType(final boolean strictContentTypeValidation,
                                     final Supplier<InputStream> contentSupplier,
                                     @Nullable final MimeRulesSource mimeRulesSource,
                                     @Nullable final String contentName,
                                     @Nullable final String declaredContentType) throws IOException
  {
    String name = modifyContentNameForSpecialCases(contentName);
    return defaultContentValidator
        .determineContentType(strictContentTypeValidation, contentSupplier, mimeRulesSource, name, declaredContentType);
  }

  private String modifyContentNameForSpecialCases(final String contentName) {
    if (isAscFileExtension(contentName)) {
      return contentName + TEXT_FILE_EXTENSION;
    }
    return contentName;
  }

  private boolean isAscFileExtension(@Nullable final String contentName) {
    return endsWith(contentName, ASC_FILE_EXTENSION);
  }
}