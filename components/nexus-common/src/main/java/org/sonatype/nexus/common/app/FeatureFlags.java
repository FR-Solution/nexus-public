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
package org.sonatype.nexus.common.app;

/**
 * List of available feature flags
 * You can change it's values by editing ${data-dir}/nexus.properties configuration file.
 *
 * @since 3.20
 */
public interface FeatureFlags
{
  /* Go (hosted) repository is experimental. Available values: true, false. Default value: false */
  String FEATURE_GOLANG_HOSTED = "nexus.golang.hosted";

  /* Docker GC Custom task enabled. Available values: true, false. Default value: false */
  String DOCKER_GC_CUSTOM_TASK_ENABLED = "nexus.docker.gc.custom.enabled";

  /* Database externalization. Available values: true, false. Default value: false */
  String DATASTORE_ENABLED = "nexus.datastore.enabled";
  String DATASTORE_ENABLED_NAMED = "${nexus.datastore.enabled:-false}";

  /* Database externalization developers only. Available values: true, false. Default value: false */
  String DATASTORE_DEVELOPER = "nexus.datastore.developer";
  String DATASTORE_DEVELOPER_NAMED = "${nexus.datastore.developer:-false}";

  /* Distributed event service. Available values: true, false. Default value: false */
  String DATASTORE_CLUSTERED_ENABLED = "nexus.datastore.clustered.enabled";
  String DATASTORE_CLUSTERED_ENABLED_NAMED = "${nexus.datastore.clustered.enabled:-false}";

  /* Feature flag to indicate if current db is postgresql */
  String DATASTORE_IS_POSTGRESQL = "datastore.isPostgresql";

  //Enable elastic search
  String ELASTIC_SEARCH_ENABLED = "nexus.elasticsearch.enabled";

  String ELASTIC_SEARCH_ENABLED_NAMED = "${nexus.elasticsearch.enabled:-false}";

  /* Orient flag for marking content that is orient only, and should be disabled when datastore is enabled */
  String ORIENT_ENABLED = "nexus.orient.enabled";

  /* JWT externalization. Available values: true, false. Default value: false */
  String JWT_ENABLED = "nexus.jwt.enabled";

  /* Session flag for marking content that is only for session, and should be disabled when jwt is enabled */
  String SESSION_ENABLED = "nexus.session.enabled";

  /* HTTP Replication. Available values: true, false. Default value: true */
  String REPLICATION_HTTP_ENABLED = "nexus.replication.http.enabled";

  /* V1 Replication. Available values: true, false. Default value: false */
  String REPLICATION_V1_ENABLED = "nexus.replication.v1.enabled";

  /* flag for skipping blob store with soft-quota violation (for Round Robin group policy)
  *  Available values: true, false. Default value: false
  */
  String BLOBSTORE_SKIP_ON_SOFTQUOTA_VIOLATION = "nexus.blobstore.skipOnSoftQuotaViolation";

  /*  */
  String DATASTORE_BLOBSTORE_METRICS = "nexus.datastore.blobstore.metrics.enabled";

  /**
   * Enable searching components via aggregated search table.
   * Mutual exclusive with:
   * - ELASTIC_SEARCH_ENABLED;
   * Dependent from:
   * - DATASTORE_DEVELOPER;
   */
  String DATASTORE_TABLE_SEARCH = "nexus.datastore.table.search.enabled";
  String DATASTORE_TABLE_SEARCH_NAMED = "${nexus.datastore.table.search.enabled:-false}";

  /**
   * The Key-Value DB storage which can be used as a distributed cache. Use it intelligently,
   * for example it makes sense to cache IQ results in a DB rather than request IQ Server each time.
   * At best should be replaced by Redis cache or Apache Ignite or other.
   */
  String SQL_DISTRIBUTED_CACHE = "nexus.datastore.sql.cache.enabled";

  /**
   * Validates attribute from the node_heartbeat.node_info to determine if the deployment is valid.
   */
  String DATASTORE_DEPLOYMENT_VALIDATOR = "nexus.datastore.deployment.validator.enabled";

  String CHANGE_REPO_BLOBSTORE_TASK_ENABLED = "nexus.change.repo.blobstore.task.enabled";

  String CHANGE_REPO_BLOBSTORE_TASK_ENABLED_NAMED = "${nexus.change.repo.blobstore.task.enabled:-false}";

  String FIREWALL_ONBOARDING_ENABLED = "nexus.firewall.onboarding.enabled";

  String CLEANUP_PREVIEW_ENABLED = "nexus.cleanup.preview.enabled";

  String CLEANUP_PREVIEW_ENABLED_NAMED = "${nexus.cleanup.preview.enabled:-true}";

  String CLEANUP_MAVEN_RETAIN = "nexus.cleanup.mavenRetain";

  String CLEANUP_DOCKER_RETAIN = "nexus.cleanup.dockerRetain";

  String CLEANUP_USE_SQL = "nexus.cleanup.useSQL";

  String FORMAT_RETAIN_PATTERN = "nexus.cleanup.{format}Retain";

  String FIREWALL_QUARANTINE_FIX_ENABLED = "nexus.firewall.quarantineFix.enabled";

  String FIREWALL_QUARANTINE_FIX_ENABLED_NAMED = "${nexus.firewall.quarantineFix.enabled:-false}";

  String CIRCUIT_BREAKER_ENABLED = "nexus.circuitb.enabled";

  String REACT_PRIVILEGES = "nexus.react.privileges";

  String REACT_PRIVILEGES_NAMED = "${nexus.react.privileges:-false}";

  String REACT_PRIVILEGES_MODAL_ENABLED = "nexus.react.privileges.modal.enabled";

  String REACT_PRIVILEGES_MODAL_NAMED = "${nexus.react.privileges.modal.enabled:-false}";

  /**
   * Feature flag to determine if we should include the repository sizes feature
   */
  String REPOSITORY_SIZE_ENABLED = "nexus.repository.size";

  String REPOSITORY_SIZE_ENABLED_NAMED = "${nexus.repository.size:-false}";

  String REACT_ROLES_MODAL_ENABLED = "nexus.react.roles.modal.enabled";

  String REACT_ROLES_MODAL_NAMED = "${nexus.react.roles.modal.enabled:-false}";

}
