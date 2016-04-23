/**
 * @file npm install 时自动运行的脚本
 * @author chenxiao07
 */

/* eslint-disable no-console */

var Validate = require('git-validate');

Validate.copy('../hooks/pre-commit', '.git/hooks/pre-commit');
