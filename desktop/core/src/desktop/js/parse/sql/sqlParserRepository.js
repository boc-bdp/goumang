// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable */
/**
 * AUTOCOMPLETE_MODULES and SYNTAX_MODULES are generated, do not edit manually, see tools/jison/generateParsers.js
 */
const AUTOCOMPLETE_MODULES = {
  generic: () => import(/* webpackChunkName: "generic-parser" */ 'parse/sql/generic/genericAutocompleteParser'),
  impala: () => import(/* webpackChunkName: "impala-parser" */ 'parse/sql/impala/impalaAutocompleteParser'),
  hive: () => import(/* webpackChunkName: "hive-parser" */ 'parse/sql/hive/hiveAutocompleteParser')
};
const SYNTAX_MODULES = {
  generic: () => import(/* webpackChunkName: "generic-parser" */ 'parse/sql/generic/genericSyntaxParser'),
  impala: () => import(/* webpackChunkName: "impala-parser" */ 'parse/sql/impala/impalaSyntaxParser'),
  hive: () => import(/* webpackChunkName: "hive-parser" */ 'parse/sql/hive/hiveSyntaxParser')
};
/* eslint-enable */

class SqlParserRepository {
  constructor() {
    this.modulePromises = {};
  }

  async getAutocompleter(sourceType) {
    if (!this.modulePromises[sourceType + 'Autocomplete']) {
      this.modulePromises[sourceType + 'Autocomplete'] = AUTOCOMPLETE_MODULES[sourceType]();
    }
    return this.modulePromises[sourceType + 'Autocomplete'];
  }

  async getSyntaxParser(sourceType) {
    if (!this.modulePromises[sourceType + 'Syntax']) {
      this.modulePromises[sourceType + 'Syntax'] = AUTOCOMPLETE_MODULES[sourceType]();
    }
    return this.modulePromises[sourceType + 'Syntax'];
  }
}

const sqlParserRepository = new SqlParserRepository();

export default sqlParserRepository;
