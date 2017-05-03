/**
 * @file npm uninstall 时自动运行的脚本
 * @author cxtom
 */

/* eslint-disable no-console */

var Util = require('./util');

try {
    Util.unInstallHooks('pre-commit');
}
catch (e) {
    console.trace(e);
}
