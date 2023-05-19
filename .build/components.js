"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var components_exports = {};
__export(components_exports, {
  box: () => box,
  button: () => button,
  heading: () => heading,
  menuBar: () => menuBar,
  prompt: () => prompt,
  question: () => question,
  screen: () => screen
});
module.exports = __toCommonJS(components_exports);
var blessed = __toESM(require("blessed"));
const box = (content) => {
  return blessed.box({
    top: "center",
    left: "center",
    width: "shrink",
    height: "shrink",
    padding: 3,
    tags: true,
    content,
    border: {
      type: "line"
    },
    style: {
      border: {
        fg: "#f0f0f0"
      }
    }
  });
};
const heading = (content, parent) => {
  return blessed.text({
    parent,
    top: -3,
    left: -3,
    width: "shrink",
    content
  });
};
const button = (content, parent) => {
  return blessed.button({
    parent,
    bottom: -3,
    left: "center",
    width: "shrink",
    content,
    shadow: true
  });
};
const screen = blessed.screen({
  smartCSR: true,
  style: {
    bg: "magenta"
  }
});
const prompt = blessed.prompt({
  parent: screen,
  left: "center",
  top: "center",
  width: "50%",
  height: "shrink",
  border: {
    type: "line"
  },
  submitOnEnter: true
});
const question = blessed.question({
  parent: screen,
  left: "center",
  top: "center",
  width: "50%",
  height: "shrink",
  border: {
    type: "line"
  },
  submitOnEnter: true
});
const menuBar = blessed.listbar({
  bottom: 0,
  height: "shrink",
  width: "100%",
  border: {
    type: "line"
  },
  style: {
    selected: {
      bg: "yellow",
      fg: "white"
    },
    item: {
      bg: "grey",
      fg: "yellow"
    }
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  box,
  button,
  heading,
  menuBar,
  prompt,
  question,
  screen
});
//# sourceMappingURL=components.js.map
