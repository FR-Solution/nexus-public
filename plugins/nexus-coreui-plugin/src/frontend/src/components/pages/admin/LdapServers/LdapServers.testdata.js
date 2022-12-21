/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Open Source Version is distributed with Sencha Ext JS pursuant to a FLOSS Exception agreed upon
 * between Sonatype, Inc. and Sencha Inc. Sencha Ext JS is licensed under GPL v3 and cannot be redistributed as part of a
 * closed source work.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
import {indexBy, prop} from 'ramda';

export const LDAP_SERVERS = [
  {
    name: 'win-clm01.sonatype.dev',
    protocol: 'LDAP',
    useTrustStore: false,
    host: 'win-clm01.sonatype.dev',
    port: 389,
    searchBase: 'dc=win,dc=blackforest,dc=local',
    authScheme: 'SIMPLE',
    authRealm: null,
    authUsername: 'CN=testuser1,CN=Users,DC=win,DC=blackforest,DC=local',
    connectionTimeoutSeconds: 30,
    connectionRetryDelaySeconds: 300,
    maxIncidentsCount: 3,
    userBaseDn: 'cn=users',
    userSubtree: false,
    userObjectClass: 'user',
    userLdapFilter: '',
    userIdAttribute: 'sAMAccountName',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: '',
    ldapGroupsAsRoles: true,
    groupType: 'DYNAMIC',
    groupBaseDn: null,
    groupSubtree: false,
    groupObjectClass: null,
    groupIdAttribute: null,
    groupMemberAttribute: null,
    groupMemberFormat: null,
    userMemberOfAttribute: 'memberOf',
    id: '8b7b5a16-9421-4637-b173-d7210e45220d',
    order: 3,
  },
  {
    name: 'win-clm01-ads',
    protocol: 'LDAP',
    useTrustStore: false,
    host: '10.20.6.182',
    port: 10389,
    searchBase: 'dc=apache,dc=blackforest,dc=local',
    authScheme: 'SIMPLE',
    authRealm: null,
    authUsername: 'cn=testuser1,ou=users,ou=system',
    connectionTimeoutSeconds: 30,
    connectionRetryDelaySeconds: 300,
    maxIncidentsCount: 3,
    userBaseDn: 'ou=people',
    userSubtree: false,
    userObjectClass: 'inetOrgPerson',
    userLdapFilter: '',
    userIdAttribute: 'uid',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: '',
    ldapGroupsAsRoles: true,
    groupType: 'DYNAMIC',
    groupBaseDn: null,
    groupSubtree: false,
    groupObjectClass: null,
    groupIdAttribute: null,
    groupMemberAttribute: null,
    groupMemberFormat: null,
    userMemberOfAttribute: 'memberOf',
    id: '0c0d7218-8d83-4bfe-904c-2eca6533afbf',
    order: 1,
  },
  {
    name: 'test #1',
    protocol: 'LDAPS',
    useTrustStore: false,
    host: '1.1.1.1',
    port: 10389,
    searchBase: 'dc=apa,dc=black,dc=remote',
    authScheme: 'SIMPLE',
    authRealm: null,
    authUsername: 'cn=testuser1,ou=users,ou=system',
    connectionTimeoutSeconds: 30,
    connectionRetryDelaySeconds: 300,
    maxIncidentsCount: 3,
    userBaseDn: 'ou=people',
    userSubtree: false,
    userObjectClass: 'inetOrgPerson',
    userLdapFilter: '',
    userIdAttribute: 'uid',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: '',
    ldapGroupsAsRoles: true,
    groupType: 'DYNAMIC',
    groupBaseDn: null,
    groupSubtree: false,
    groupObjectClass: null,
    groupIdAttribute: null,
    groupMemberAttribute: null,
    groupMemberFormat: null,
    userMemberOfAttribute: 'memberOf',
    id: '0c0d7218-8d83-4bfe-904c-2fffasfsa',
    order: 2,
  },
];

export const LDAP_SERVERS_MAP = indexBy(prop('id'), LDAP_SERVERS);

export const USER_AND_GROUP_TEMPLATE = [
  {
    name: 'Active Directory',
    userBaseDn: 'cn=users',
    userSubtree: false,
    userObjectClass: 'user',
    userLdapFilter: null,
    userIdAttribute: 'sAMAccountName',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: null,
    ldapGroupsAsRoles: true,
    groupType: 'dynamic',
    groupBaseDn: null,
    groupSubtree: false,
    groupObjectClass: null,
    groupIdAttribute: null,
    groupMemberAttribute: null,
    groupMemberFormat: null,
    userMemberOfAttribute: 'memberOf',
  },
  {
    name: 'Posix with Static Groups',
    userBaseDn: 'ou=people',
    userSubtree: false,
    userObjectClass: 'posixAccount',
    userLdapFilter: null,
    userIdAttribute: 'uid',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: null,
    ldapGroupsAsRoles: true,
    groupType: 'static',
    groupBaseDn: 'ou=groups',
    groupSubtree: false,
    groupObjectClass: 'posixGroup',
    groupIdAttribute: 'cn',
    groupMemberAttribute: 'memberUid',
    groupMemberFormat: '${username}',
    userMemberOfAttribute: null,
  },
  {
    name: 'Posix with Dynamic Groups',
    userBaseDn: 'ou=people',
    userSubtree: false,
    userObjectClass: 'posixAccount',
    userLdapFilter: null,
    userIdAttribute: 'uid',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: null,
    ldapGroupsAsRoles: true,
    groupType: 'dynamic',
    groupBaseDn: null,
    groupSubtree: false,
    groupObjectClass: null,
    groupIdAttribute: null,
    groupMemberAttribute: null,
    groupMemberFormat: null,
    userMemberOfAttribute: 'memberOf',
  },
  {
    name: 'Generic Ldap Server',
    userBaseDn: null,
    userSubtree: false,
    userObjectClass: 'inetOrgPerson',
    userLdapFilter: null,
    userIdAttribute: 'uid',
    userRealNameAttribute: 'cn',
    userEmailAddressAttribute: 'mail',
    userPasswordAttribute: null,
    ldapGroupsAsRoles: true,
    groupType: 'dynamic',
    groupBaseDn: null,
    groupSubtree: false,
    groupObjectClass: null,
    groupIdAttribute: null,
    groupMemberAttribute: null,
    groupMemberFormat: null,
    userMemberOfAttribute: 'memberOf',
  },
];
