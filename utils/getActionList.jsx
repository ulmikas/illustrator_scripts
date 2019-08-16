﻿#include helpers.jsx// Список папок где лежат экшеныvar ACTIONS_PATHS = [  '/Applications/Adobe Illustrator CC 2018/Presets.localized/en_GB/Actions/',  '/Users/kenway/Desktop/111'];var getActionFiles = function getActionFiles() {  var files = [];  for (var i = 0; i < ACTIONS_PATHS.length; i++) {    files = files.concat(Folder(ACTIONS_PATHS[i]).getFiles('*.aia'));  }  return files;};var getFileContent = function getFileContent(file) {  var fileItem, content;  try {    fileItem = File(file);    fileItem.open('r');    content = fileItem.read();    fileItem.close();    return content;  } catch (e) {    return '';  }};var getActionSetName = function getActionSetName(fileContent) {  var regEx = /\/version.*\n\/name.*\n\t*(.*)/;  return hex2a(fileContent.match(regEx)[1]);};var getActionsNames = function getActionsNames(fileContent) {  var regEx = /\/action.*\n.*\/name.*\n\t*(.*)/g;  var actionNames = [], result;  while (result = regEx.exec(fileContent)) {    actionNames.push(hex2a(result[1]));  }  return actionNames;};var makeActionList = function makeActionList(actionList, fileContent) {  var setName = getActionSetName(fileContent);  var actions = getActionsNames(fileContent);  actionList[setName] = actions;  return actionList;};var getActionList = function getActionList() {  var actionFiles = getActionFiles();  var actionList = {};  for (var i = 0; i < actionFiles.length; i++) {    var file = actionFiles[i];    var fileContent = getFileContent(file);    makeActionList(actionList, fileContent);  }  return actionList;};