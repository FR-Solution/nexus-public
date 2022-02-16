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
package org.sonatype.nexus.repository.apt.datastore.internal.store;

import javax.inject.Named;

import org.sonatype.nexus.repository.apt.AptFormat;
import org.sonatype.nexus.repository.content.store.FormatStoreModule;

/**
 * Configures the content store bindings for a Apt format.
 *
 * @since 3.31
 */
@Named(AptFormat.NAME)
public class AptStoreModule
    extends FormatStoreModule<AptContentRepositoryDAO,
    AptComponentDAO,
    AptAssetDAO,
    AptAssetBlobDAO,
    AptSearchDAO>
{
}